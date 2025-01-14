import React from 'react';
import $ from 'jquery';

import AccountTopBarComponent from './account_top_bar.component.jsx';
import AccountTableComponent from './account_table.component.jsx';
import CreateAccountComponent from './create_account.component.jsx';
import ReadOneAccountComponent from './read_one_account.component.jsx';
import UpdateAccountComponent from "./update_account.component.jsx";
import DeleteAccountComponent from './delete_account.component.jsx';

class ReadAccountsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentMode: 'read',
            accountNo: null,
            accounts: []
        };

        this.changeAccountMode = this.changeAccountMode.bind(this);
        this.fetchAccounts = this.fetchAccounts.bind(this);
    }

    fetchAccounts() {
        this.serverRequest = $.get("http://localhost/api/account/read.php", (account) => {
            this.setState({
                accounts: account.records
            });
        });
    }

    componentDidMount() {
        this.fetchAccounts();
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    changeAccountMode(newMode, accountNo) {
        this.setState({currentMode: newMode});

        if(accountNo !== undefined) {
            this.setState({accountNo: accountNo});
        }
    }

    render() {
        let filteredAccounts = this.state.accounts;
        let modeComponent = <AccountTableComponent accounts={filteredAccounts} changeAccountMode={this.changeAccountMode} />;
        let createAccount = <CreateAccountComponent accountNo={this.state.accountNo} changeAccountMode={this.changeAccountMode} />;
        $('.page-header h1').text('Read Accounts');
        let topBar = null;

        switch(this.state.currentMode) {
            case 'read':
                topBar = <AccountTopBarComponent changeAccountMode={this.changeAccountMode} refresh={this.fetchAccounts}/>;
                break;
            case 'create':
                modeComponent = <CreateAccountComponent accountNo={this.state.accountNo} changeAccountMode={this.changeAccountMode} />;
                break;
            case 'readOne':
                modeComponent = <ReadOneAccountComponent accountNo={this.state.accountNo} changeAccountMode={this.changeAccountMode} />;
                break;
            case 'update':
                modeComponent = <UpdateAccountComponent accountNo={this.state.accountNo} changeAccountMode={this.changeAccountMode} />;
                break;
            case 'delete':
                modeComponent = <DeleteAccountComponent accountNo={this.state.accountNo} changeAccountMode={this.changeAccountMode} />;
                break;
            default:
                break;
        }

        return (
             <div className="container equal">
                <div className="col-left bg-light-grey left-typo scroll">
                 {
                    topBar !== null ?
                        topBar
                        : null
                }
                    {modeComponent}
                </div>
                <div className="col-right bg-dark-purple">
                    {createAccount}
                </div>
            </div>

        );
    }

}

export default ReadAccountsComponent;
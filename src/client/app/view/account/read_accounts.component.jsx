import React from 'react';
import $ from 'jquery';

import AccountTableComponent from './account_table.component.jsx';
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

    // on mount, fetch all products and stored them as this component's state
    componentDidMount() {
        this.fetchAccounts();
    }

    // on unmount, kill product fetching in case the request is still pending
    componentWillUnmount() {
        this.serverRequest.abort();
    }

    changeAccountMode(newMode, accountNo) {
        this.setState({currentMode: newMode});

        if(accountNo !== undefined) {
            this.setState({accountNo: accountNo});
        }
    }

    // render component on the page
    render() {
        let filteredAccounts = this.state.accounts;
        let modeComponent = <AccountTableComponent accounts={filteredAccounts} changeAccountMode={this.changeAccountMode} />;
        $('.page-header h1').text('Read Accounts');

        switch(this.state.currentMode) {
            case 'read':
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

        return modeComponent; //(
            //if current mode read render tobar
            //<div className='overflow-hidden'>
                //{modeComponent}
            //</div>
        //);
    }

}

export default ReadAccountsComponent;
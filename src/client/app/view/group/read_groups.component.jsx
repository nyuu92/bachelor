import React from 'react';
import $ from 'jquery';

import GroupTopBarComponent from './group_top_bar.component.jsx';
import GroupTableComponent from './group_table.component.jsx';
import ReadOnePgroupComponent from './read_one_pgroup.component.jsx';
import ReadOneCgroupComponent from './read_one_cgroup.component.jsx';
import UpdatePgroupComponent from './update_pgroup.component.jsx';
import UpdateCgroupComponent from './update_cgroup.component.jsx';
import DeletePgroupComponent from './delete_pgroup.component.jsx';
import CreatePgroupComponent from './create_pgroup.component.jsx';
import CreateCgroupComponent from './create_cgroup.component.jsx';

class ReadGroupsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentMode: 'readp',
            cgroupNo: null,
            pgroupNo: null,
            cgroups: [],
            pgroups: []
        };

        this.fetchPgroups = this.fetchPgroups.bind(this);
        this.fetchCgroups = this.fetchCgroups.bind(this);
        this.refreshTables = this.refreshTables.bind(this);
        this.changeGroupMode = this.changeGroupMode.bind(this);
    }

    fetchPgroups() {
        this.serverRequestP = $.get("http://localhost/api/pgroup/read.php", (pgroup) => {
            this.setState({
                pgroups: pgroup.records
            });
        });
    }

    fetchCgroups() {
        this.serverRequestC = $.get("http://localhost/api/cgroup/read.php", (cgroup) => {
            this.setState({
               cgroups: cgroup.records
            });
        });
    }

    refreshTables() {
        this.serverRequestP.abort();
        this.serverRequestC.abort();
        this.fetchPgroups();
        setTimeout(this.fetchCgroups(), 2000);
    }

    componentDidMount() {
        this.fetchPgroups();
        setTimeout(this.fetchCgroups(), 2000);

    }

    componentWillUnmount() {
        this.serverRequestP.abort();
        this.serverRequestC.abort();
    }

    changeGroupMode(newMode, pgroupNo, cgroupNo ) {
        this.setState({currentMode: newMode});

        if(pgroupNo !== undefined && pgroupNo !== '') {
            this.setState({pgroupNo: pgroupNo});
        }

        if(cgroupNo !== undefined) {
            this.setState({cgroupNo: cgroupNo});
        }
    }

    // render component on the page
    render() {
        let filteredPgroups = this.state.pgroups;
        let filteredCgroups = this.state.cgroups;
        let topBar = null;
        let createPC = null;
        let modeComponent = <GroupTableComponent pgroups={filteredPgroups}  changeGroupMode={this.changeGroupMode} />;
        let cdata = filteredCgroups.map((cgroup, i) => {
            return (
                <tr key={cgroup.number}>
                    <td>{cgroup.number}</td>
                    <td>{cgroup.name}</td>
                    <td>{cgroup.account}</td>
                    <td>
                        <a href='#'
                           onClick={() => this.changeGroupMode('readOnec', '', cgroup.number)}>
                           <div className="action_btn view" />
                        </a>
                        <a href='#'
                           onClick={() => this.changeGroupMode('updatec','', cgroup.number)}>
                           <div className="action_btn edit"/>
                        </a>
                    </td>
                </tr>
            );
        });
        let cusTable = (
                        <table className="table_list">
                            <caption><h4 className="group">LIST OF</h4>
                            <h4 className="group">CUSTOMER GROUPS</h4></caption>
                            <thead>
                                <tr>
                                    <th><h5>Number</h5></th>
                                    <th><h5>Name</h5></th>
                                    <th><h5>Account</h5></th>
                                    <th className="extra_width"><h5>Action</h5></th>
                                </tr>
                            </thead>
                            <tbody className="table_cgroup">
                                {cdata}
                            </tbody>
                        </table>
        );

        switch(this.state.currentMode) {
            case 'readp':
                topBar = <GroupTopBarComponent changeGroupMode={this.changeGroupMode} refresh={this.refreshTables}/>;
                createPC = <CreatePgroupComponent changeGroupMode={this.changeGroupMode}/>;
                break;
            case 'readc':
                topBar = <GroupTopBarComponent changeGroupMode={this.changeGroupMode}/>;
                createPC = <CreateCgroupComponent changeGroupMode={this.changeGroupMode}/>;
                modeComponent = cusTable;
                break;
            case 'readOnep':
                createPC = <CreatePgroupComponent changeGroupMode={this.changeGroupMode}/>;
                modeComponent =
                    <ReadOnePgroupComponent pgroupNo={this.state.pgroupNo} changeGroupMode={this.changeGroupMode}/>;
                break;
            case 'readOnec':
                createPC = <CreateCgroupComponent changeGroupMode={this.changeGroupMode}/>;
                modeComponent =
                    <ReadOneCgroupComponent cgroupNo={this.state.cgroupNo} changeGroupMode={this.changeGroupMode}/>;
                break;
            case 'createp':
                modeComponent = <CreatePgroupComponent changeGroupMode={this.changeGroupMode}/>;
                break;
            case 'createc':
                modeComponent = <CreateCgroupComponent changeGroupMode={this.changeGroupMode}/>;
                break;
            case 'updatep':
                createPC = <CreatePgroupComponent changeGroupMode={this.changeGroupMode}/>;
                modeComponent =
                   <UpdatePgroupComponent pgroupNo={this.state.pgroupNo} changeGroupMode={this.changeGroupMode}/>;
                break;
            case 'updatec':
                createPC = <CreateCgroupComponent changeGroupMode={this.changeGroupMode}/>;
                modeComponent =
                    <UpdateCgroupComponent cgroupNo={this.state.cgroupNo} changeGroupMode={this.changeGroupMode}/>;
                break;
            case 'deletep':
                createPC = <CreatePgroupComponent changeGroupMode={this.changeGroupMode}/>;
                modeComponent =
                    <DeletePgroupComponent pgroupNo={this.state.pgroupNo} changeGroupMode={this.changeGroupMode}/>;
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
                <div className="col-right bg-light-red">
                     {createPC}
                </div> 
            </div>
           
        );

    }

}

export default ReadGroupsComponent;
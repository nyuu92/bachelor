import React from 'react';

import GroupTableRowComponent from './group_table_row.component.jsx';

class GroupTableComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        let rows = this.props.pgroups.map(function(pgroup, i) {
            return (
                <GroupTableRowComponent key={i} pgroup={pgroup} changeGroupMode={this.props.changeGroupMode} />
            );
        }.bind(this));

        return (
            !rows.length
                ? <h4>NO PRODUCT GROUPS FOUND</h4>
                :
                <table className="table_list">
                    <caption><h4 className="group">LIST OF</h4>
                    <h4 className="group">PRODUCT GROUPS</h4></caption>
                    <thead>
                    <tr>
                        <th><h5>Number</h5></th>
                        <th><h5>Name</h5></th>
                        <th><h5>VatAcc</h5></th>
                        <th><h5>NoVatAcc</h5></th>
                        <th className="extra_width"><h5>Action</h5></th>
                    </tr>
                    </thead>
                    <tbody className="table_pgroup">
                        {rows}
                    </tbody>
                </table>
        );
    }
}

export default GroupTableComponent;
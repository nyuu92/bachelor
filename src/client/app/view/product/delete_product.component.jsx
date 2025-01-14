import React from 'react';
import $ from 'jquery';
import style from '../sass/subpage.scss';
class DeleteProductComponent extends React.Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(e) {
        let productNo = this.props.productNo;
        let data = {
          number: productNo
        };
        $.ajax({
            url: "http://localhost/api/product/delete.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(data),
            success : (response) => {
                this.props.changeProductMode('read');
            },
            error: (xhr, resp, text) => {
                console.log(xhr, resp, text);
            }
        });
    }

    render() {
        return (
            <div className="delete_section">
                <h4 className="line_height_del">DO YOU WANT TO</h4>
                <h4 className="line_height_del">DELETE THIS PRODUCT?</h4>
                    <div className="btn_wrap">
                        <button className="btn_yes" onClick={this.onDelete}>Yes</button>
                        <button className="btn_no" onClick={() => this.props.changeProductMode('read')}>No</button>
                    </div>
            </div>
        );
    }
}

export default DeleteProductComponent;
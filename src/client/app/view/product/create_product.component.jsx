import React from 'react';
import $ from 'jquery';
import style from '../sass/subpage.scss';


class CreateProductComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: '',
            name: '',
            group: '',
            price: '',
            successCreation: null
        };

        this.onNumberChange = this.onNumberChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onGroupChange = this.onGroupChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onNumberChange(e) {
        this.setState({number: e.target.value});
    }

    // handle name change
    onNameChange(e) {
        this.setState({name: e.target.value});
    }

    // handle group change
    onGroupChange(e) {
        this.setState({group: e.target.value});
    }

    // handle price change
    onPriceChange(e) {
        this.setState({price: e.target.value});
    }
   
    onSave(e) {
        // data in the form
        let form_data = {
            number: this.state.number,
            name: this.state.name,
            group: this.state.group,
            price: this.state.price
        };
        // submit form data to api
        $.ajax({
            url: "http://localhost/api/product/create.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : (response) => {
                // api message
                this.setState({successCreation: response['message']});
                // empty form
                this.setState({number: ""});
                this.setState({name: ""});
                this.setState({price: ""});
            },
            error: (xhr, resp, text) => {
                // show error to console
                console.log(xhr, resp, text);
            }
        });
        e.preventDefault();
    }

    render() {
        /*
         - tell the user if a product was created
         - tell the user if unable to create product
         - button to go back to products list
         - form to create a product
         */
        return (
            <div className="form_style">
                {

                    this.state.successCreation == "Product was created." ?
                            <h4>PRODUCT WAS SAVED</h4>
                        : null
                }

                {

                    this.state.successCreation == "Unable to create product." ?
                        <div>
                            <h4>UNABLE TO CREATE PRODUCT</h4>
                            <h4>PLEASE TRY AGAIN</h4>
                        </div>
                        : null
                }

                    <h4 className="title_right_col">CREATE A</h4>
                    <h4 className="title_right_col">NEW PRODUCT</h4>
                    <form onSubmit={this.onSave}>
                        <input type="text" placeholder="Number" value={this.state.number} required onChange={this.onNumberChange} />
                        <input type="text" placeholder="Name" value={this.state.name} required onChange={this.onNameChange} />
                        <input type="number" placeholder="Price" min="0" max="99999" step="0.01" size="6" value={this.state.price} required onChange={this.onPriceChange}/>
                        <input type="number" placeholder="Group" min="0" max="99999" value={this.state.group} required onChange={this.onGroupChange} />
                        <input type="submit" value="Save" onClick={this.onSave}/>
                    </form>
            </div>
        );
    }
}

export default CreateProductComponent;
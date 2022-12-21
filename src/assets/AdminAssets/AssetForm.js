
import React from 'react';
import {Form, Col} from 'react-bootstrap';

class AssetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.asset
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
  }

  render() {
    let pageTitle;
    if(this.state.id) {
      pageTitle = <h2>Edit Asset</h2>
    } else {
      pageTitle = <h2>Add Asset</h2>
    }

    return(
      <div class="card text-white bg-info mb-3">
          <div class="card-header text-center">
            <button data-dismiss="alert"  type="button" class="close text-white " aria-label="Close" onClick={this.props.onCancel} >
              <span aria-hidden="true">&times;</span>
            </button>
            {pageTitle}
          </div>
          <Form onSubmit={this.handleSubmit} >
          <div class="card-body">
            <Form.Row>
              <Form.Label column lg={1}>Title</Form.Label>
              <Col>
                <Form.Control type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Title"/>
              </Col>
                <Form.Label column lg={1}>Category</Form.Label>
              <Col>
                <Form.Control type="text" name="category" value={this.state.category} onChange={this.handleChange} placeholder="Category" />
              </Col>
            </Form.Row>
            <br/>
            <Form.Row>
              <Form.Label column lg={1}>Quantity</Form.Label>
              <Col>
                <Form.Control type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} placeholder="Quantity" />
              </Col>
              <Form.Label column lg={1}>Price</Form.Label>
              <Col>
                <Form.Control type="number" name="price" value={this.state.price} onChange={this.handleChange} placeholder="Price" />
              </Col>
            </Form.Row>
            <br/>
            <Form.Row>
              <Form.Label column lg={1}>Total Price</Form.Label>
              <Col>
                <Form.Control type="number" name="total_price" value={this.state.total_price} onChange={this.handleChange} placeholder="Total Price" />
              </Col>
              <Form.Label column lg={1}>Details</Form.Label>
              <Col>
                <Form.Control as="textarea" rows={3} type="text" name="details" value={this.state.details} onChange={this.handleChange} placeholder="Details" />
              </Col>
            </Form.Row>
          </div>
          <div class="card-footer" style={{padding: '0rem 0rem'}}>
            <Form.Control type="hidden" name="id" value={this.state.id} />
            <button class="btn text-white btn-dark btn-block" type="submit">Save</button>
          </div>
          </Form>
        </div>
    )
  }
}
export default AssetForm;

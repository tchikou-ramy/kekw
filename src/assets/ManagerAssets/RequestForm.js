
import React from 'react';
import { Form, Col} from 'react-bootstrap';

class RequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: props.asset,
      error: '',
      quantity: '',
      employee: '',
      asset_id: props.asset.id,
      pending: props.asset.pending
    }
  }

  handleChange = (event) => {
    let error
    if(event.target.name === 'quantity'){
      error = event.target.value > (this.state.asset.quantity - this.state.asset.assigned - this.state.asset.pending) ? 'quantity exceeded' : ''
      this.setState({
        error : error
      })
    }
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    const {employee, quantity, asset_id, pending} = this.state
    const data = {
      employee: employee,
      quantity: quantity,
      asset_id: asset_id,
      manager_id: sessionStorage.getItem("id"),
      pending:  Number(pending) + Number(quantity)
    }
    event.preventDefault();
    this.props.onFormSubmit(data);
  }

  render() {

    return(
      <div class="card text-white bg-info mb-3">
        <div class="card-header text-center">
          <button data-dismiss="alert"  type="button" class="close text-white " aria-label="Close" onClick={this.props.onCancel} >
            <span aria-hidden="true">&times;</span>
          </button>
          <h1>Request Assets</h1>
        </div>
        <Form onSubmit={this.handleSubmit} >
          <div class="card-body">
            <Form.Row>
              <Form.Label column lg={2}>Required Quantity</Form.Label>
              <Col>
                <Form.Control type="number" name="quantity" onChange={this.handleChange} placeholder="Quantity" />
                {this.state.error.length > 0 && <span className='error'>{this.state.error}</span>}
              </Col>
              <Form.Label column lg={2}>Requesting For</Form.Label>
              <Col>
                <Form.Control type="text" name="employee" onChange={this.handleChange} placeholder="Enter Name" />
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
export default RequestForm ;

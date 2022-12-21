import axios from "axios";
import React, { Component } from 'react';
import { Table, Alert } from 'react-bootstrap';

class AssetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      visible : false,
      assets: [],
      response: {},
      total_total_asset: 0,
      total_available_asset: 0,
      total_assigned_asset: 0,
      total_pending_asset: 0,
      total_total_price: 0
    }
  }

  calculate_total = () => {
    let total_total_asset = 0, total_available_asset = 0, total_assigned_asset = 0
    let total_pending_asset = 0, total_total_price = 0
    this.state.assets.forEach(asset => {
      total_total_asset = total_total_asset + asset.quantity;
      total_assigned_asset = total_assigned_asset + asset.assigned;
      total_pending_asset = total_pending_asset + asset.pending;
      total_total_price = total_total_price + asset.total_price;
    })
    total_available_asset = total_total_asset - total_assigned_asset - total_pending_asset;
    this.setState({
      total_total_asset,
      total_available_asset,
      total_assigned_asset,
      total_pending_asset,
      total_total_price
    })

  }

  componentDidMount() {
    const apiUrl = 'http://localhost:3001/assets/getAllAssets';

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          // console.log()
          this.setState({
            assets: result.assets
          });
          this.calculate_total()
        },
        (error) => {
          this.setState({ error });
        }
      )
    
  }

  onShowAlert = () =>{
    this.setState({
      visible:true
      },()=>{
      setTimeout(()=>{
        this.setState({
          visible:false
        })
      },1000)
    });
  }

  deleteAsset(id) {
    const { assets } = this.state;
    if (window.confirm('Are you sure to delete this record?')) {
      axios
        .delete(`http://localhost:3001/assets/deleteAsset/${id}`)
        .then(res => {
            this.setState({
                response: res.data,
                assets: assets.filter(asset => asset.id !== id)
              });
            this.onShowAlert()
            this.calculate_total()
        })
        .catch(err => {
            this.setState({ err })
            console.error(err);
        });
    }
  }

  render() {
    const { error, assets} = this.state;
    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(
        <>
          {this.state.response.message && this.state.visible &&
          <Alert variant="info">{this.state.response.message}</Alert>}
          
          <h2 style={{display: "inline-block", float: "right"}}>Asset List</h2>
          <button class="btn btn-primary" style={{float:"left"}} variant="primary" onClick={() => this.props.onAdd()}>Add Asset</button>
          
          <Table striped bordered hover>
            <thead class="thead-dark text-center">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Total Asset</th>
                <th>Available</th>
                <th>Assigned</th>
                <th>Pending</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody class="text-center">
              {assets.map(asset => (
                <tr key={asset.id}>
                  <td>{asset.title}</td>
                  <td>{asset.category}</td>
                  <td>{asset.quantity}</td>
                  <td>{asset.quantity-asset.pending-asset.assigned}</td>
                  <td>{asset.assigned}</td>
                  <td>{asset.pending}</td>
                  <td>{asset.total_price}</td>
                  <td>
                      <i onClick={() => this.props.editAsset(asset)} class="fas fa-pen mr-3 back"></i>
                      <i onClick={() => this.deleteAsset(asset.id)} class="fas fa-trash-alt back"></i>
                  </td>
                </tr>
              ))}
            </tbody>
            <thead class="thead-light text-center">
              <tr>
                <th colspan="2">Total</th>
                <th>{this.state.total_total_asset}</th>
                <th>{this.state.total_available_asset}</th>
                <th>{this.state.total_assigned_asset}</th>
                <th>{this.state.total_pending_asset}</th>
                <th>{this.state.total_total_price}</th>
                <th></th>
              </tr>
            </thead>
          </Table>
        </>
      )
    }
  }
}
export default AssetList;


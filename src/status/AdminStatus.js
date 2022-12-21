import axios from "axios";
import React, { Component } from 'react';
import Sidebar from '../NavSidebar/Sidebar';

class AdminStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assets: [],
      filteredAsset: [], //subset of assets
      response: {},
      visible : false,
      error: null
    }
  }

  onShowAlert = () =>{
    this.setState({
      visible:true
      },
      ()=>{setTimeout( ()=>{
        this.setState({
          visible:false
        })
      },1000)
    });
  }

  filterButtonStatus = (status) => {
    // alert("called")
    this.setState({
        filteredAsset: this.state.assets.filter(asset => asset.status === status ? true : false)
    })
  }

  filterAccToDasboard = (asset) => {
    let returnvar;
        if(this.props.location.status){
          returnvar = (asset.status === this.props.location.status ? true : false)
        }else{
          returnvar = (asset.status === "pending" ? true : false)
        }
    return (returnvar) // return (this.props.location.status ? asset.status === this.props.location.status : asset.status === "pending")
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/assets/getAllRequest')
      .then((result) => {
        this.setState({
          assets: result.data.assets,
          filteredAsset: result.data.assets.filter(this.filterAccToDasboard)
        })
      })
      .catch(error => {
        this.setState({ error: error.data });
      });
  }

  approveAsset(asset){
    const data = {
      req_id: asset.req_id,
      asset_id: asset.asset_id,
      pending: Number(asset.pending) - Number(asset.req_quantity),
      assigned: Number(asset.assigned) + Number(asset.req_quantity)
    }
    if (window.confirm('Are you sure to accept this request?')) {
        axios
          .post('http://localhost:3001/assets/acceptRequest', data)
          .then(res => {
            this.setState({
              response: res.data,
            });
            this.onShowAlert()
            this.componentDidMount()
          })
          .catch(err => {
              this.setState({ err })
              console.error(err);
          });
    }
  }

  rejectAsset(asset) {
    const data = {
      req_id: asset.req_id,
      asset_id: asset.asset_id,
      pending: Number(asset.pending) - Number(asset.req_quantity),
      rejected: Number(asset.rejected)+Number(asset.req_quantity)
    }
    if (window.confirm('Are you sure to reject this request?')) {
      axios
        .post('http://localhost:3001/assets/rejectRequest', data)
        .then(res => {
          this.setState({
            response: res.data
          });
          this.onShowAlert()
          this.componentDidMount()
        })
        .catch(err => {
            this.setState({ err })
            console.error(err);
        });
    }
  }

  showTable = (asset) => { 
    return (
      <tr key={asset.req_id}>
        <td>{asset.title}</td>
        <td>{asset.category}</td>
        <td>{asset.manager}</td>
        <td>{asset.req_quantity}</td>
        <td>{asset.employee}</td>
        <td style={{padding: "0.35em"}}>
          {asset.status === 'assigned' ? <span class="text-success mt-1">{asset.status}</span> : null}
          {asset.status === 'rejected' ? <span class="text-danger">{asset.status}</span> : null}
          {asset.status === 'pending' ? 
            <> 
              <button class="btn btn-info mr-3" onClick={() => this.approveAsset(asset)}>Approve</button>
              <button class="btn btn-danger" onClick={() => this.rejectAsset(asset)}>Reject</button>
            </>
            : null}
        </td>
      </tr>
    
    )
  }

  render() {
    const { error, filteredAsset} = this.state;
    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      let alertuser
      if(this.state.response.status === 'success' && this.state.visible){
        alertuser = <div class="alert alert-success" role="alert" variant="info" isOpen={this.state.visible}>{this.state.response.message}</div>
      }
      return(
        <>
        <Sidebar/>
        <div class="container">
          {alertuser}
          <h2 style={{display: "inline-block", float: "right"}}>Request Status </h2>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-success" onClick={() => this.filterButtonStatus("assigned")}>Assigned</button>
            <button type="button" class="btn btn-danger" onClick={() => this.filterButtonStatus("rejected")}>Rejected</button>
            <button type="button" class="btn btn-info" onClick={() => this.filterButtonStatus("pending")}>Pending</button>
          </div>
          <table class="table table-striped table-bordered table-hover">
            <thead class="thead-dark text-center">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Manager</th>
                <th>Quantity</th>
                <th>Employee</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody class="text-center">
              {filteredAsset.map(this.showTable)}
            </tbody>
          </table>
        </div>
        </>
      )
    }
  }
}
export default AdminStatus;
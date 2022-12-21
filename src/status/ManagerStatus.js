import axios from 'axios';
import React, { Component } from 'react';
import Sidebar from '../NavSidebar/Sidebar';

class ManagerStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assets: [],
      filteredAsset: [], //subset of asset
      error: null,
      response: {}
    }
  }
  
  filterButtonStatus = (status) => {
    this.setState({
        filteredAsset: this.state.assets.filter((asset) => asset.status === status)
    })
  }

  filterAccToDasboard = (asset) => {
    let returnvar;
        if(this.props.location.status){
          returnvar = (asset.status === this.props.location.status ? true : false)
        }else{
          returnvar = true
        }
    return (returnvar) 
  }

  componentDidMount() {
    axios
      .put(`http://localhost:3001/assets/getRequestStatus/${sessionStorage.getItem("id")}`)
      .then(result => {
        this.setState({
          assets: result.data.assets,
          filteredAsset: result.data.assets.filter(this.filterAccToDasboard),
        })
      })
      .catch(error => {
        this.setState({ error });
      });
  }


  showTable = (asset) => {
    return (
      <tr>
        <td>{asset.title}</td>
        <td>{asset.category}</td>
        <td>{asset.employee}</td>
        <td>{asset.quantity}</td>
        <td>
          {asset.status === 'pending' ? <span class="text-info">{asset.status}</span>: null}
          {asset.status === 'assigned' ? <span class="text-success">{asset.status}</span> : null}
          {asset.status === 'rejected' ? <span class="text-danger">{asset.status}</span> : null}
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
      return(
        <>
        <Sidebar/>
        <div class="container">
          <h2 style={{display: "inline-block", float: "right"}}>Assets Status </h2>
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
                <th>Employee</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody class="text-center">
              {filteredAsset.map((asset)=>this.showTable(asset))}
            </tbody>
          </table>
        </div>
        </>
      )
    }
  }
}
export default ManagerStatus;
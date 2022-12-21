
import React, { Component } from 'react';
import axios from 'axios';
import { Container, Alert } from 'react-bootstrap';
import AssetList from './AssetList';
import AssetForm from './AssetForm';
import Sidebar from '../../NavSidebar/Sidebar';

// main asset class component for admin
class Asset extends Component {

    
  constructor(props) {
    super(props);
    this.state = {
      // isAddAsset: props.location.isadd? props.location.isadd: false,
      isAddAsset: false,
      isEditAsset: false,
      error: null,
      visible : false,
      response: {},
      asset: {},
      
    }
  }

  onAdd = () => {
    this.setState({ 
      isAddAsset: true,
      asset: {}
    });
  }

  editAsset = assetfromlist => {
    this.setState({ 
      isEditAsset: true,
      asset: assetfromlist
    });
  }
  onCancel = () => {
    this.setState({
      isAddAsset: false,
      isEditAsset: false,
      asset: {}
    });
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

  // this method is called when we click on save button which is in assetForm component
  onFormSubmit = formdata => {
    let apiUrl;
    if(this.state.isEditAsset){
      apiUrl = 'http://localhost:3001/assets/updateAsset';
    } else {
      apiUrl = 'http://localhost:3001/assets/addAsset';
    }

    axios
      .post(apiUrl,formdata)
      .then(result => {
        this.setState({
          response: result.data,
          isAddAsset: false,
          isEditAsset: false,
        })
        this.onShowAlert()
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    let assetForm_OR_list;
    if(this.state.isAddAsset || this.state.isEditAsset) {
      assetForm_OR_list = <AssetForm onFormSubmit={this.onFormSubmit} asset={this.state.asset} onCancel={this.onCancel}/>
    }else{
      assetForm_OR_list = <AssetList editAsset={this.editAsset} onAdd={this.onAdd}/>
    }
    return (
      <>
      <Sidebar/>
      <div className="App">
        <Container>
          {this.state.response.status === 'success' && this.state.visible && <div><br />
          <Alert  variant="info" isOpen={this.state.visible}>{this.state.response.message}</Alert></div>}
          {assetForm_OR_list}
          {/* {this.state.error && <div>Error: {this.state.error.message}</div>} */}
        </Container>
      </div>
      </>
    );
  }
}
export default Asset;

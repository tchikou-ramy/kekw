import React, { Component } from 'react';
import { Table, Alert } from 'react-bootstrap';

class AvailableAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      assets: [],
      response: {}
    }
  }

  componentDidMount() {
    const apiUrl = 'http://localhost:3001/assets/getAllAssets';

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            assets: result.assets
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
    
  }

  render() {
    const { error, assets} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(
        <div>
          <h2 style={{textAlign:"center"}}>Available Assets</h2>
          {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
          <Table striped bordered hover>
            <thead class="thead-dark text-center">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Available</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody class="text-center">
              {assets.map(asset => (
                <tr key={asset.id}>
                  <td>{asset.title}</td>
                  <td>{asset.category}</td>
                  <td>{asset.quantity - asset.assigned - asset.pending}</td>
                  <td>{asset.details}</td>
                  <td style={{padding: "0.25em"}}>
                      <button class="btn btn-info" onClick={() => this.props.requestAsset(asset)}>Request</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    }
  }
}

export default AvailableAsset;


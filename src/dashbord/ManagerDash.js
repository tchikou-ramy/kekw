import axios from 'axios';
import Sidebar from '../NavSidebar/Sidebar';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class ManagerDashbord extends Component {

  constructor(props) {
    super(props);
    this.state = {
       assets: [],
       assigned: 0,
       pending: 0,
       rejected:0,
       Quantity: 0,
       asset_pending: 0,
       asset_assigned: 0
    }
  }
  AssetSummary(){
     let assigned= 0,pending= 0, rejected= 0
     this.state.assets.forEach(assets =>{
        if(assets.status === "assigned"){
          assigned = assigned+ assets.quantity;
        }
        else if(assets.status === "pending"){
          pending = pending+ assets.quantity;
        }else{
          rejected = rejected+ assets.quantity;
        }
        this.setState({
           assigned,
           pending,
           rejected
        })
        console.log(assigned)
     })
  }

  componentDidMount() {
    axios
      .put(`http://localhost:3001/assets/getRequestStatus/${sessionStorage.getItem("id")}`)
      .then(result => {
         console.log(result.data.assets)
        this.setState({
            assets: result.data.assets,
        })
        this.AssetSummary()
      })
      .catch(error => {
        this.setState({ error });
      });

      axios
          .get('http://localhost:3001/assets/AssetsSummary')
          .then(result => {
                this.setState({
                    Quantity: result.data.asset_summary[0].quantity_sum,
                    asset_pending: result.data.asset_summary[0].pending_sum,
                    asset_assigned: result.data.asset_summary[0].assigned_sum
                })
            })
            .catch(error => {
            this.setState({ error });
            }); 
  }

render() {
  return (
  <>    
     <Sidebar/>
     <div class="container">
            <div class="card-deck text-center " style={{maxWidth: '60rem', marginTop: '50px'}}>
                 
                <div class="card text-white bg-dark mb-3" style={{maxWidth: '18rem'}}>
                    <div class="card-header">Total Available Assets </div>
                    <div class="card-body"><h5 class="card-title">{this.state.Quantity-this.state.asset_assigned-this.state.asset_pending}</h5></div>
                    <div class="card-footer" style={{padding: '0rem 0rem'}}>
                    <a href="/asset" class="btn text-white bg-dark btn-block" style={{backgroundColor: 'rgba(0,0,0,.1)'}}>View All</a>
                    </div>
                </div>
                <div class="card text-white bg-success mb-3" style={{maxWidth: '18rem'}}>
                    <div class="card-header">Total Assigned Assets</div>
                    <div class="card-body"><h5 class="card-title">{this.state.assigned}</h5></div>
                    <div class="card-footer" style={{padding: '0rem 0rem'}}>
                       <Link to={{pathname: "/status", status: "assigned"}} class="btn text-white bg-success btn-block" style={{backgroundColor: 'rgba(0,0,0,.1)'}}>View All</Link>
                    </div>
                </div>
                <div class="card text-white bg-info mb-3" style={{maxWidth: '18rem'}}>
                    <div class="card-header">Total Rejected Assets</div>
                    <div class="card-body"><h5 class="card-title">{this.state.rejected}</h5></div>
                    <div class="card-footer" style={{padding: '0rem 0rem'}}>
                        <Link to={{pathname: "/status", status: "rejected"}} class="btn text-white btn-info btn-block" style={{backgroundColor: 'rgba(0,0,0,.1)'}}>View All</Link>
                    </div>
                </div>
            </div>
            <div class="card-deck text-center " style={{maxWidth: '60rem', marginTop: '50px',paddingLeft: '130px'}}>
                <div class="card text-white bg-info mb-3" style={{maxWidth: '18rem'}}>
                    <div class="card-header">Total pending Assets </div>
                    <div class="card-body"><h5 class="card-title">{this.state.pending}</h5></div>
                    <div class="card-footer" style={{padding: '0rem 0rem'}}>
                    <Link to={{pathname: "/status", status: "pending"}} class="btn text-white bg-info btn-block" style={{backgroundColor: 'rgba(0,0,0,.1)'}}>View All</Link>
                    </div>
                </div>
                <div class="card text-white bg-dark mb-3" style={{maxWidth: '18rem'}}>
                    <div class="card-header">Request Status</div>
                    <div class="card-body"><h5 class="card-title"> </h5></div>
                    <div class="card-footer" style={{padding: '0rem 0rem'}}>
                       <a href="/status" class="btn text-white bg-dark btn-block" style={{backgroundColor: 'rgba(0,0,0,.1)'}}>View All</a>
                    </div>
                </div>
                
            </div>
        </div>
        
      </>
    )
  }
}

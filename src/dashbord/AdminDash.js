import Sidebar from '../NavSidebar/Sidebar';
import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Dashbord extends Component {
    constructor(props) {
        super(props);
        this.state = {
           assigned: 0,
           totalPrice: 0,
           Quantity:0,
           pending: 0,
           rejected: 0
        }
      }
    componentDidMount() {
        axios
          .get('http://localhost:3001/assets/AssetsSummary')
          .then(result => {
                this.setState({
                    Quantity: result.data.asset_summary[0].quantity_sum,
                    totalPrice: result.data.asset_summary[0].total_price_sum,
                    pending: result.data.asset_summary[0].pending_sum,
                    assigned: result.data.asset_summary[0].assigned_sum,
                    rejected: result.data.asset_summary[0].rejected_sum
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
                <div class="card text-white bg-info mb-3" style={{maxWidth: '18rem'}}>
                    <div class="card-header">Total Assets</div>
                    <div class="card-body"><h5 class="card-title">{this.state.Quantity}</h5></div>
                    <div class="card-footer" style={{padding: '0rem 0rem'}}>
                        <a href="/asset" class="btn text-white btn-info btn-block" style={{backgroundColor: 'rgba(0,0,0,.1)'}}>View All</a>
                    </div>
                </div>
                <div class="card text-white bg-secondary mb-3" style={{maxWidth: '18rem'}}>
                    <div class="card-header">Total Assigned Assets</div>
                    <div class="card-body"><h5 class="card-title">{this.state.assigned}</h5></div>
                    <div class="card-footer" style={{padding: '0rem 0rem'}}>
                       <Link to={{pathname: "/status", status: "assigned"}} class="btn text-white bg-secondary btn-block" style={{backgroundColor: 'rgba(0,0,0,.1)'}}>View All</Link>
                    </div>
                </div>
                <div class="card text-white bg-success mb-3" style={{maxWidth: '18rem'}}>
                    <div class="card-header">Total Available Assets</div>
                    <div class="card-body"><h5 class="card-title">{this.state.Quantity-this.state.assigned-this.state.pending}</h5></div>
                    <div class="card-footer" style={{padding: '0rem 0rem'}}>
                       <a href="/asset" class="btn text-white bg-success btn-block" style={{backgroundColor: 'rgba(0,0,0,.1)'}}>View All</a>
                    </div>
                </div>
            </div>
            <div class="card-deck text-center " style={{maxWidth: '60rem', marginTop: '50px'}}>
                <div class="card text-white bg-success mb-3" style={{maxWidth: '18rem'}}>
                    <div class="card-header">Pending Assets Requests</div>
                    <div class="card-body"><h5 class="card-title">{this.state.pending}</h5></div>
                    <div class="card-footer" style={{padding: '0rem 0rem'}}>
                    <Link to={{pathname: "/status", status: "pending"}} class="btn text-white bg-success btn-block" style={{backgroundColor: 'rgba(0,0,0,.1)'}}>View All</Link>
                    </div>
                </div>
                <div class="card text-white bg-dark mb-3" style={{maxWidth: '18rem'}}>
                    <div class="card-header">Total Assets Cost</div>
                    <div class="card-body"><h5 class="card-title">{this.state.totalPrice}</h5></div>
                    <div class="card-footer" style={{padding: '0rem 0rem'}}>
                    <a href="/asset" class="btn text-white bg-dark btn-block" style={{backgroundColor: 'rgba(0,0,0,.1)'}}>View All</a>
                    </div>
                </div>
                <div class="card text-white bg-info mb-3" style={{maxWidth: '18rem'}}>
                    <div class="card-header">Total Rejected Assets </div>
                    <div class="card-body"><h5 class="card-title">{this.state.rejected}</h5></div>
                    <div class="card-footer" style={{padding: '0rem 0rem'}}>
                    <Link to={{pathname: "/status", status: "rejected"}} class="btn text-white bg-info btn-block" style={{backgroundColor: 'rgba(0,0,0,.1)'}}>View All</Link>
                    </div>
                </div>
            </div>
        </div>
        </>
        )
    }
}
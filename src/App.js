
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import { Routes} from "react-router-dom";
import './App.css'
import Login from "./signInUp/Login";
import SignUp from "./signInUp/Signup";
import DashBoard from './dashbord/AdminDash';
import ManagerDashbord from './dashbord/ManagerDash';
import Asset from './assets/AdminAssets/Asset';
import Assets from './assets/ManagerAssets/Assets';
import AdminStatus from './status/AdminStatus';
import ManagerStatus from './status/ManagerStatus';
import Profile from "./profile/Profile"
// import AuthRoute from './hoc/AuthRoute';
// import PrivateRoute from './hoc/PrivateRoute'
import { Route } from 'react-router';


function App() {
  return (
      
    // <Routes>
    //   <Route>
    //     <AuthRoute  path='/' component={Login} />
    //     <AuthRoute path="/sign-in" component={Login} />
    //     <AuthRoute path="/sign-up" component={SignUp} />
    //     <PrivateRoute path='/dashboard' admin={DashBoard}  manager={ManagerDashbord} />
    //     <PrivateRoute path='/asset' admin={Asset} manager={Assets}/>
    //     <PrivateRoute path='/status' admin={AdminStatus} manager={ManagerStatus} />
    //     <PrivateRoute path="/setting"  admin={Profile} manager={Profile} />
    //   </Route>
    // </Routes>
    <Routes>
      
        <Route path='/' component={Login} />
        <Route path="/sign-in" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path='/dashboard' admin={DashBoard}  manager={ManagerDashbord} />
        <Route path='/asset' admin={Asset} manager={Assets}/>
        <Route path='/status' admin={AdminStatus} manager={ManagerStatus} />
        <Route path="/setting"  admin={Profile} manager={Profile} />
     
    </Routes>
  );
}
export default App;

// convert the above code with react-router-dom v6.
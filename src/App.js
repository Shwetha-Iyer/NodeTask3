import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"; 
import Main from './main';
import Login from "./login";
import Signup from "./signup";
import Forgot from "./forgot";
import Dashboard from "./dashboard";
import Reset from "./reset";
import Accountactivate from "./accountactivate";
export default function App(){
  return <>
  <div>
  <Router>
    <Switch>
      <Route path="/" component={Main} exact={true}></Route>
      <Route path="/login" component={Login} exact={true}></Route>
      <Route path="/signup" component={Signup} exact={true}></Route>
      <Route path="/forgot" component={Forgot} exact={true}></Route>
      <Route path="/activateaccount/:token" component={Accountactivate} exact={true}></Route>
      <Route path="/resetpwd/:token" component={Reset} exact={true}></Route>
      <Route path="/dashboard/:id" component={Dashboard} exact={true}></Route>
    </Switch>
  </Router>
  </div>
  </>
}

import {Link} from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Createshorturl from "./createshorturl";
import Profile from "./profile";
import Listurl from "./listurl";
export default function Dashboard(props){
    return <>
        <div id="body">
            
            <div className="wrapper">
                <div className="row">
                    <div className="col-12">
                        <nav className="navbar">
                            <div className="navbar__left">
                                Good Day! Welcome to URL Shortner
                            </div>
                            <div className="navbar__right">
                                <Link to="/login" id="logout">
                                <i className="fa fa-sign-out" aria-hidden="true"></i>Log out</Link>
                            </div>
                        </nav>
                    </div>
                </div>
                <Router>
                <div className="row">
                    <div className="col-md-3">
                        <div id="sidebar">
                            <div className="sidebar__title">
                                URL Shortener
                            </div>
                            <div className="sidebar__link my-5">
                                <Link to={`/dashboard/${props.match.params.id}/`} className="text-muted">
                                <i className="fa fa-user-o" aria-hidden="true"></i> &nbsp;Profile</Link>
                            </div>
                            <div className="sidebar__link my-5">
                                <Link to={`/dashboard/${props.match.params.id}/create_surl`} className="text-muted">
                                <i className="fa fa-scissors" aria-hidden="true"></i> &nbsp;Create Short URL</Link>
                            </div>
                            <div className="sidebar__link my-5">
                                <Link to={`/dashboard/${props.match.params.id}/list_surl`} className="text-muted">
                                <i className="fa fa-list" aria-hidden="true"></i>&nbsp;My URLs</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        
                            <Switch>
                                <Route path="/dashboard/:id/" component={Profile} exact={true}></Route>
                                <Route path={`/dashboard/:id/create_surl`} component={Createshorturl} exact={true}></Route>
                                <Route path="/dashboard/:id/list_surl" component={Listurl} exact={true}></Route>
                            </Switch>
                        
                    </div>
                </div>
                </Router>          
            </div>
            
        </div>
    </>

}
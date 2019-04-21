import {Component} from "react";
import {UserCredentials} from "../models/UserCredentials";
import {post} from "../services/baseService";
import {GLOBAL} from "../commons/GLOBAL";
import {GenesisComponent} from "./genesis";

/**
 * Created By : Lalit
 * Created On : 4/21/19
 * Organisation: CustomerXPs Software Private Ltd.
 */

interface LoginProps {
    togglePage: Function;
}

interface LoginState {
    uc: UserCredentials;
    message: string;
}


export class Login extends Component<LoginProps, LoginState> {

    constructor(props) {
        super(props);
        this.state = {
            uc: new UserCredentials("", ""),
            message: ""
        };

        this.handleUNameChange = this.handleUNameChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
    }

    handleUNameChange(e) {
        let uName = e.target.value;
        if (uName === this.state.uc.userId) {
            return;
        }
        let currentUc = this.state.uc;
        currentUc.userId = uName;
        this.setState({
            uc: currentUc,
            message: ""
        });
    }

    handlePassChange(e) {
        let pwd = e.target.value;
        if (pwd === this.state.uc.password) {
            return;
        }
        let currentUc = this.state.uc;
        currentUc.password = pwd;
        this.setState({
            uc: currentUc,
            message: ""
        });
    }

    login() {
        let time: string = Date.now().toString();
        let {uc} = JSON.parse(JSON.stringify(this.state));
        post("/auth/login", uc, (resp) => {
            GLOBAL.isLoggedIn = true;
            this.props.togglePage(GenesisComponent);
        }, (err) => {
            console.error("Some error occurred", err);
            this.setState({message: err.message});
        }, {"time": time});
    }

    render() {
        return <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign In</h5>
                            <form className="form-signin">
                                <div className="form-label-group">
                                    <label htmlFor="inputUserId">User Id</label>
                                    <input type="text" id="inputUserId" className="form-control"
                                           placeholder="User Id" required autoFocus
                                           onChange={this.handleUNameChange}/>
                                </div>

                                <div className="form-label-group">
                                    <label htmlFor="inputPassword">Password</label>
                                    <input type="password" id="inputPassword" className="form-control"
                                           placeholder="Password" required
                                           onChange={this.handlePassChange}
                                    />
                                </div>

                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit"
                                        onClick={this.login.bind(this)}>
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

}


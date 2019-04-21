import {Component} from "react";
import {GLOBAL} from "../commons/GLOBAL";
import {renderApp} from "../index";
import {get} from "../services/baseService";
import {Login} from "./login";
import {GenesisComponent} from "./genesis";

interface LoginRootState {
    page: string;
    checkLogin: string;
    message: string;
    userName: string;
}

export class LoginRoot extends Component<any, LoginRootState> {

    constructor(props) {
        super(props);
        this.state = {
            page: "Login",
            checkLogin: yes,
            message: "",
            userName: "",
        };
    }

    componentWillMount() {
        this.checkIfLoggedIn();
    }

    render() {
        if (this.state.checkLogin === yes) {
            return (<p> Checking if you are logged In </p>);
        } else if (this.state.checkLogin === inProgress) {
            return (<p> Checking if you are logged In ... </p>);
        } else if (GLOBAL.isLoggedIn) {
            this.checkIfLoggedIn();
            return <div> Loading Menu </div>;
        } else {
            switch (this.state.page) {
                case LoginPage:
                    return (<Login togglePage={this.togglePage.bind(this)}/>);
                case GenesisPage:
                    return <GenesisComponent> Menu Page </GenesisComponent>;
                default:
                    console.error("Found undefined page", this.state.page, this.state.message);
                    return (<div>Error may have occurred.</div>);
            }
        }
    }

    togglePage(page: string, userName: string = ""): void {
        if (page == GenesisPage)
            renderApp();
        else
            this.setState({
                page: page,
                userName: userName
            });
    }

    checkIfLoggedIn() {
        this.setState({checkLogin: inProgress});
        get("login/isLoggedIn", (ignore) => {
                // Open Menu
                GLOBAL.isLoggedIn = true;
                this.setState({checkLogin: done, page: GenesisPage});
                renderApp();
            },
            (err) => {
                console.error("Unable to get menu - ", err.response.status);
                this.setState({checkLogin: done});
                if (err.response.status == 401) {
                    this.setState({page: LoginPage});
                } else {
                    this.setState({message: "Unable to load menu for some reason - " + JSON.stringify(err.response)});
                }
            });
    }


}

// some const
const yes: string = "YES";
const inProgress: string = "IN_PROGRESS";
const done: string = "DONE";

// Pages
const LoginPage = "LOGIN";
const GenesisPage = "GENESIS";


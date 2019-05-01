/**
 * Created By : Lalit
 * Created On : 5/1/19
 * Organisation: CustomerXPs Software Private Ltd.
 */
import {Component, EventEmitter, Output} from "@angular/core";
import {UserCredentials} from "../models/UserCredentials";

@Component({
    selector: "login",
    template: require("../templates/login.html")
})
export class LoginComponent {

    @Output("login-trigger") loginEvent: EventEmitter<any> = new EventEmitter();
    private uc: UserCredentials = new UserCredentials();

    constructor() {
    }

    login() {
        this.loginEvent.emit();
    }

}

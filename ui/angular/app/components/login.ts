/**
 * Created By : Lalit
 * Created On : 5/1/19
 * Organisation: CustomerXPs Software Private Ltd.
 */
import {Component, EventEmitter, Output} from "@angular/core";
import {UserCredentials} from "../models/user-credentials";
import {LoginService} from "../services/login";
import {SharedService} from "../services/shared";

@Component({
    selector: "login",
    template: require("../templates/login.html")
})
export class LoginComponent {

    @Output("login-trigger") loginEvent: EventEmitter<any> = new EventEmitter();
    private uc: UserCredentials = new UserCredentials();
    // FIXME: Shortcut for quick logging in. Remove later
    isEnabled = false;
    private message: string = "";

    constructor(private service: LoginService) {
    }

    login() {
        this.service.login(this.uc)
            .subscribe((info) => {
                if (info)
                    this.loginEvent.emit();
                else
                    this.message = info;
            }, (err) => {
                this.message = SharedService.getFormattedError(err._body);
            });
    }

    listenKey(e: any) {
        if (this.isEnabled) {
            if (e.key === '0') {
                this.uc = new UserCredentials("Employee0", "overthere");
                this.login();
            } else if (e.key === '1') {
                this.uc = new UserCredentials("Manager1", "overhere");
                this.login();
            }
        }
        this.isEnabled = e.key === 'e';
    }

}

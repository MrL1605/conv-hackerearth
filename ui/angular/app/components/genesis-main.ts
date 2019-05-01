/**
 * Created By : Lalit
 * Created On : 5/1/19
 * Organisation: CustomerXPs Software Private Ltd.
 */
import {Component, OnInit} from "@angular/core";
import {LoginService} from "../services/login";

@Component({
    selector: 'genesis',
    template: require('../templates/genesis-main.html'),
})
export class GenesisMainComponent implements OnInit {

    isChecking: boolean = true;
    isLoggedIn: boolean = false;

    constructor(private loginService: LoginService) {
    }

    ngOnInit() {
        this.loginService.isLoggedIn()
            .subscribe(() => {
                this.isChecking = false;
                this.isLoggedIn = true;
            }, (err) => {
                this.isChecking = false;
                this.isLoggedIn = false;
            });
    }

    toggleLogin() {
        this.isLoggedIn = true;
    }

}

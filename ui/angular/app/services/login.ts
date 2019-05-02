/**
 * Created By : Lalit
 * Created On : 5/1/19
 * Organisation: CustomerXPs Software Private Ltd.
 */
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {SharedService} from "./shared";
import {Injectable} from "@angular/core";
import {UserCredentials} from "../models/user-credentials";

@Injectable()
export class LoginService {

    constructor(private http: Http) {
    }

    isLoggedIn(): Observable<any> {
        return this.http.get(SharedService.baseUrl + "session/isLoggedIn")
            .map(SharedService.extractJson)
            .catch((e) => SharedService.handleError(e, true));
    }

    login(uc: UserCredentials): Observable<any> {
        return this.http.post(SharedService.baseUrl + "login/login", uc)
            .map(SharedService.extractJson)
            .catch(SharedService.handleError);
    }

    logout(): Observable<any> {
        return this.http.get(SharedService.baseUrl + "login/logout")
            .map(SharedService.extractJson)
            .catch(SharedService.handleError);
    }

}

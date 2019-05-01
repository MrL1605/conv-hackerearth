/**
 * Created By : Lalit
 * Created On : 5/1/19
 * Organisation: CustomerXPs Software Private Ltd.
 */
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {SharedService} from "./shared";
import {Injectable} from "@angular/core";

@Injectable()
export class LoginService {

    constructor(private http: Http) {
    }

    isLoggedIn(): Observable<any> {
        return this.http.get(SharedService.baseUrl + "session/isLoggedIn")
            .map(SharedService.extractJson)
            .catch((e) => SharedService.handleError(e, true));
    }

    login(): Observable<any> {
        return this.http.get(SharedService.baseUrl + "session/isLoggedIn")
            .map(SharedService.extractJson)
            .catch(SharedService.handleError);
    }

}

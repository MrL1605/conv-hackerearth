/**
 * Created By : Lalit
 * Created On : 5/1/19
 * Organisation: CustomerXPs Software Private Ltd.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

declare var swal: any;

@Injectable()
export class SharedService {

    constructor() {
    }

    public static isLoggedIn: boolean = false;
    public static baseUrl: string = "/api/";


    public static extractText(response: any) {
        try {
            if (response.status === 202) {
                return JSON.stringify(response.text());
            }
            return response.text();
        } catch (e) {
            // Try redirect code
            if (!response.ok && response.status === 401) {
                window.location.href = window.location.origin;
            }
        }
    }

    public static extractJson(response: any) {
        try {
            if (response.status === 202) {
                return JSON.stringify(response.text());
            }
            return response.json();
        } catch (e) {
            // Try redirect code
            if (!response.ok && response.status === 401) {
                window.location.href = window.location.origin;
            }
        }
    }

    public static handleError(error: any, skipRedirect: any = false) {
        if (error.status === 401 && typeof skipRedirect == "boolean" && !skipRedirect) {
            swal({
                title: 'You are logged out!',
                text: 'Your session was invalidated',
                type: 'warning',
                showCancelButton: false,
                confirmButtonText: 'OK!'
            }).then(() => {
                window.location.href = window.location.origin;
            }, () => {
                window.location.href = window.location.origin;
            });
        } else if (error.status !== 401) {
            swal({
                title: 'Error Occurred!',
                text: "Reason : <br>" + SharedService.getFormattedError(error._body),
                type: 'error',
            });
        }
        return Observable.throw(error);
    }

    public static getFormattedError(errorText: string): string {
        let htmlHead = errorText.split("<style")[0];
        let htmlBody = errorText.split("</style>")[1];
        if (!htmlBody) {
            htmlBody = "";
        } else {
            htmlBody = htmlBody.replace("h1", "h3").replace("h1", "h3");
        }
        return htmlHead + htmlBody;
    }

}


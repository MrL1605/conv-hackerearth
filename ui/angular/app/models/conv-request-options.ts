/**
 * Created By : Lalit
 * Created On : 5/1/19
 * Organisation: CustomerXPs Software Private Ltd.
 */
import {BaseRequestOptions} from "@angular/http";

export class ConvRequestOptions extends BaseRequestOptions {
    constructor() {
        super();
        // Headers Used for Device Finger Printing
        this.headers.append("Content-type", "application/json");
        this.headers.append("timezone", "" + new Date().getTimezoneOffset());
    }

    static getHeaders(): any {
        let headers = [];
        headers.push({name: "Content-type", value: "application/json"});
        headers.push({name: "timezone", value: "" + new Date().getTimezoneOffset()});
        return headers;
    }

    static getHeadersObject(): any {
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append("timezone", "" + new Date().getTimezoneOffset());
        return headers;
    }

}

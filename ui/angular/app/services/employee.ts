/**
 * Created By : Lalit
 * Created On : 5/1/19
 * Organisation: CustomerXPs Software Private Ltd.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {SharedService} from "./shared";
import {Observable} from "rxjs";
import {EmployeeSummary} from "../models/user";
import {Expense} from "../models/expense";

@Injectable()
export class EmployeeService {

    constructor(private http: Http) {
    }

    getAllUserSummary(): Observable<EmployeeSummary> {
        return this.http.get(SharedService.baseUrl + "employee/")
            .map(SharedService.extractJson)
            .catch(SharedService.handleError);
    }

    getAllExpenses(): Observable<Expense> {
        return this.http.get(SharedService.baseUrl + "employee/")
            .map(SharedService.extractJson)
            .catch(SharedService.handleError);
    }

}

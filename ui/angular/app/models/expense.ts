/**
 * Created By : Lalit
 * Created On : 5/1/19
 * Organisation: CustomerXPs Software Private Ltd.
 */
import {EmployeeSummary} from "./user";

export class Expense {

    public id: number;
    public title: string;
    public isApproved: boolean;
    public amount: number;
    public manager: EmployeeSummary;

}


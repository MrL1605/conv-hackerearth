import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {HttpModule, RequestOptions} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GenesisMainComponent} from "./components/genesis-main";
import {SharedService} from "./services/shared";
import {LoginService} from "./services/login";
import {LoginComponent} from "./components/login";
import {ConvRequestOptions} from "./models/conv-request-options";
import {ExpenseRootComponent} from "./components/expense-root";
import {ExpenseService} from "./services/expense";

// UOW Components, Services

@NgModule({
    declarations: [
        GenesisMainComponent, LoginComponent, ExpenseRootComponent
    ],
    imports: [
        BrowserModule, HttpModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule,
        // AppRouter
    ],
    providers: [
        {provide: RequestOptions, useClass: ConvRequestOptions},

        SharedService, LoginService, ExpenseService
    ],
    bootstrap: [
        GenesisMainComponent
    ]
})
export class AppModule {
}




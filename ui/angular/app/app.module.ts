import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GenesisMainComponent} from "./components/genesis-main";
import {SharedService} from "./services/shared";
import {LoginService} from "./services/login";
import {LoginComponent} from "./components/login";

// UOW Components, Services

@NgModule({
    declarations: [
        GenesisMainComponent, LoginComponent
    ],
    imports: [
        BrowserModule, HttpModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule,
        // AppRouter
    ],
    providers: [
        SharedService, LoginService
    ],
    bootstrap: [
        GenesisMainComponent
    ]
})
export class AppModule {
}




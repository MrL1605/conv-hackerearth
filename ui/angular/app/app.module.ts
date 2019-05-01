import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GenesisMain} from "./components/genesis-main";

// UOW Components, Services

@NgModule({
    declarations: [
        GenesisMain,
    ],
    imports: [
        BrowserModule, HttpModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule,
        // AppRouter
    ],
    providers: [],
    bootstrap: [
        GenesisMain
    ]
})
export class AppModule {
}




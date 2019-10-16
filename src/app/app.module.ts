import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { ListComponent } from "./list/list.component";
import { RecordComponent } from "./record/record.component";
import { DetailComponent } from "./detail/detail.component";
import { CodeComponent } from "./submit/code/code.component";
import { ResultComponent } from "./submit/result/result.component";

@NgModule({
  declarations: [AppComponent, ListComponent, RecordComponent, DetailComponent, CodeComponent, ResultComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

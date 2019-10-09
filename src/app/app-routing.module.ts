import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent } from "./list/list.component";
import { RecordComponent } from "./record/record.component";
import { DetailComponent } from "./detail/detail.component";

const routes: Routes = [
  {
    path: "",
    component: ListComponent
  },
  {
    path: "list",
    component: ListComponent
  },
  {
    path: "record",
    component: RecordComponent
  },
  {
    path: "info/:id",
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

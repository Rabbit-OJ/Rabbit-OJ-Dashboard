import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent } from "./list/list.component";
import { SubmissionComponent } from "./submission/submission.component";
import { DetailComponent } from "./detail/detail.component";
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";
import { SubmissionDetailComponent } from "./submission/submission-detail/submission-detail.component";
import { ContestListComponent } from "./contest/contest-list/contest-list.component";
import { ContestDashboardComponent } from "./contest/contest-dashboard/contest-dashboard.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/list/1"
  },
  {
    path: "list/:page",
    component: ListComponent
  },
  {
    path: "submission/list/:uid/:page",
    component: SubmissionComponent
  },
  {
    path: "submission/detail/:sid",
    component: SubmissionDetailComponent
  },
  {
    path: "info/:tid",
    component: DetailComponent
  },
  {
    path: "user/login",
    component: LoginComponent
  },
  {
    path: "user/register",
    component: RegisterComponent
  },
  {
    path: "contest/list/:page",
    component: ContestListComponent
  },
  {
    path: "contest/dashboard/:cid",
    component: ContestDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

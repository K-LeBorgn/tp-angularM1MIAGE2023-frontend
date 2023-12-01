import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AssignmentsComponent} from "./assignments/assignments.component";
import {LoginComponent} from "./login/login.component";
import {AddAssignmentComponent} from "./assignments/add-assignment/add-assignment.component";
import {AssignmentDetailComponent} from "./assignments/assignment-detail/assignment-detail.component";
import {EditAssignmentComponent} from "./assignments/edit-assignment/edit-assignment.component";
import {AuthGuard} from "./shared/auth.guard";

const routes: Routes = [
  { path : '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AssignmentsComponent },
  { path: 'add', component: AddAssignmentComponent },
  { path: 'assignment/:id', component: AssignmentDetailComponent },
  { path: 'assignment/:id/edit', component: EditAssignmentComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {Component, /*Input,*/ OnInit} from '@angular/core';
import {Assignment} from "../../shared/assignment.model";
import {AssignmentsService} from "../../shared/assignments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  /*@Input()*/ assignment?:Assignment;

  constructor(private assignmentService: AssignmentsService, private route:ActivatedRoute, private router:Router, private authService : AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
    console.log(this.assignment);
  }

  getAssignment() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.assignmentService.getAssignment(id)
      .subscribe((assignment) => { this.assignment = assignment; });
  }

  onAssignmentRendu() {
    this.assignment!.rendu = !this.assignment!.rendu;
    this.assignmentService.updateAssignment(this.assignment!)
      .subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home']);
      });
  }

  onDeleteAssignment() {
    this.assignmentService.deleteAssignment(this.assignment!)
      .subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home'])
      });
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignment!.id, 'edit'], {queryParams: {nom: this.assignment!.nom}, fragment: 'edition'});
  }

  isAdmin() : boolean {
    return this.authService.loggedIn && this.authService.userConnected?.role === 'admin';
  }

}

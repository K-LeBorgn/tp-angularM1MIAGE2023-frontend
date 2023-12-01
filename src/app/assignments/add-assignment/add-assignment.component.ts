import {Component, OnInit, /*EventEmitter, Output*/} from '@angular/core';
import {Assignment} from "../../shared/assignment.model";
import {AssignmentsService} from "../../shared/assignments.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  nomDevoir=""
  dateDeRendu?:Date=undefined;

  constructor(private assignmentService:AssignmentsService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let a = new Assignment();
    /*a.id = this.assignmentService.getNewId();*/
    a.id = Math.floor(Math.random() * 1000)
    a.nom = this.nomDevoir;
    if(this.dateDeRendu)
      a.dateDeRendu = this.dateDeRendu;
    a.rendu = false;

    //this.assignments.push(a);
    //this.nouvelAssignment.emit(a);
    this.assignmentService.addAssignment(a)
      .subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home']);
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { Assignment } from '../shared/assignment.model';
import {AssignmentsService} from "../shared/assignments.service";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  assignments!:Assignment[];
  page: number=1;
  limit: number=5;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;


  constructor(private authService:AuthService, private router:Router, private assignmentsService:AssignmentsService) {}

  ngOnInit() {
    this.getAssignments(this.page, this.limit);
  }

  getAssignments(page:number, limit:number) {
    this.assignmentsService.getAssignmentsPagine(page, limit)
      .subscribe(data => {
        this.assignments = data.docs;
        this.page = data.page;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
      });
  }
  assignmentClique(assignment:Assignment) {
    if(this.authService.loggedIn) {
      this.router.navigate(['/assignment', assignment.id]);
    }
  }

  peuplerBD() {
    // version naive et simple
    //this.assignmentsService.peuplerBD();

    // meilleure version :
    this.assignmentsService.peuplerBDavecForkJoin()
      .subscribe(() => {
        console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE");
        window.location.reload();
      })
  }

  handlePageEvent(event:any) {
    console.log(event.pageIndex + 1, event.pageSize);
    this.getAssignments(event.pageIndex + 1, event.pageSize);
  }


}

import { Injectable } from '@angular/core';
import {Assignment} from "./assignment.model";
import {forkJoin, Observable, of} from "rxjs";
import {LoggingService} from "./logging.service";
import {HttpClient} from "@angular/common/http";
import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  url = 'https://tp6-angularm1miage2023-backend.onrender.com/api/assignments';

  getAssignment(id:any):Observable<Assignment> {
    console.log(id)
    return this.http.get<Assignment>(this.url + '/' + id);
  }

  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url);
  }

  getAssignmentsPagine(page:number, limit:number):Observable<any> {
    return this.http.get<Assignment[]>(this.url + '?page=' + page + '&limit=' + limit);
  }

  addAssignment(assignment:Assignment):Observable<any> {
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    return this.http.delete(this.url + '/' + assignment._id);
  }

  peuplerBDavecForkJoin():Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];

    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment))
    });

    return forkJoin(appelsVersAddAssignment);
  }

}

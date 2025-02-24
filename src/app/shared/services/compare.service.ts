import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CompareModel } from '../interface/compare.interface';

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  public skeletonLoader: boolean = false;
  
  constructor(private http: HttpClient) { }

  getComparItems(): Observable<CompareModel> {
    return this.http.get<CompareModel>(`${environment.URL}/compare`);
  }

  addCompar(payload: Params): Observable<CompareModel>{
    return this.http.post<CompareModel>(`${environment.URL}/compare`, payload )
  }

  deleteCompar(id: number): Observable<number>{
    return this.http.delete<number>(`${environment.URL}/compare/${id}`)
  }
}

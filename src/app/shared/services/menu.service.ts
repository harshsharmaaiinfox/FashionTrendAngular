import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuModel } from '../interface/menu.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public skeletonLoader: boolean = false;

  constructor(private http: HttpClient) {}

  getMenu(payload?: Params): Observable<MenuModel> {
    return this.http.get<MenuModel>(`${environment.URL}/menu`, { params: payload });
  }
  
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Params } from "../interface/core.interface";
import { environment } from "../../../environments/environment";
import { Stores, StoresModel } from "../interface/store.interface";

@Injectable({
  providedIn: "root",
})
export class StoreService {

  public skeletonLoader: boolean = false;

  constructor(private http: HttpClient) {}

  getStores(payload?: Params): Observable<StoresModel> {
    return this.http.get<StoresModel>(`${environment.URL}/store`, { params: payload });
  }

  getStoreBySlug(slug: string): Observable<Stores> {
    return this.http.get<Stores>(`${environment.URL}/store/slug/${slug}`);
  }

}

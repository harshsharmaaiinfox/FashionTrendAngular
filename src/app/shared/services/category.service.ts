import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Category, CategoryModel } from "../interface/category.interface";

@Injectable({
  providedIn: "root",
})
export class CategoryService {

  public searchSkeleton: boolean = false;
  
  constructor(private http: HttpClient) {}

  getCategories(payload?: Params): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(`${environment.URL}/category`, { params: payload });
  }
  
  getCategoryBySlug(slug: string): Observable<Category> {
    return this.http.get<Category>(`${environment.URL}/category/slug/${slug}`);
  }
}
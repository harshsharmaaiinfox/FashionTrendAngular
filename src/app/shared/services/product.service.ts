import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product, ProductModel } from '../interface/product.interface';
import { Params } from '../interface/core.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public skeletonLoader: boolean = false;
  public searchSkeleton: boolean = false;

  constructor(private http: HttpClient) {}

  getProducts(payload?: Params): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${environment.URL}/product`, { params: payload });
  }

  getProductBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>(`${environment.URL}/product/slug/${slug}`);
  }

  getProductBySearch(payload?: Params): Observable<any> {
    return this.http.get<any>(`${environment.URL}/product/minify/list`, { params: payload });
  }
}

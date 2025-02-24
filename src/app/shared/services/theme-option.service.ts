import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ThemeOption } from '../interface/theme-option.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeOptionService {

  public preloader: boolean = true;
  public theme_color: string;
  public secondary_color: string;
  public previousRoute: string;
  public productBox: string = '';
  public isDigitalProductBox = false;

  constructor(private http: HttpClient) { }

  getThemeOption(): Observable<ThemeOption> {
    return this.http.get<ThemeOption>(`${environment.URL}/themeOptions`);
  }

  

}

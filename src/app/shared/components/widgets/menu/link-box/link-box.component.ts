import { Component, Input } from '@angular/core';
import { Menu } from '../../../../interface/menu.interface';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-link-box',
  templateUrl: './link-box.component.html',
  styleUrl: './link-box.component.scss'
})
export class LinkBoxComponent {

  @Input() menu: Menu

  constructor( private router: Router){
  }

  redirect(path:string){
    this.router.navigateByUrl(path)
  }
}

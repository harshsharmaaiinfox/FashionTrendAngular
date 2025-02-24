import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-navbar-menu-button',
  templateUrl: './navbar-menu-button.component.html',
  styleUrls: ['./navbar-menu-button.component.scss']
})
export class NavbarMenuButtonComponent {

  @Output() activeMenu: EventEmitter<boolean> = new EventEmitter();
  @Input() show: boolean;

  public active: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    this.active = changes['show']?.currentValue
  }

  toggleMenu(){
    this.active = !this.active;
    this.activeMenu.emit(this.active);
  }
}

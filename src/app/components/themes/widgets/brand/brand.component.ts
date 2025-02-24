import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BrandState } from '../../../../shared/state/brand.state';
import { Brand, BrandModel } from '../../../../shared/interface/brand.interface';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent {

  @Input() brandIds: number[];
  
  public brands: Brand[];

  @Select(BrandState.brand) brand$: Observable<BrandModel>;

  ngOnInit(){
    this.brand$.subscribe(brands =>{
      this.brands = brands.data.filter(brand => this.brandIds.includes(brand.id)); 
    })
  }

}

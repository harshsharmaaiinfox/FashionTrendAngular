import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlighter',
})
export class HighlighterPipe implements PipeTransform {

  transform(value: any, args: any,type:string): unknown {
    if(!args) return value;
    if(type==='full'){
      const re = new RegExp("\\b("+args+"\\b)", 'igm');
      value= value.replace(re, '<b>$1</b>');
    }
    else{
      const re = new RegExp(args, 'igm');
      value= value.replace(re, '<b>$&</b>');
    }

      return value;
  }
}

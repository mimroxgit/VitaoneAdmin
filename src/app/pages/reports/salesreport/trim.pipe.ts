import { OnInit, Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'trim'
})

export class TrimPipe implements PipeTransform {
  
   
    transform(value: any):any {

       return value.replace(/\s/g, "");
       
    }

}
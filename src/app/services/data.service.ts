import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private router:Router) { }
  private data;
  private mesage;
  setData(data,mensaje){
    this.data= data;
    this.mesage=mensaje;
  }
  getData(){
    let temp = [this.data, this.mesage];
    this.clearData();
    return temp;
  }
  clearData(){
    this.data = undefined;
  }
}

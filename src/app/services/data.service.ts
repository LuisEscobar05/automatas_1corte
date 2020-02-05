import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private router:Router) { }
  private data;
  private message;
  private lastState;

  setData(data,messaje,lastState){
    this.data= data;
    this.message=messaje;
    this.lastState = lastState;
  }

  getData(){
    let temp = [this.data, this.message, this.lastState];
    this.clearData();
    return temp;
  }
  clearData(){
    this.data = undefined;
  }
}

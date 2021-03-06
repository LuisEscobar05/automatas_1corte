import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {


  data = this.dataService.getData()[0];
  message = this.dataService.getData()[1];
  lastState = this.dataService.getData()[2];


  constructor(private dataService:DataService, private router:Router,) { 
    console.log(this.data);
    console.log(this.message);
    console.log(this.lastState);
  }

  ngOnInit() {
  }
  regresar(){
    this.router.navigateByUrl('/');
  }
}

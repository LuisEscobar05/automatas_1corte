import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  cadena;
  iterator=0;
  join;
  transicion;
  transiciones = [];
  lastState;
  errorMessage;
  otherMessage;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dataService: DataService) { }

  ngOnInit() {
  }

  evaluar(){
    this.cadena=this.cadena;
    if(this.cadena == undefined){
      this.otherMessage = "No puso ningun dato";
      this.dataService.setData(this.transiciones, this.otherMessage, this.lastState);
      this.router.navigateByUrl('/salida');
      this.iterator=0;
      this.transiciones = [];
    }else{
      this.q0();
      console.log(this.transiciones);
      this.dataService.setData(this.transiciones, this.errorMessage, this.lastState);
      this.router.navigateByUrl('/salida');
      this.iterator=0;
      this.transiciones = [];
    }

  }
  q0(){
    var c = this.cadena.charAt(this.iterator);
    while(this.iterator<3){
      console.log(c);
      console.log(this.iterator);
      this.iterator++;
      c = this.cadena.charAt(this.iterator);
    }
    console.log(this.iterator)
    this.join = this.cadena.substr(0,this.iterator);
    this.iterator--;
    console.log(this.join);
    if(this.join.match(/^for$/)){
      this.transicion = ["q0",this.join,"q1"];
      this.transiciones.push(this.transicion);  
      this.iterator++;
      this.q1();
      console.log(this.transiciones);
    }else{
      // this.error = true;
      this.lastState = "q0";
      this.errorMessage = "Bucle no valido debe ser for"
    }
  }

  q1(){
    if(this.cadena.charAt(this.iterator)==' '){
      this.iterator++;
      if(this.cadena.charAt(this.iterator)=='('){
        this.transicion = ["q1",this.cadena.charAt(this.iterator),"q2"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        console.log("ok1");
        this.q2();
      }else{
        this.lastState = "q1";
        this.errorMessage = "Entrada no valida---> "+ this.cadena.charAt(this.iterator)+ "   Falta un ( para continuar";
      }
    }else{
      this.lastState = "q1";
      this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un espacio para continuar";
    }
  }

  q2(){

    var ca = this.cadena.charAt(this.iterator);
    var aux = this.iterator;
    while(this.iterator<8){
      this.iterator++;
      ca = this.cadena.charAt(this.iterator)
    }

    if(this.cadena.substr(aux, this.iterator-aux).match(/int/)){
      this.transicion = ["q2",this.cadena.substr(aux,this.iterator-aux),"q3"];
      this.transiciones.push(this.transicion);
      this.iterator--;
      this.iterator++;
      console.log('ok3');
      this.q3();
    }else{
      this.iterator= aux;
      if(this.cadena.charAt(this.iterator)==" "){
        this.transicion = ["q2", "λ" ,"q27"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        this.q27();
      }else{
        this.lastState = "q2";
        this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un espacio o la palabra reservada 'int' para continuar";
      }

    }

  }

  q3(){
    if(this.cadena.charAt(this.iterator)==" "){
      this.iterator++;
      if(this.cadena.substr(this.iterator,1).match(/[a-z]/)){
        this.transicion = ["q3",this.cadena.charAt(this.iterator,1),"q4"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        console.log("ok3");
        this.q4();
      }else{
        this.lastState = "q3";
        this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta letra para continuar";
      }
    }else{
      this.lastState = "q3";
      this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un espacio para continuar";
    }
  }

  q4(){
    if(this.cadena.substr(this.iterator,1).match(/[a-z]/)){
      this.transicion = ["q4", this.cadena.substr(this.iterator,1),"q4"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok4");
      this.q4();
    }else{
      if(this.cadena.charAt(this.iterator)==" "){
        this.iterator++;
        if(this.cadena.charAt(this.iterator)=="="){
          this.transicion = ["q4",this.cadena.charAt(this.iterator),"q5"];
          this.transiciones.push(this.transicion);
          this.iterator++;
          console.log("ok4-2");
          this.q5();
        }else{
          this.lastState ="q4";
          this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un = para continuar";
        }
      }else{
        this.lastState ="q4";
        this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un espacio o una letra para continuar";
      }      

    }
  }

  q5(){
    if(this.cadena.charAt(this.iterator)==" "){
      this.iterator++;
      if(this.cadena.substr(this.iterator,1).match(/[0-9]/)){
        this.transicion = ["q5",this.cadena.substr(this.iterator,1),"q6"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        this.q6();
      }else{  
        this.lastState = "q5";
        this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un numero para continuar";
      }
   }else{
    this.lastState = "q5";
    this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un espacio para continuar";
   }
  }

  q6(){
    if(this.cadena.substr(this.iterator,1).match(/[0-9]/)){
      this.transicion = ["q6",this.cadena.substr(this.iterator,1),"q6"];
      this.transiciones.push(this.transicion);
      console.log("ok6");
      this.iterator++;
      this.q6();
    }else{
      if(this.cadena.charAt(this.iterator) == ";"){
        this.transicion = ["q6",this.cadena.charAt(this.iterator),"q7"];
        this.transiciones.push(this.transicion);
        console.log("ok6");
        this.iterator++;
        this.q7();
      }else{
        this.lastState = "q6";
        this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un ; para continuar";
      }
      
    }
  }

  q7(){
    if(this.cadena.charAt(this.iterator)==" "){
      this.iterator++;
      if(this.cadena.substr(this.iterator,1).match(/[a-z]/)){
        this.transicion = ["q7",this.cadena.charAt(this.iterator),"q8"];
        this.transiciones.push(this.transicion);
        console.log("ok7");
        this.iterator++;
        this.q8();
      }else{
        this.iterator--;
        if(this.cadena.charAt(this.iterator)==" "){
          this.transicion = ["q7","λ","q29"];
          this.transiciones.push(this.transicion);
          this.iterator++;
          this.q29();
        }else{
          this.lastState = "q7";
          this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta una letra o un vacio para continuar";
        }
      }
    }else{
      this.lastState = "q7";
      this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un espacio para continuar";
    }
  }

  q8(){
    if(this.cadena.substr(this.iterator,1).match(/[a-z]/)){
      this.transicion = ["q8",this.cadena.substr(this.iterator,1), "q8"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok8");
      this.q8();
    }else{
      if(this.cadena.charAt(this.iterator)=="<"){
        this.transicion = ["q8", this.cadena.charAt(this.iterator),"q9"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        console.log("ok8-1");
        this.q9();
      }else{
        if(this.cadena.charAt(this.iterator)==">"){
          this.transicion = ["q8",this.cadena.charAt(this.iterator),"q10"];
          this.transiciones.push(this.transicion);
          this.iterator++;
          console.log("ok8-2");
          this.q10();
        }else{
          if(this.cadena.charAt(this.iterator)=="!"){
            this.transicion = ["q8",this.cadena.charAt(this.iterator),"q11"];
            this.transiciones.push(this.transicion);
            this.iterator++;
            console.log("ok8-3");
            this.q11();
          }else{
            this.lastState = "q8";
            this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta el signo > o < o ! para continuar";
          }

        }
      } 
    }

  }

  q9(){
    if(this.cadena.charAt(this.iterator)=="="){
      this.transicion = ["q9",this.cadena.substr(this.iterator,1),"q13"];
      this.transiciones.push(this.transicion);
      console.log("ok9");
      this.iterator++;
      this.q13();
    }else{
      if(this.cadena.charAt(this.iterator)==" "){
        this.iterator++;
        if(this.cadena.substr(this.iterator,1).match(/[0-9]/)){
          this.transicion = ["q9",this.cadena.substr(this.iterator,1),"q12"];
          this.transiciones.push(this.transicion);
          console.log("ok9-2");
          this.iterator++;
          this.q12();
        }else{  
          this.lastState = "q9";
          this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un numero para continuar";
        }
      }else{
        this.lastState = "q9";
        this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un = o un espacio para continuar";
      }
    }


  }

  q10(){
    if(this.cadena.charAt(this.iterator)=="="){
      this.transicion = ["q10",this.cadena.substr(this.iterator,1),"q14"];
      this.transiciones.push(this.transicion);
      console.log("ok10");
      this.iterator++;
      this.q14();
    }else{
      if(this.cadena.charAt(this.iterator)==" "){
        this.iterator++;
        if(this.cadena.substr(this.iterator,1).match(/[0-9]/)){
          this.transicion = ["q10",this.cadena.substr(this.iterator,1),"q12"];
          this.transiciones.push(this.transicion);
          console.log("ok9-2");
          this.iterator++;
          this.q12();
        }else{  
          this.lastState = "q10";
          this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un numero para continuar";
        }
      }else{
        this.lastState = "q10";
        this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un = o un espacio para continuar";
      }
    }
  }

  q11(){
    if(this.cadena.charAt(this.iterator)=="="){
      this.transicion = ["q11",this.cadena.charAt(this.iterator),"q15"];
      this.transiciones.push(this.transicion);
      console.log("ok11");
      this.iterator++;
      this.q15();
    }else{  
      this.lastState = "q11";
      this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un = para continuar";
    }
  }
  q12(){
    if(this.cadena.substr(this.iterator,1).match(/[0-9]/)){
      this.transicion = ["q12",this.cadena.substr(this.iterator,1),"q12"];
      this.transiciones.push(this.transicion);
      console.log("ok12");
      this.iterator++;
      this.q12();
    }else{
      if(this.cadena.charAt(this.iterator) == ";"){
        this.transicion = ["q12",this.cadena.charAt(this.iterator),"q17"];
        this.transiciones.push(this.transicion);
        console.log("ok12-2");
        this.iterator++;
        this.q17();
      }else{
        this.lastState = "q12";
        this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un ; o un numero para continuar";
      }
      
    }
  }

  q13(){

    if(this.cadena.substr(this.iterator,1).match(/[0-9]/)){
      this.transicion = ["q13",this.cadena.substr(this.iterator,1),"q12"];
      this.transiciones.push(this.transicion);
      console.log("ok13");
      this.iterator++;
      this.q12();
    }else{  
      this.lastState = "q13";
      this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un numero para continuar";
    }
     

  }

  q14(){

    if(this.cadena.substr(this.iterator,1).match(/[0-9]/)){
      this.transicion = ["q14",this.cadena.substr(this.iterator,1),"q12"];
      this.transiciones.push(this.transicion);
      console.log("ok14-2");
      this.iterator++;
      this.q12();
    }else{  
      this.lastState = "q14";
      this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un numero para continuar";
    }
  }

  q15(){
    if(this.cadena.charAt(this.iterator)==" "){
      this.iterator++;
      if(this.cadena.charAt(this.iterator)=="-"){
        this.transicion = ["q15",this.cadena.charAt(this.iterator),"q16"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        console.log("ok15");
        this.q16();
      }else{
        if(this.cadena.substr(this.iterator,1).match(/[0-9]/)){
          this.transicion = ["q15", this.cadena.substr(this.iterator,1),"q12"];
          this.transiciones.push(this.transicion);
          this.iterator++;
          console.log("ok15-2");
          this.q12();
        }else{
          this.lastState = "q15";
          this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un signo - o un numero para continuar";
        }
  
      }
    }else{
      this.lastState = "q15";
      this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un espacio para continuar"; 
    }

  }


  q16(){
    if(this.cadena.substr(this.iterator,1).match(/[0-9]/)){
      this.transicion = ["q16", this.cadena.substr(this.iterator,1),"q12"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok16");
      this.q12();
    }else{
      this.lastState = "q16";
      this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un numero para continuar";
    }
  }

  q17(){
    if(this.cadena.charAt(this.iterator)==" "){
      this.iterator++;
      if(this.cadena.substr(this.iterator,1).match(/[a-z]/)){
        this.transicion = ["q17",this.cadena.substr(this.iterator,1),"q18"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        console.log("ok17");
        this.q18();
      }else{
        if(this.cadena.charAt(this.iterator-1)==" "){
          this.iterator--;
          this.transicion = ["q17","λ","q21"];
          this.transiciones.push(this.transicion);
          this.iterator++;
          console.log("ok17-2");
          this.q21();
        }
      }
    }else{
      this.lastState = "q17";
      this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un espacio para continuar";
    }
  }
//λ
  q18(){
    if(this.cadena.substr(this.iterator,1).match(/[a-z]/)){
      this.transicion = ["q18",this.cadena.substr(this.iterator,1), "q18"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok18");
      this.q18();
    }else{
      if(this.cadena.charAt(this.iterator)=="+"){
        this.transicion = ["q18",this.cadena.substr(this.iterator,1), "q19"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        console.log("ok18-2");
        this.q19();
      }else{
        if(this.cadena.charAt(this.iterator)=="-"){
          this.transicion = ["q18",this.cadena.substr(this.iterator,1), "q20"];
          this.transiciones.push(this.transicion);
          this.iterator++;
          console.log("ok18-3");
          this.q20();
        }else{
          this.lastState = "q18";
          this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta una letra, signo + o un signo - para continuar";
        }
      }
    }
  }

  q19(){
    if(this.cadena.charAt(this.iterator)=="+"){
      this.transicion = ["q19",this.cadena.substr(this.iterator,1), "q21"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok19");
      this.q21();
    }else{
      this.lastState = "q19";
      this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un signo + para continuar";
    }
  }


  q20(){
    if(this.cadena.charAt(this.iterator)=="-"){
      this.transicion = ["q20",this.cadena.substr(this.iterator,1), "q21"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok20");
      this.q21();
    }else{
      this.lastState = "q20";
      this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un signo - para continuar";
    }
  }

  q21(){
    if(this.cadena.charAt(this.iterator)==")"){
      this.transicion = ["q21",this.cadena.substr(this.iterator,1), "q22"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok21");
      this.q22();
    }else{
      this.lastState = "q21";
      this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un ) para continuar";
    }
  }

  q22(){
    if(this.cadena.charAt(this.iterator)=="{"){
      this.transicion = ["q22",this.cadena.substr(this.iterator,1), "q23"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok22");
      this.q23();
    }else{
      this.lastState = "q21";
      this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un ) para continuar";
    }
  }

  q23(){
    var ca = this.cadena.charAt(this.iterator);
    var aux = this.iterator;
    console.log(this.iterator);
    while(ca!=';'){
      this.iterator++;
      ca = this.cadena.charAt(this.iterator)
    }

    if(this.cadena.substr(aux,this.iterator-aux).match(/instrucciones/)){
      this.transicion = ["q23",this.cadena.substr(aux,this.iterator-aux),"q24"];
      this.transiciones.push(this.transicion);
      this.iterator--;
      this.iterator++;
      console.log("ok23");
      this.q24();
    }else{
      this.lastState = "q24";
      this.errorMessage = "Entrada no valida--->"+ this.cadena.substr(aux,this.iterator-aux)+"   Falta la palabra instrucciones para continuar";
    }
  }

  q24(){
    if(this.cadena.charAt(this.iterator)==";"){
      this.transicion = ["q24",this.cadena.substr(this.iterator,1), "q25"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok24");
      this.q25();
    }else{
      this.lastState = "q24";
      this.errorMessage = "Entrada no valida---> "+ this.cadena.substr(this.iterator,1)+ "   Falta un ; para continuar";
    }
  }

  q25(){
    if(this.cadena.charAt(this.iterator)=="\n"){
      this.iterator++;
      if(this.cadena.charAt(this.iterator)=="}"){
        this.transicion = ["q25",this.cadena.charAt(this.iterator),"q26"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        console.log("ok25");
        this.q26();
      }else{
        this.lastState = "q25";
        this.errorMessage = "Entrada no valida--->"+ this.cadena.charAt(this.iterator)+"   Falta un } para continuar";
      }
    }else{
      if(this.cadena.charAt(this.iterator)=="}"){
        this.transicion = ["q25",this.cadena.charAt(this.iterator),"q26"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        console.log("ok25");
        this.q26();
      }else{
        this.lastState = "q25";
        this.errorMessage = "Entrada no valida--->"+ this.cadena.charAt(this.iterator)+"   Falta } para continuar";
      }
    }
  }

  q26(){
    this.transicion = ["q26","Estado de aceptacion"];
    this.transiciones.push(this.transicion);
  }


  //ME FALTO EL LASO EN Q28
  q27(){
    if(this.cadena.charAt(this.iterator)==";"){
      this.transicion = ["q27",this.cadena.charAt(this.iterator),"q28"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok27");
      this.q28();
    }else{
      this.lastState = "q27";
      this.errorMessage = "Entrada no valida--->"+ this.cadena.charAt(this.iterator)+"   Falta ; para continuar";
    }
  }

  q28(){
    if(this.cadena.charAt(this.iterator)==" "){
      this.iterator++;
      if(this.cadena.substr(this.iterator,1).match(/[a-z]/)){
        this.transicion = ["q28",this.cadena.substr(this.iterator,1),"q8"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        console.log("ok28");
        this.q8();
      }else{
        this.iterator--;
        if(this.cadena.charAt(this.iterator)==" "){
          this.transicion = ["q28","λ","q29"];
          this.transiciones.push(this.transicion);
          this.iterator++;
          console.log("ok28-2");
          this.q29();
        }else{
          this.lastState = "q28";
          this.errorMessage = "Entrada no valida--->"+ this.cadena.charAt(this.iterator)+"   Falta una letra o un espacio para continuar";
        }
      }
    }else{
      this.lastState = "q28";
      this.errorMessage = "Entrada no valida--->"+ this.cadena.charAt(this.iterator)+"   Falta un espacio para continuar";
    }

  }

  q29(){
    if(this.cadena.charAt(this.iterator)==";"){
      this.transicion = ["q29",this.cadena.charAt(this.iterator),"q30"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok29");
      this.q30();
    }else{
      this.lastState = "q29";
      this.errorMessage = "Entrada no valida--->"+ this.cadena.charAt(this.iterator)+"   Falta ; para continuar";
    }
  }

  q30(){
    if(this.cadena.charAt(this.iterator)==" "){
      this.iterator++;
      if(this.cadena.substr(this.iterator,1).match(/[a-z]/)){
        this.transicion = ["q30",this.cadena.substr(this.iterator,1),"q18"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        console.log("ok30");
        this.q18();
      }else{
        this.iterator--;
        if(this.cadena.charAt(this.iterator)==" "){
          this.transicion = ["q30","λ","q21"];
          this.transiciones.push(this.transicion);
          this.iterator++;
          console.log("ok30-2");
          this.q21();
        }else{
          this.lastState = "q30";
          this.errorMessage = "Entrada no valida--->"+ this.cadena.charAt(this.iterator)+"   Falta una letra o un espacio para continuar";
        }
      }
    }else{
      this.lastState = "q30";
      this.errorMessage = "Entrada no valida--->"+ this.cadena.charAt(this.iterator)+"   Falta un espacio para continuar"; 
    }

  }

}

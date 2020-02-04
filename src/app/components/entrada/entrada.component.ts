import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {
  cadena;
  iterator=0;
  join;
  transicion;
  transiciones = [];
  error = false;
  errorMessage;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dataService: DataService) { }

  ngOnInit() {
  }

  evaluar(){
    this.cadena=this.cadena;
    console.log(this.cadena);
    this.q0();
    console.log(this.errorMessage);
    console.log(this.transiciones);
    this.dataService.setData(this.transiciones, this.errorMessage);
    this.router.navigateByUrl('/salida');
    this.iterator=0;
    this.transiciones = [];
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
      this.error = true;
      this.errorMessage = "Bucle no valido debe ser for"
    }
  }

  q1(){
    if(this.cadena.charAt(this.iterator)==' '){
      this.transicion = ["q1","λ","q2"];
      this.transiciones.push(this.transicion);
      console.log("Ok1");
      this.iterator++;
      this.q2();
    }else{
      this.errorMessage ="Falta espacio vacio"
    }
  }

  q2(){

    if(this.cadena.charAt(this.iterator)=='('){
      this.transicion = ["q2",this.cadena.charAt(this.iterator),"q3"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok2");
      this.q3();
    }else{
      this.errorMessage = "No se ingreso ---->("
    }
  }

  q3(){
    var ca = this.cadena.charAt(this.iterator);
    var aux = this.iterator;
    console.log(this.cadena.charAt(this.iterator))
    while(this.iterator<8){
      this.iterator++;
      console.log("testt"+this.iterator)
      ca = this.cadena.charAt(this.iterator)
    }
    console.log(aux);
    if(this.cadena.substr(aux, this.iterator).match(/int/)){
      this.transicion = ["q3",this.cadena.substr(aux,this.iterator-aux),"q4"];
      this.transiciones.push(this.transicion);
      this.iterator--;
      this.iterator++;
      console.log('ok3');
      this.q4();
    }else{
      if(this.cadena.charAt(aux)==' '){
        this.transicion = ["q3","λ","q30"];
        this.transiciones.push(this.transicion);
        this.iterator = aux;
        console.log(this.iterator);
        this.iterator++;
        console.log('ok3-2');
        this.q30();
      }else{
        this.errorMessage = "Falta un vacio o la palabra reservada 'int'";
      }
    }
  }

  q4(){
    console.log(this.cadena.charAt(this.iterator));
    if(this.cadena.charAt(this.iterator)==" "){
      this.transicion = ["q4","λ","q5"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log('ok4');
      this.q5();
    }else{
      this.errorMessage="Falta espacio";
    }
  }

  q5(){
    if(this.cadena.charAt(this.iterator)=="i"){
      this.transicion = ["q5",this.cadena.charAt(this.iterator),"q6"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok5");
      this.q6();
    }else{
      this.errorMessage="Falta i";
    }
  }

  q6(){
    if(this.cadena.charAt(this.iterator)==" "){
      this.transicion = ["q6","λ","q7"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok6");
      this.q7();
    }else{
      this.errorMessage="Falta vacio";
    }
  }

  q7(){
    if(this.cadena.charAt(this.iterator)=='='){
      this.transicion = ["q7", this.cadena.charAt(this.iterator),"q8"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok7");
      this.q8();
    }else{
      this.errorMessage="Falta =";
    }
  }

  q8(){
    if(this.cadena.charAt(this.iterator)==" "){
      this.transicion = ["q8", "λ","q9"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok8")
      this.q9();
   }else{
     this.errorMessage = "Falta vacio";
   }
  }

  q9(){
    if(this.cadena.charAt(this.iterator)== 0){
      this.transicion = ["q9",this.cadena.charAt(this.iterator),"q10"];
      this.transiciones.push(this.transicion);
      console.log("ok9");
      this.iterator++;
      this.q10();
    }else{
      if(this.cadena.charAt(this.iterator)==5){
        this.q11();
      }else{
        this.errorMessage = "Falta un 0 o 5";
      }
      
    }
  }

  q11(){
    this.transicion = ["q9",this.cadena.charAt(this.iterator),"q11"];
    this.transiciones.push(this.transicion);
    this.transicion = ["q11","noRead","q10"];
    this.transiciones.push(this.transicion);
    console.log("ok11");
    this.iterator++;
    this.q10();
  }
  q10(){
    if(this.cadena.charAt(this.iterator)==";"){
      this.transicion = ["q10",this.cadena.charAt(this.iterator),"q12"];
      this.transiciones.push(this.transicion);
      console.log("ok10");
      this.iterator++;
      this.q12();
    }else{
      this.errorMessage = "Falta un ;";
    }

  }

  q12(){
    if(this.cadena.charAt(this.iterator)==" "){
      this.transicion = ["q12","λ","q13"];
      this.transiciones.push(this.transicion);
      console.log("ok12");
      this.iterator++;
      this.q13();
    }else{
      this.errorMessage= "Falta vacio";
    }
  }

  q13(){
    if(this.cadena.charAt(this.iterator)=="i"){
      this.transicion = ["q13",this.cadena.charAt(this.iterator),"q14"];
      this.transiciones.push(this.transicion);
      console.log("ok13");
      this.iterator++;
      this.q14();
    }else{
      this.errorMessage = "Falto i";
    }
  }
  
  q14(){
    if(this.cadena.charAt(this.iterator)=="<"){
      this.transicion = ["q14", this.cadena.charAt(this.iterator),"q15"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok14");
      this.q15();
    }else{
      this.q16();
    }
  }

  q15(){
    if(this.cadena.charAt(this.iterator)==" "){
      this.transicion = ["q15","λ","q17"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok15");
      this.q17();
    }else{
      this.errorMessage= "Falta espacio vacio";
    }
  }

  q16(){
    if(this.cadena.charAt(this.iterator)==">"){
      this.transicion = ["q14",this.cadena.charAt(this.iterator),"q16"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok16");
      this.q18();
    }else{
      this.errorMessage = "Falta el >";
    }
  }

  q17(){
    if(this.cadena.charAt(this.iterator)==1){
      this.transicion = ["q17",this.cadena.charAt(this.iterator),"q19"];
      this.transicion.push(this.transicion);
      this.iterator++;
      console.log("ok17");
      this.q19();
    }else{
      this.errorMessage= "Falto el 1";
    }
  }

  q18(){
    if(this.cadena.charAt(this.iterator)=="="){
      this.transicion = ["q16",this.cadena.charAt(this.iterator),"q18"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok18");
      this.q19();
    }else{
      this.errorMessage ="Falta el = ";
    }
  }

  q19(){

  }

  q30(){
    if(this.cadena.charAt(this.iterator)==";"){
      this.transicion = ["q30",this.cadena.charAt(this.iterator),"q31"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok30");
      this.q31();
    }else{
      this.errorMessage = "Falta el ;";
    }

  }

  q31(){
    if(this.cadena.charAt(this.iterator)==' '){
      this.transicion = ["q30","λ","q31"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok31");
      this.q32();
    }else{
      this.errorMessage = "Falta el vacio";
    }
  }

  //aqui quedee
  //checar ´palabra resultado por que no deberia de hacer el ciclo y mas adelante no me reconoce el !

  q32(){
    var ca = this.cadena.charAt(this.iterator);
    var aux = this.iterator;
    while(this.iterator<9){
      this.iterator++;
      console.log(ca)
      ca = this.cadena.charAt(this.iterator)
    }
    if(this.cadena.substr(aux, this.iterator).match(/resultado/)){
      this.transicion = ["q32",this.cadena.substr(aux,this.iterator),"q33"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log('ok32');
      this.q33();
    }else{
      if(this.cadena.charAt(aux)==";"){
        this.iterator = aux;
        this.transicion=["q32",this.cadena.charAt(this.iterator),"q34"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        console.log('ok32-2');
        this.q34();
      }else{
        this.errorMessage = "Falta la palabra reservada 'resultado' o el ;";
      }
    }
  }


  q33(){
    console.log(this.iterator);
    if(this.cadena.charAt(this.iterator)=="!"){
      this.transicion = ["q33",this.cadena.charAt(this.iterator),"q35"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok33");
      this.q35();
    }else{
      this.errorMessage = "Falta el !"; 
    }
  }

  q34(){
    this.transicion = ["q34",this.cadena.charAt(this.iterator),"q36"];
    this.q36();
  }


  q35(){
    if(this.cadena.charAt(this.iterator)=="="){
      this.transicion = ["q35",this.cadena.charAt(this.iterator),"q36"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      console.log("ok35");
      this.q36();
    }else{
      this.errorMessage = "Falta el =";
    }
  }



  q36(){

  }

  q37(){

  }

}

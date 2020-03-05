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
  iterator = 0;
  join;
  transicion;
  transiciones = [];
  lastState;
  errorMessage;
  otherMessage;
  estado1;
  estado2;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dataService: DataService) { }

  ngOnInit() {
  }

  evaluar() {
    this.cadena = this.cadena;
    if (this.cadena == undefined) {
      this.otherMessage = "No puso ningun dato";
      this.dataService.setData(this.transiciones, this.otherMessage, this.lastState);
      this.router.navigateByUrl('/salida');
    } else {
      this.q0();
      console.log(this.transiciones);
      this.dataService.setData(this.transiciones, this.errorMessage, this.lastState);
      this.router.navigateByUrl('/salida');
      this.iterator = 0;
      this.transiciones = [];
    }

  }
  q0() {
    var c = this.cadena.charAt(this.iterator);
    while (this.iterator < 3) {
      this.iterator++;
      c = this.cadena.charAt(this.iterator);
    }
    if (this.cadena.substr(0,this.iterator).match(/^for$/)) {
      this.transicion = ["q0",this.cadena.substr(0,this.iterator), "q1"];
      this.transiciones.push(this.transicion);
      this.q1();
    } else {
      this.lastState = "q0";
      this.errorMessage = "Bucle no valido debe ser for"
    }
  }

  q1() {
    if (this.cadena.charAt(this.iterator) == ' ') {
      this.iterator++;
      if (this.cadena.charAt(this.iterator) == '(') {
        this.transicion = ["q1", this.cadena.charAt(this.iterator), "q2"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        this.q2();
      } else {
        this.lastState = "q1";
        this.errorMessage = "Entrada no valida---> " + this.cadena.charAt(this.iterator) + "   Falta un ( para continuar";
      }
    } else {
      this.lastState = "q1";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un espacio para continuar";
    }
  }

  q2() {
    var ca = this.cadena.charAt(this.iterator);
    var aux = this.iterator;
    while (this.iterator < 8) {
      this.iterator++;
      ca = this.cadena.charAt(this.iterator)
    }

    if (this.cadena.substr(aux, this.iterator - aux).match(/int/)) {
      this.transicion = ["q2", this.cadena.substr(aux, this.iterator - aux), "q3"];
      this.transiciones.push(this.transicion);
      this.q3();
    } else {
      this.iterator = aux;
      this.estado1 = "q2";
      this.estado2 = "q27";
      if (this.sinComponente(this.cadena.charAt(this.iterator))) {
        this.q27();
      } else {
        this.lastState = "q2";
        this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un espacio o la palabra reservada 'int' para continuar";
      }
    }
  }

  q3() {
    if (this.cadena.charAt(this.iterator) == " ") {
      this.iterator++;
      this.estado1 = "q3";
      this.estado2 = "q4";
      if (this.validarLetra(this.cadena.substr(this.iterator, 1))){
        this.q4();
      } else {
        this.lastState = "q3";
        this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta letra para continuar";
      }
    } else {
      this.lastState = "q3";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un espacio para continuar";
    }
  }

  q4() {
    this.estado1= "q4";
    this.estado2="q4";
    if (this.validarLetra(this.cadena.substr(this.iterator, 1))) {
      this.q4();
    } else if (this.cadena.charAt(this.iterator) == " ") {
      this.iterator++;
      if (this.cadena.charAt(this.iterator) == "=") {
        this.transicion = ["q4", this.cadena.charAt(this.iterator), "q5"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        this.q5();
      } else {
        this.lastState = "q4";
        this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un = para continuar";
      }
    } else {
      this.lastState = "q4";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un espacio o una letra para continuar";
    }
  }

  q5() {
    if (this.cadena.charAt(this.iterator) == " ") {
      this.iterator++;
      this.estado1 = "q5";
      this.estado2 = "q6";
      if (this.validarNumero(this.cadena.substr(this.iterator, 1))) {
        this.q6();
      } else {
        this.lastState = "q5";
        this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un numero para continuar";
      }
    } else {
      this.lastState = "q5";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un espacio para continuar";
    }
  }

  q6() {
    this.estado1= "q6";
    this.estado2 = "q6";
    if (this.validarNumero(this.cadena.substr(this.iterator, 1))) {
      this.q6();
    } else if (this.cadena.charAt(this.iterator) == ";") {
      this.transicion = ["q6", this.cadena.charAt(this.iterator), "q7"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.q7();
    } else {
      this.lastState = "q6";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un ; para continuar";
    }
  }

  q7() {
    if (this.cadena.charAt(this.iterator) == " ") {
      this.iterator++;
      this.estado1 ="q7";
      this.estado2 ="q8";
      if (this.validarLetra(this.cadena.substr(this.iterator, 1))) {
        this.q8();
      } else {
        this.iterator--;
        this.estado2="q29";
        if (this.sinComponente(this.cadena.charAt(this.iterator))) {
          this.q29();
        } else {
          this.lastState = "q7";
          this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta una letra o un vacio para continuar";
        }
      }
    } else {
      this.lastState = "q7";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un espacio para continuar";
    }
  }

  q8() {
    this.estado1="q8";
    this.estado2="q8";
    if (this.validarLetra(this.cadena.substr(this.iterator, 1))) {
      this.q8();
    } else if (this.cadena.charAt(this.iterator) == "<") {
      this.transicion = ["q8", this.cadena.charAt(this.iterator), "q9"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.q9();
    } else if (this.cadena.charAt(this.iterator) == ">") {
      this.transicion = ["q8", this.cadena.charAt(this.iterator), "q10"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.q10();
    } else if (this.cadena.charAt(this.iterator) == "!") {
      this.transicion = ["q8", this.cadena.charAt(this.iterator), "q11"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.q11();
    } else {
      this.lastState = "q8";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta el signo > o < o ! para continuar";
    }
  }

  q9() {
    if (this.cadena.charAt(this.iterator) == "=") {
      this.transicion = ["q9", this.cadena.substr(this.iterator, 1), "q13"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.q13();
    } else {
      if (this.cadena.charAt(this.iterator) == " ") {
        this.iterator++;
        this.estado1="q9";
        this.estado2="q12";
        if (this.validarNumero(this.cadena.substr(this.iterator, 1))) {
          this.q12();
        } else {
          this.lastState = "q9";
          this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un numero para continuar";
        }
      } else {
        this.lastState = "q9";
        this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un = o un espacio para continuar";
      }
    }


  }

  q10() {
    if (this.cadena.charAt(this.iterator) == "=") {
      this.transicion = ["q10", this.cadena.substr(this.iterator, 1), "q14"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.q14();
    } else {
      if (this.cadena.charAt(this.iterator) == " ") {
        this.iterator++;
        this.estado1= "q10";
        this.estado2= "q12";
        if (this.validarNumero(this.cadena.substr(this.iterator, 1))) {
          this.q12();
        } else {
          this.lastState = "q10";
          this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un numero para continuar";
        }
      } else {
        this.lastState = "q10";
        this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un = o un espacio para continuar";
      }
    }
  }

  q11() {
    if (this.cadena.charAt(this.iterator) == "=") {
      this.transicion = ["q11", this.cadena.charAt(this.iterator), "q15"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.q15();
    } else {
      this.lastState = "q11";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un = para continuar";
    }
  }

  q12() {
    this.estado1 = "q12";
    this.estado2 = "q12";
    if (this.validarNumero(this.cadena.substr(this.iterator, 1))) {
      this.q12();
    } else {
      if (this.cadena.charAt(this.iterator) == ";") {
        this.transicion = ["q12", this.cadena.charAt(this.iterator), "q17"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        this.q17();
      } else {
        this.lastState = "q12";
        this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un ; o un numero para continuar";
      }

    }
  }

  q13() {
    this.estado1 ="q13";
    this.estado2= "q12";
    if (this.validarNumero(this.cadena.substr(this.iterator, 1))) {
      this.q12();
    } else {
      this.lastState = "q13";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un numero para continuar";
    }
  }

  q14() {
    this.estado1="q14";
    this.estado2="q12";
    if (this.validarNumero(this.cadena.substr(this.iterator, 1))) {
      this.q12();
    } else {
      this.lastState = "q14";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un numero para continuar";
    }
  }

  q15() {
    if (this.cadena.charAt(this.iterator) == " ") {
      this.iterator++;
      if (this.cadena.charAt(this.iterator) == "-") {
        this.transicion = ["q15", this.cadena.charAt(this.iterator), "q16"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        this.q16();
      } else {
        this.estado1="q15";
        this.estado2="q12";
        if (this.validarNumero(this.cadena.substr(this.iterator, 1))) {
          this.q12();
        } else {
          this.lastState = "q15";
          this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un signo - o un numero para continuar";
        }

      }
    } else {
      this.lastState = "q15";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un espacio para continuar";
    }

  }

  q16() {
    this.estado1 = "q16";
    this.estado2 = "q12";
    if (this.validarNumero(this.cadena.substr(this.iterator, 1))){
      this.q12();
    } else {
      this.lastState = "q16";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un numero para continuar";
    }
  }

  q17() {
    if (this.cadena.charAt(this.iterator) == " ") {
      this.iterator++;
      this.estado1 = "q17";
      this.estado2 = "q18";
      if (this.validarLetra(this.cadena.substr(this.iterator, 1))){
        this.q18();
      } else {
        this.estado2 = "q21";
        this.iterator--;
        if (this.sinComponente(this.cadena.charAt(this.iterator - 1))) {
          this.q21();
        }
      }
    } else {
      this.lastState = "q17";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un espacio para continuar";
    }
  }

  q18() {
    this.estado1 ="q18";
    this.estado2 = "q18";
    if (this.validarLetra(this.cadena.substr(this.iterator, 1))) {
      this.q18();
    } else if (this.cadena.charAt(this.iterator) == "+") {
        this.transicion = ["q18", this.cadena.substr(this.iterator, 1), "q19"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        this.q19();
      } else if (this.cadena.charAt(this.iterator) == "-") {
        this.transicion = ["q18", this.cadena.substr(this.iterator, 1), "q20"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        this.q20();
      } else {
        this.lastState = "q18";
        this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta una letra, signo + o un signo - para continuar";
      }
  }

  q19() {
    if (this.cadena.charAt(this.iterator) == "+") {
      this.transicion = ["q19", this.cadena.substr(this.iterator, 1), "q21"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.q21();
    } else {
      this.lastState = "q19";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un signo + para continuar";
    }
  }

  q20() {
    if (this.cadena.charAt(this.iterator) == "-") {
      this.transicion = ["q20", this.cadena.substr(this.iterator, 1), "q21"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.q21();
    } else {
      this.lastState = "q20";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un signo - para continuar";
    }
  }

  q21() {
    if (this.cadena.charAt(this.iterator) == ")") {
      this.transicion = ["q21", this.cadena.substr(this.iterator, 1), "q22"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.q22();
    } else {
      this.lastState = "q21";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un ) para continuar";
    }
  }

  q22() {
    if (this.cadena.charAt(this.iterator) == "{") {
      this.transicion = ["q22", this.cadena.substr(this.iterator, 1), "q23"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.q23();
    } else {
      this.lastState = "q21";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un ) para continuar";
    }
  }

  q23() {
    var validate = /^;$|^\s$|^\n$|^}$/;
    var ca = this.cadena.charAt(this.iterator);
    var aux = this.iterator;
    do {
      this.iterator++;
      ca = this.cadena.charAt(this.iterator)
      console.log(ca)
    } while (ca != ca.match(validate))

    if (this.cadena.substr(aux, (this.iterator - aux)).match(/instrucciones/)) {
      this.transicion = ["q23", this.cadena.substr(aux, this.iterator - aux), "q24"];
      this.transiciones.push(this.transicion);
      this.q24();
    } else {
      this.lastState = "q24";
      this.errorMessage = "Entrada no valida--->" + this.cadena.substr(aux, this.iterator - aux) + "   Falta la palabra instrucciones para continuar";
    }
  }

  q24() {
    if (this.cadena.charAt(this.iterator) == ";") {
      this.transicion = ["q24", this.cadena.substr(this.iterator, 1), "q25"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.q25();
    } else {
      this.lastState = "q24";
      this.errorMessage = "Entrada no valida---> " + this.cadena.substr(this.iterator, 1) + "   Falta un ; para continuar";
    }
  }

  q25() {
    if (this.cadena.charAt(this.iterator) == "\n") {
      this.iterator++;
      if (this.cadena.charAt(this.iterator) == "}") {
        this.transicion = ["q25", this.cadena.charAt(this.iterator), "q26"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        this.q26();
      } else {
        this.lastState = "q25";
        this.errorMessage = "Entrada no valida--->" + this.cadena.charAt(this.iterator) + "   Falta un } para continuar";
      }
    } else {
      if (this.cadena.charAt(this.iterator) == "}") {
        this.transicion = ["q25", this.cadena.charAt(this.iterator), "q26"];
        this.transiciones.push(this.transicion);
        this.iterator++;
        this.q26();
      } else {
        this.lastState = "q25";
        this.errorMessage = "Entrada no valida--->" + this.cadena.charAt(this.iterator) + "   Falta } para continuar";
      }
    }
  }

  q26() {
    this.transicion = ["q26", "Estado de aceptacion"];
    this.transiciones.push(this.transicion);
  }

  q27() {
    if (this.cadena.charAt(this.iterator) == ";") {
      this.transicion = ["q27", this.cadena.charAt(this.iterator), "q28"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.q28();
    } else {
      this.lastState = "q27";
      this.errorMessage = "Entrada no valida--->" + this.cadena.charAt(this.iterator) + "   Falta ; para continuar";
    }
  }

  q28() {
    if (this.cadena.charAt(this.iterator) == " ") {
      this.iterator++;
      this.estado1 = "q28";
      this.estado2 = "q8";
      if (this.validarLetra(this.cadena.substr(this.iterator, 1))) {
        this.q8();
      } else {
        this.iterator--;
        this.estado2 = "q29";
        if (this.sinComponente(this.cadena.charAt(this.iterator))) {
          this.q29();
        } else {
          this.lastState = "q28";
          this.errorMessage = "Entrada no valida--->" + this.cadena.charAt(this.iterator) + "   Falta una letra o un espacio para continuar";
        }
      }
    } else {
      this.lastState = "q28";
      this.errorMessage = "Entrada no valida--->" + this.cadena.charAt(this.iterator) + "   Falta un espacio para continuar";
    }

  }

  q29() {
    if (this.cadena.charAt(this.iterator) == ";") {
      this.transicion = ["q29", this.cadena.charAt(this.iterator), "q30"];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.q30();
    } else {
      this.lastState = "q29";
      this.errorMessage = "Entrada no valida--->" + this.cadena.charAt(this.iterator) + "   Falta ; para continuar";
    }
  }

  q30() {
    if (this.cadena.charAt(this.iterator) == " ") {
      this.iterator++;
      this.estado1="q30";
      this.estado2= "q18";
      if (this.validarLetra(this.cadena.substr(this.iterator, 1))) {
        this.q18();
      } else {
        this.iterator--;
        this.estado2 = "q21";
        if (this.sinComponente(this.cadena.charAt(this.iterator))) {
          this.q21();
        } else {
          this.lastState = "q30";
          this.errorMessage = "Entrada no valida--->" + this.cadena.charAt(this.iterator) + "   Falta una letra o un espacio para continuar";
        }
      }
    } else {
      this.lastState = "q30";
      this.errorMessage = "Entrada no valida--->" + this.cadena.charAt(this.iterator) + "   Falta un espacio para continuar";
    }

  }

  validarNumero(cadena){
    if(cadena.match(/[0-9]/)){
      this.transicion = [this.estado1,this.cadena.substr(this.iterator,1),this.estado2];
      this.transiciones.push(this.transicion);
      this.iterator++;
      return true;
    }else return false; 
  }

  validarLetra(cadena){
    if(cadena.match(/[a-z]/)){
      this.transicion = [this.estado1,this.cadena.substr(this.iterator,1),this.estado2];
      this.transiciones.push(this.transicion);
      this.iterator++;
      return true;
    }else return false;
  }

  sinComponente(cadena){
    if(cadena.match()){
      this.transicion = [this.estado1, "λ", this.estado2];
      this.transiciones.push(this.transicion);
      this.iterator++;
      return true;
    }else return false;
  }

}

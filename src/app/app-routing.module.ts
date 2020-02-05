import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputComponent } from './components/input/input.component';
import { OutputComponent } from './components/output/output.component';



const routes: Routes = [
  {
    path:'',
    component:InputComponent
  },
  {
    path:'salida',
    component:OutputComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

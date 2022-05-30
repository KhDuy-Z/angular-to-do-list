import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTodoComponent } from './home-todo/home-todo.component';

const routes: Routes = [
  { path:'', component:HomeTodoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

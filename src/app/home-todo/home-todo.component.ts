import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './home-todo.component.html',
  styleUrls: ['./home-todo.component.scss']
})
export class HomeTodoComponent implements OnInit {

  hometodoForm !: FormGroup;
  tasks : ITask [] = [];
  inprogress : ITask [] = [];
  done : ITask [] = [];
  updateIndex !: any;
  isEditEnabled : boolean = false;
  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.hometodoForm = this.fb.group({
      item : ['', Validators.required]
    })
  }

  addTask(){
    this.tasks.push({
      description:this.hometodoForm.value.item,
      done:false
    });
    this.hometodoForm.reset();

    localStorage.setItem('tasks',JSON.stringify(this.hometodoForm))
  }

  onEdit(item: ITask, i: number){
    this.hometodoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  updateTask(){
    this.tasks[this.updateIndex].description = this.hometodoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.hometodoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  deleteTask(i: number){
    this.tasks.splice(i,1);
  }

  deleteIngrogressTask(i: number){
    this.inprogress.splice(i,1);
  }

  deleteDoneTask(i: number){
    this.done.splice(i,1);
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

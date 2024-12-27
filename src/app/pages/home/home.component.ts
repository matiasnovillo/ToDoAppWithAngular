import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
//Models
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  lstTask = signal<Task[]>([]);

  ctrlNewTask = new FormControl("", {
    nonNullable : true,
    validators : [
      Validators.required
    ]
  });

  addTask(){
    if(this.ctrlNewTask.valid){
      const title = this.ctrlNewTask.value.trim();
      if(title !== ''){
        const newTask : Task = {
          id: Date.now(),
          title: title,
          completed: false
        }
        this.lstTask.update((lst) => [...this.lstTask(), newTask]);
        this.ctrlNewTask.setValue('');
      }
    }
  }

  filter = signal<'all'|'completed'|'pending'>('all');

  changeFilter(type: 'all'|'completed'|'pending'){
    this.filter.set(type);
  }

  lstTaskByFilter = computed(() => {
    const filter = this.filter();
    const lstTask = this.lstTask();

    if(filter === 'pending'){
      return lstTask.filter((task) => !task.completed)
    }

    if(filter === 'completed') {
      return lstTask.filter((task) => task.completed);
    }

    return lstTask;
  })

  checkTask(index : number){
    this.lstTask.update((lst) =>
      lst.map((task, position) => {
        if(position === index){
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task
      })
    )
  }

  deleteTask(index: number){
    this.lstTask.update((lst) => lst.filter((task, position) => position !== index))
  }

  updateTaskEditingMode(index: number){
    this.lstTask.update((lst) => {
      return lst.map((task, position) => {
        if(position === index){
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        }
      })
    }
    )
  }

  updateTaskSave(index: number, event: Event){
    const value = event.target as HTMLInputElement;
    this.lstTask.update((lst) => {
      return lst.map((task, position) => {
        if(position === index){
          return {
            ...task,
            editing: false,
            title: value.value
          }
        }
        return task
      })
    })
  }

  clearCompletedTask(){
    this.lstTask.update((lst) => {
      return lst.filter((task, position) => !task.completed)
    })
  }
}

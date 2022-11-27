import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj: Task = new Task();
  taskArray: Task[] = [];


  addTaskValue: string = '';
  editTaskValue: string = '';
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArray = [];
    this.getAllTask();
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe(res => {
      this.taskArray = res;
    }, err => {
      console.log("unable to get all tasks");
    });
  }

  addTask() {
    this.taskObj.taskName = this.addTaskValue;
    if (this.taskObj.taskName === '') {
      alert('enter task name please');
    } else {
      this.crudService.addTask(this.taskObj).subscribe(res => {
        this.ngOnInit();

        this.addTaskValue = '';

      }, err => {
        alert(err);
      });
    }

  }

  editTask() {
    this.taskObj.taskName = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      console.log('faild to edit the task');
    });
  }

  deleteTask(task: Task) {
    this.crudService.deleteTask(task).subscribe(res => {
      this.ngOnInit();
    }, err => {
      console.log('faild to delete the task');
    });
  }

  call(task: Task) {
    this.taskObj = task;
    this.editTaskValue = task.taskName;
  }
}

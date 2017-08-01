import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TasksService} from "../../services/tasks.service";

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit, OnDestroy {
  private _id: number
  public dones: any[]
  private nameColumn: string = 'done'
  public done: any
  public data: any

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private tasksService: TasksService) {
  }

  ngOnInit() {
    this.tasksService.GetList(this.nameColumn).subscribe((res: any) => {
      this.dones = res
    })
    this.done = {}
    this.data = {}
  }

  DeleteTask = (id: number) => {
    console.log(id)
    let confirmResult = confirm('Are you sure delete item?')
    if (confirmResult) {
      this.tasksService.DeleteTask(id, this.nameColumn).subscribe((res: any) => {
        console.log(this.nameColumn.toUpperCase() + ' Deleted Success id : ' + id)
        this.LoadTasks()
      })
    }
  }

  HandleEventKeyPress = (keyCode: number) => {
    if (keyCode === 13) {
      this.UpdateTask()
      this.LoadTasks()
    }
  }

  UpdateTask = () => {
    this.done.updated_at = Date.now().toString()
    if (this.done.name === '') {
      alert('Name is required !')
      this.tasksService.GetDataTaskById(this.done.id, this.nameColumn).subscribe((res: any) => {
        this.data = res
      })
    } else {
      this.tasksService.UpdateTask(this._id, this.nameColumn, this.done).subscribe((res: any) => {
        if (res) {
          console.log(this.nameColumn.toUpperCase() + ' Update Success id : ' + this.done.id)
          this.LoadTasks()
        }
      })
    }
  }

  GetDataByIdTask = (id: number) => {
    this._id = id
    this.tasksService.GetDataTaskById(id, this.nameColumn).subscribe((res) => {
      this.done = res
      console.log(this.nameColumn.toUpperCase() + ' GetDataById Success')
    })
  }

  LoadTasks = () => {
    this.tasksService.GetList(this.nameColumn).subscribe((res: any) => {
      this.dones = res
      console.log(this.nameColumn.toUpperCase() + ' LoadTask Success')
    })
  }

  CreateTask = (data: any) => {
    data.updated_at = Date.now().toString()
    data.created_at = Date.now().toString()
    if (data.name === '' || data.content === '') {
      alert('Name or Content is required !')
    } else {
      this.tasksService.CreateTask(this.nameColumn, data).subscribe((res: any) => {
        if (res) {
          console.log(this.nameColumn.toUpperCase() + ' Create Success id: ' + res.id)
          this.LoadTasks()
        }
      })
    }
  }

  ngOnDestroy() {

  }
}

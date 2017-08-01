import {Component, OnInit} from '@angular/core';
import {TasksService} from "../../services/tasks.service";

@Component({
  selector: 'app-doing',
  templateUrl: './doing.component.html',
  styleUrls: ['./doing.component.scss']
})
export class DoingComponent implements OnInit {
  private _id: number
  public doings: any[]
  private nameColumn: string = 'doing'
  public doing: any
  public data: any
  public showModal: boolean

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.doing = {}
    this.data = {}
    this.LoadTasks()
  }

  CreateTask = () => {
    this.doing.created_at = Date.now().toString()
    this.doing.updated_at = Date.now().toString()
    this.tasksService.CreateTask(this.nameColumn, this.doing).subscribe((res: any) => {
      if (res) {
        console.log(this.nameColumn.toUpperCase() + ' Created Success id : ' + res.id)
        this.LoadTasks()
      }
    })
  }

  UpdateTask = () => {
    this.doing.updated_at = Date.now().toString()
    if (this.doing.name === '') {
      alert('Name is required !')
      this.tasksService.GetDataTaskById(this._id, this.nameColumn).subscribe((res: any) => {
        this.doing = res
      })
    } else {
      this.tasksService.UpdateTask(this._id, this.nameColumn, this.doing).subscribe((res: any) => {
        if (res) {
          console.log(this.nameColumn.toUpperCase() + ' Updated Success id :' + this._id)
          this.LoadTasks()
        }
      })
    }
  }

  DeleteTask = (id: number) => {
    this.tasksService.DeleteTask(id, this.nameColumn).subscribe((res: any) => {
      let confirmResult = confirm('Are you sure delete item?')
      if (confirmResult) {
        console.log(this.nameColumn.toUpperCase() + ' Deleted Success id :' + id)
        this.LoadTasks()
      }
    })
  }

  HandleEventKeyPress = (keyCode: number) => {
    if (keyCode === 13) {
      this.UpdateTask()
      this.LoadTasks()
      this.showModal = false
      this.AfterEventKeyEnter()
    }
  }

  AfterEventKeyEnter = () => {
    return true
  }

  LoadTasks = () => {
    this.tasksService.GetList(this.nameColumn).subscribe((res: any) => {
      if (res) {
        this.doings = res
        console.log(this.nameColumn.toUpperCase() + ' LoadTask Success')
      }
    })
  }

  GetDataByIdTask = (id: number) => {
    this._id = id
    this.tasksService.GetDataTaskById(this._id, this.nameColumn).subscribe((res: any) => {
      if (res) {
        this.doing = res
        console.log(this.nameColumn.toUpperCase() + ' GetDataById Success')
      }
    })
  }
}

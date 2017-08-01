import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from "@angular/router"
import {TasksService} from "../../services/tasks.service"

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  private _id: number
  private nameColumn: string = 'new'
  public news: any[]
  public new: any
  public err: any
  public data: any

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private tasksService: TasksService) {
  }

  ngOnInit() {
    this.new = {}
    this.data = {}
    this.LoadTasks()
    this.err = {
      status: true,
      message: '',
    }
  }

  CreateTask = () => {
    this.new.created_at = Date.now().toString()
    this.new.updated_at = Date.now().toString()
    this.tasksService.CreateTask(this.nameColumn, this.new).subscribe((res: any) => {
      if (res) {
        console.log(this.nameColumn.toUpperCase() + ' Created Success id :' + res.id)
        this.LoadTasks()
      }
      console.log(res)
    })
  }

  HandleEventKeyPress = (keyCode: number) => {
    if (keyCode === 13) {
      this.UpdateTask()
      this.LoadTasks()
    }
  }

  UpdateTask = () => {
    this.new.updated_at = Date.now().toString()
    if (this.new.name === '') {
      alert('Name is required !')
      this.tasksService.GetDataTaskById(this._id, this.nameColumn).subscribe((res: any) => {
        this.new = res
      })
    } else {
      this.tasksService.UpdateTask(this._id, this.nameColumn, this.new).subscribe((res: any) => {
        if (res) {
          console.log(this.nameColumn.toUpperCase() + ' Updated Success id :' + this._id)
          this.LoadTasks()
        }
      })
    }
    this.LoadTasks()
  }

  DeleteTask = (id: number) => {
    this.tasksService.DeleteTask(id, this.nameColumn).subscribe((res: any) => {
      let confirmResult = confirm('Are you sure delete item?')
      if (confirmResult) {
        console.log(this.nameColumn.toUpperCase() + ' Deleted Success id :' + id)
        this.LoadTasks()
      }
      if (res.status === 404) {
        console.log(res)
        this.LoadTasks()
      }
    })
  }

  LoadTasks = () => {
    this.tasksService.GetList(this.nameColumn).subscribe((res: any) => {
      if (res) {
        console.log(this.nameColumn.toUpperCase() + ' LoadTask Success')
        this.news = res
      }
    })
  }

  GetDataByIdTask = (id: number) => {
    this._id = id
    console.log(this._id)
    this.tasksService.GetDataTaskById(id, this.nameColumn).subscribe((res: any) => {
      if (res) {
        this.data = res
        console.log(this.nameColumn.toUpperCase() + ' GetDataById Success')
      }
    })

  }


}

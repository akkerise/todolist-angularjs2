import {Injectable} from '@angular/core'
import {Http, Response} from "@angular/http"
import {Observable} from "rxjs/Observable"
import 'rxjs/add/operator/map'

@Injectable()
export class TasksService {
  private apiTodo = 'https://597e084e50cf410011fd014e.mockapi.io/api/'

  constructor(private http: Http) {
  }

  GetList = (name: string): Observable<any[]> => {
    return this.http.get(this.apiTodo + name).map((res: Response) => res.json())
  }

  DeleteTask = (id: number, nameColumn: string): Observable<any> => {
    return this.http.delete(this.apiTodo + nameColumn + '/' + id).map((res: Response) => res.json())
  }

  UpdateTask = (id: number, nameColumn: string, data: any): Observable<any[]> => {
    return this.http.put(this.apiTodo + nameColumn + '/' + id, data).map((res: Response) => res.json())
  }

  GetDataTaskById = (id: number, nameColumn: string): Observable<any> => {
    return this.http.get(this.apiTodo + nameColumn + '/' + id).map((res: Response) => res.json())
  }

  CreateTask = (nameColumn: string, data: any): Observable<any> => {
    return this.http.post(this.apiTodo + nameColumn, data).map((res: Response) => res.json())
  }
}

import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {AppComponent} from './app.component'
import {NewComponent} from './components/new/new.component'
import {DoingComponent} from './components/doing/doing.component'
import {DoneComponent} from './components/done/done.component'
import {RouterModule} from "@angular/router"
import {HttpModule} from "@angular/http"
import {FormsModule} from "@angular/forms"
import {TasksService} from "./services/tasks.service"
import {appRoutes} from "./app.routes"

@NgModule({
  declarations: [
    AppComponent,
    NewComponent,
    DoingComponent,
    DoneComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    FormsModule,
    appRoutes
  ],
  providers: [
    TasksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

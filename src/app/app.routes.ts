import {Routes, RouterModule} from "@angular/router"
import {AppComponent} from "./app.component"

const routing: Routes = [
  {path: "", component: AppComponent}
]

export const appRoutes = RouterModule.forRoot(routing)

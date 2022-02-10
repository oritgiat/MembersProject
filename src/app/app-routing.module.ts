import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdentificationComponent } from './identification/identification.component';
import { MyGroupsComponent } from './my-groups/my-groups.component';
import { MyMeetingComponent } from './my-meeting/my-meeting.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FirstNavComponent } from './first-nav/first-nav.component';
import { PrivateAreaComponent } from './private-area/private-area.component';
import { HomeComponent } from './home/home.component';
import { GroupComponent } from './group/group.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AprovalsComponent} from './aprovals/aprovals.component'
import { AboutComponent} from './about/about.component'

const routes: Routes = [
{path:'',component:AppComponent},
{path:'first-nav',component:FirstNavComponent ,children:[
  {path:'group/:id',component:GroupComponent},

  {path:'identification',component:IdentificationComponent},
  {path:'my-group',component:MyGroupsComponent},
  {path:'my-meeting',component:MyMeetingComponent},
  {path:'new-group',component:NewGroupComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'private-area',component:PrivateAreaComponent},
  {path:'Home',component:HomeComponent},
  {path:'group',component:HomeComponent},
  {path:'calendar',component:CalendarComponent},
  {path:'aprovals',component:AprovalsComponent},
  {path:'about',component:AboutComponent}


]},
{path:'not-found',component:NotFoundComponent},//שגיאה לדף שלא קיים בקומפוננטה הזאת מפנים אותו לשגיאה
{path:'**',redirectTo:'not-found'}//נתיב שיתפוס את כל השגיאות של הפרויקט
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }






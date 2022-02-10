import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyGroupsComponent } from './my-groups/my-groups.component';
import { MyMeetingComponent } from './my-meeting/my-meeting.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { IdentificationComponent } from './identification/identification.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { FirstNavComponent } from './first-nav/first-nav.component';
import { PrivateAreaComponent } from './private-area/private-area.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupComponent } from './group/group.component';
import {AprovalsComponent} from './aprovals/aprovals.component';

import {Routes, RouterModule, Router} from '@angular/router';
import { GroupService } from './services/group.service';
import { CorrespodenceService } from './services/correspodence.service';
//עיצוב
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendar/calendar.component';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {PanelMenuModule} from 'primeng/panelmenu';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {SidebarModule} from 'primeng/sidebar';
import {ChartModule} from 'primeng/chart';

import { AboutComponent } from './about/about.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';

import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

  declarations: [
    AppComponent,
    MyGroupsComponent,
    MyMeetingComponent,
    NewGroupComponent,
    IdentificationComponent,
    RegistrationComponent,
    NotFoundComponent,
    FirstNavComponent,
    PrivateAreaComponent,
    HomeComponent,
    GroupComponent,
    CalendarComponent,
    AprovalsComponent,
    AboutComponent,
   
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,//C#בשביל החיבור  
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //עיצובים
    DialogModule,
    InputTextareaModule,
    PasswordModule,
    ButtonModule,
    PanelMenuModule,
    AutoCompleteModule,
    CheckboxModule,
    InputTextModule,
    SidebarModule,
    ChartModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ToolbarModule,
    SplitButtonModule,
    CalendarModule,
    
    
   
    CalendarModule.forRoot({provide: DateAdapter,
      useFactory: adapterFactory,})
    
  ],
  providers: [GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
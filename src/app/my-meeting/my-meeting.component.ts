import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ChangeDetectionStrategy,ViewChild,TemplateRef,} from '@angular/core';
import { startOfDay, endOfDay, subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours, startOfHour, getDate,} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView,} from 'angular-calendar';
import { MeetingService } from '../services/meeting.service';
import { MeetingModule } from '../modules/meeting.module';
import { GroupService } from '../services/group.service';
import { GroupModule } from '../modules/group.module';
import { PersonService } from '../services/person.service';
import { ParticipationService } from '../services/participation.service';
import { ParticipationModule } from '../modules/participation.module';
import { MemberGroupModule } from '../modules/memberGroup.module';
import { Time } from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import { NgForm } from '@angular/forms';
import { AprovalsComponent } from '../aprovals/aprovals.component';
import {MessageService} from 'primeng/api';
import { PersonModule } from '../modules/person.module';
import isDate from 'date-fns/isDate';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
}


@Component({
  selector: 'app-my-meeting',
  templateUrl: './my-meeting.component.html',
  styleUrls: ['./my-meeting.component.css']
})
export class MyMeetingComponent implements OnInit {
  DateNeeting:Date=new Date();
  degelP:boolean=false;
  degelS:boolean=true;
  ishur:boolean=false;
  v:boolean=false;
  place:string
  purpouse:string
  myTime:Time
  meetOfDay:MeetingModule=new MeetingModule();
  eventD:CalendarEvent;
  events: CalendarEvent []=[]
  selectedValues: string ;
  // = ['אישור','תזכורת'];
  msgs:any=[];
  reminder:string;
  display: boolean = false;
  display4:boolean=false;
  display2:boolean=false;
  MesMeeting:boolean=false;
  mesDel:boolean=false;
  arrMemberParticipation:Array<ParticipationModule>=new Array<ParticipationModule>();
  ArrParticipation:Array<ParticipationModule>=new Array<ParticipationModule>()
  Participation:Array<ParticipationModule>=new Array<ParticipationModule>()
  okpar:ParticipationModule=new ParticipationModule;
  form:NgForm;
  constructor(private router:Router,private active:ActivatedRoute, private meetingService:MeetingService,
    private groupService:GroupService,public personService:PersonService,private participationService:ParticipationService ) { }
lm:Array<MeetingModule>=new Array<MeetingModule>()
ld:MeetingModule=new MeetingModule();

check()
{
  
}
  ngOnInit() {debugger;
    this.showDialog;
    this.showDialog2;
    this.update;
    debugger;
    this.meetingService.getMeetingByGroupId(this.groupService.idG.Group_id,this.personService.curentUser.person_id).subscribe(
      data=>{this.lm=data;
        debugger;
      for (let index = 0; index < this.lm.length; index++) {
        this.events = [
          ...this.events,
          {
            id:this.lm[index].meeting_id,
            // perId:this.lm[index].initiastor_id,
            // myTime:new time(this.lm[index].time.),
            title: this.lm[index].purpose,
            cssClass:this.lm[index].place,
            start:new Date(this.lm[index].date),
            end: new Date(this.lm[index].date),
            color: colors.red,
            // time:startOfHour(this.myTime),
            draggable: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
          },
        ];
      }        
      
      },
      err=>{debugger; alert("err") }
    )
  }

  open(){
    document.getElementById('addModal').style.display='block'}
  showDialog() {
    debugger;
    // if(this.meetOfDay==null)
    // {
    if(this.display==false)
    this.display = true;
    else
    this.display = false;
    // }
  }
  


  showDialog2(meet:MeetingModule) {
   debugger;
   this.meetOfDay=meet;
    this.display2 = true;
    this.eventD;
 }
 show() {
  this.msgs.push({ severity:'success',summary:'נפתחה קבוצה חדשה', detail:'תודה רבה!'});
}

hide() {
  this.msgs = [];
}
  @ViewChild('modalContent', { static:true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<CalendarEventTimesChangedEvent> = new Subject();



  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     actions: this.actions,
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue,
  //     allDay: true,
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  // ];

  activeDayIsOpen: boolean = false;

  
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    debugger;
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        // this.activeDayIsOpen = false;
      } else {
        // this.activeDayIsOpen = true; 
          

      }
      var xxx=events[0].id;
      var a=this.lm.find(x=>x.meeting_id==xxx);
      this.viewDate = date;
      this.showDialog2(a);
      

    }

    // var aaa=new Date(date.getFullYear(),date.getMonth(),date.getDay());
    // var a=this.lm.find(x=>new Date(x.date.getFullYear(),x.date.getMonth(),x.date.getDate())==this.aa);
debugger;

   
  }

  eventTimesChanged({
    
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    debugger
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    debugger
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }
  showMeet(){
    
    
  }
  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: this.purpouse,
        cssClass:this.place,
        start: startOfDay(new Date(this.DateNeeting)),
        end: endOfDay(new Date(this.DateNeeting)),
        color: colors.red,
        // time:startOfHour(this.myTime),
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }
meetID:any;
  deleteEvent(eventToDelete: CalendarEvent) {
    debugger

    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }
  delete(meet:MeetingModule)
  {
    debugger;
    this.meetID=meet.meeting_id;
    this.meetingService.deleteMeeting(this.meetOfDay.meeting_id).subscribe(
      data=>{
       
        this.mesDel=true,
        this.display2=false,
        this.lm.splice(this.lm.indexOf(meet),1)
      
      }
    )
   
  }
  
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  newD:Date;
  okP:ParticipationModule=new ParticipationModule();
  showMemberParticipation()
  {
    if(this.degelS==true){
      this.degelS=false
    }
    else{
      this.degelS=true;
    }
    this.participationService.getMemberParticipationGroupId(this.meetOfDay.meeting_id).subscribe(data=>{this.arrMemberParticipation=data});
  }
add()
{
  debugger;
  let p=new ParticipationModule()
  let m=new MeetingModule()
      m.group_id=this.meetingService.group.Group_id;
    
      m.time=this.myTime
      m.date=this.DateNeeting
      m.initiastor_id=this.personService.curentUser.person_id
      m.place=this.place
      m.purpose=this.purpouse
     
debugger; 

      this.meetingService.addMeeting(m).subscribe(
        m=>{
          this.lm.push(m);
          this.events = [
          ...this.events,
          {
            id:m.meeting_id,
            // time:m.time,
            // perId:m.initiastor_id,
            title: m.purpose,
            cssClass:m.place,
            start:new Date(m.date),
            end: new Date(m.date),
            color: colors.red,
            // time:startOfHour(this.myTime),
            draggable: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
          },
        ];
        //לאשר את השתתפות קובע הפגישה
this.okP.meeting_id=m.meeting_id;
this.okP.person_id=this.personService.curentUser.person_id;
this.okP.aproval='1';
this.v=true;
this.participationService.addParticipation(this.okP).subscribe(
  data=>{
    this.ishur=true;
  }
  
)
this.MesMeeting=true;
this.show();       
    })
      // this.addEvent()
      this.display = false;
      debugger;
}
addParticipation(event:MeetingModule)
{
  debugger;
this.okP.meeting_id=event.meeting_id;
  this.okP.person_id=this.personService.curentUser.person_id;
  if(this.selectedValues=='1'&&this.reminder=='1')
  {
    this.okP.aproval='1'
    this.okP.reminder='1'
  }
  else
  {

    if(this.selectedValues=='1'&&this.reminder!='1')
     {this.okP.aproval='1'
    this.okP.reminder='0'
     }
else
  {
    this.okP.aproval='0'
    this.okP.reminder='0'
  }
}
  this.participationService.addParticipation(this.okP).subscribe(
    data=>{
this.ishur=true;    }
  )
  this.display2=false;
  // this.ishur=false;
}
//הצגת כל החברים העתידים להשתתף בקבוצה
showParticipations()
{
  
  if(this.degelP==true){
    this.degelP=false
  }
  else{
    this.degelP=true;
  }
  debugger
  this.participationService.getParticipationById(this.meetOfDay.meeting_id).subscribe(data=>{this.ArrParticipation=data});
  
}       
      
update() {
  this.display4=true;
}
}


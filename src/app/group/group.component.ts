import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from '../services/person.service';
import { PersonModule } from '../modules/person.module';
import { GroupService } from '../services/group.service';
import { GroupModule } from '../modules/group.module';
import { MemberGroupService } from '../services/memberGroup.service';
import { MemberGroupModule } from '../modules/memberGroup.module';
import { MeetingService } from '../services/meeting.service';
import { CorrespodenceModule } from '../modules/correspodence.module';
import { CorrespodenceService } from '../services/correspodence.service';
import { MeetingModule } from '../modules/meeting.module';
import {MenuItem, PrimeTemplate} from 'primeng/api';
import { EmailService } from '../services/email.service';
import { email } from '../email';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})

export class GroupComponent implements OnInit 
{
  correspodenceModule:CorrespodenceModule=new CorrespodenceModule()

  listPerson:Array<PersonModule>=new Array<PersonModule>()

  currentGroup:GroupModule=new GroupModule()
  id:number;//הגדרת המזהה
  idper:string;
  JoinStatus:string;//הגדרת ההצטרפות
  id_name:string;//הגדרה למיון לפי שם
  arrPerson:Array<PersonModule>=new Array<PersonModule>()  //שליפת קבוצה לפי מזהה
  personStatus:PersonModule= new PersonModule()//האם הוא מנהל הקבוצה הנוכחית או חבר
  arrGroup:Array<GroupModule>=new Array<GroupModule>()
  arrMemberGroup:Array<MemberGroupModule>=new Array<MemberGroupModule>()
  arrMemberGroup2:Array<MemberGroupModule>=new Array<MemberGroupModule>()
  arrPersonsToExit:Array<MemberGroupModule>=new Array<MemberGroupModule>()

  arrCorrByName:Array<CorrespodenceModule>=new Array<CorrespodenceModule>()
  arrMeeting:Array<MeetingModule>=new Array<MeetingModule>()
  arrCorrespodence:Array<CorrespodenceModule>=new Array<CorrespodenceModule>()
  arrCorrespodence2:Array<CorrespodenceModule>=new Array<CorrespodenceModule>()
  arrStatus:Array <string>=["1","2","3"];
  arrCorrespodenceToManager:Array<CorrespodenceModule>=new Array<CorrespodenceModule>()
  arrCorrespodenceByNew:Array<CorrespodenceModule>=new Array<CorrespodenceModule>()
  arrCorrespodenceByOld:Array<CorrespodenceModule>=new Array<CorrespodenceModule>()
  managerAproval:boolean=false;//מחכים לאישור
  countMember:number=0;
  isJoin:number=0
  arrCorrespodenceByName:Array<CorrespodenceModule>=new Array<CorrespodenceModule>()
  degelMassege:boolean=false;//דגל להצגת הודעות חברים בקבוצה
  degelMassegeMnager:boolean=false;//דגל להצגת הודעות מנהלה
  reg:boolean=false;
  status:boolean=true;
  statusMember:boolean=true;
  degelS:boolean=false;
  degelP:boolean=false;//דגל להצגת חברים בקבוצה
  degelM:boolean=false;//להצגת פגישות
  degelC:boolean=false;//להצגת התכתבויות
  degelCorManager:boolean=false;//להצגת הודעות למנהל
  degelEmail:boolean=false;//להצגת כתובת מייל
  hishtana:boolean=false;
  hiz:boolean=false;
all:Array<CorrespodenceModule>=new Array<CorrespodenceModule>()
value: Date;
en: any;
person:string="0";
corr:string;
corre:string;
sortD:number;
changeStatus:string="0";
Joining:string;
hostPerson:boolean=false;//אדם לא מזוהה
display: boolean = false;
display2:boolean=false;
display3:boolean=false;
iconMessege:boolean=true;
odaa:boolean=false;
odaaMenahel:boolean=false;
nirshmta:boolean=false;
iconAllMessege:boolean=false;
cities: email[];
selectedCity: email;

  constructor(private router:Router,private active:ActivatedRoute,
    public personService:PersonService,private groupService:GroupService,
    private memberGroupService:MemberGroupService,private meetingService:MeetingService,
    private correspodenceService:CorrespodenceService,private emailService:EmailService) { 
  //ניווט לפי מזהה הקבוצה
    this.arrStatus;
    this.cities = [
      {email:'1',subject:"2"},
      {email:'1',subject:"2"},
      
  ];
  this.active.params.subscribe(params=>{
    this.id=params['id']; 
    this.personService.idGroup=this.id;

    this.groupService.getGroupById(this.id).subscribe(d=>{debugger; this.currentGroup=d;
    this.isJoin=d.joining
    this.groupService.idG=this.currentGroup;
    if(d.joining==1){
      this.JoinStatus="ההצטרפות פתוחה";
    }
    if(d.joining==2){
      this.JoinStatus="ההצטרפות סגורה"
    }
    if(d.joining==3){
      this.JoinStatus=" ההצטרפות תלויה באישור מנהל הקבוצה"}
    }
  
  )})} 

  ngOnInit() 
  {debugger;
    this.display;

    this.memberGroupService.getMemberGroupByGroupId(this.id).subscribe(data=>{this.arrMemberGroup=data;
      this.arrMemberGroup.forEach(x=>{
        this.countMember=this.countMember+1;})

    this.personService.getAllPersons().subscribe(data=>{this.arrPerson=data; this.arrPerson;
      this.groupService.getAllGroup().subscribe(data=>{this.arrGroup=data;})//שליפת כל הפרטים ממחלקת השרות של קבוצה
      this.arrGroup;
      this.selectMemberGroup();
      
      if(this.personService.curentUser.name!=undefined)
     { if(this.currentGroup.manager_id==this.personService.curentUser.person_id)
      this.statusMember=false;
      
       this.memberGroupService.getMemberGroupByGroupId(this.id).subscribe(data=>{this.arrMemberGroup=data;

      // this.personService.memberPerson=false;
      
     this.arrMemberGroup.forEach(x=>{

       if(x.name==this.personService.curentUser.name)
       {
         this.personService.memberPerson=true;
       }
      })
       if(this.personService.memberPerson==false)
       {
         this.personService.iden=true;

       }
      });
    }
      
      if(this.JoinStatus=="ההצטרפות תלויה באישור מנהל הקבוצה")
    {this.groupService.statusGroup=3;}
      this.correspodenceService.getCorrespodenceByGroupId(this.id).subscribe(data=>{this.arrCorrespodence=data;this.all=data;this.sortD=1 ; this.sortByDate();this.groupService.getGroupById(this.id).subscribe(x=>{this.currentGroup=x
        this.arrCorrespodence=this.all.filter(x=>x.addressee=="1")

        if(this.personService.curentUser.name==x.nameManager)
        {
        this.status=false;
        this.personService.managerAproval=true;

        }
        else{
        if(this.personService.curentUser.name==undefined)
        {
          this.hostPerson=true;
        }
       
        
      }
         })
    });});//פונקצית שליפה של כל חברי הקבוצה
   
    })
    

       
  }
  showDialog2() {
    this.display2 = true;
   
  }
  showDialog3()
  {
    this.display3=true;
  }
  showJustM()
{

  debugger;
  this.iconMessege=false;
  this.iconAllMessege=true;
}
showAllM()
{

  debugger;
  this.iconMessege=true;
  this.iconAllMessege=false;
}
enter()
{
  this.router.navigate(['/first-nav/identification'])

}
regist()
{  this.router.navigate(['/first-nav/registration'])
}
icon_display()
{
  this.display=true;
}
      
  showMemberGroup()//פונקציה להצגת חברי הקבוצה לחילופין
  {
    
    if(this.degelP==true){
      this.degelP=false
    }
    else{
      this.degelP=true;
    }
    this.memberGroupService.getMemberGroupByGroupId(this.id).subscribe(data=>{this.arrMemberGroup=data;
    })
    
  }
  showEmail()
  {
    if(this.degelEmail=true){
      this.degelEmail=false
    }
    else{
      this.degelEmail=true;
    }
   this.memberGroupService.getMemberGroupById(this.memberGroupService.currentId).subscribe
  }
  
  //מיון לפי שם
  selectMemberGroup(){
    this.memberGroupService.getMemberGroupByGroupId(this.id).subscribe(data=>{this.arrMemberGroup2=data});
  }
  
  //הצגת פגישות
  showMeeting()
  {
    if(this.degelM==true){
      this.degelM=false
    }
    else{
      
      this.degelM=true;
    }
    this.meetingService.getMeetingByGroupId(this.id, this.personService.curentUser.person_id).subscribe(data=>{this.arrMeeting=data});
  }
  //הצגת הודעות
  showMessege()
  {
    if(this.degelC==true){
      this.degelC=false
    }
    else{
      this.degelC=true;
    }
debugger;
    this.correspodenceService.getCorrespodenceByGroupId(this.id).subscribe(data=>{this.arrCorrespodence=data
    this.arrCorrespodence=this.all.filter(x=>x.addressee=="1")

    this.arrCorrespodenceByNew=this.arrCorrespodence.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  });
  }
  showMessegeToManager()
  {
    debugger;
   if(this.degelCorManager==true){
      this.degelCorManager=false
    }
    else{
      this.degelCorManager=true;
     }
   this.correspodenceService.getCorrespodenceByGroupId(this.id).subscribe(data=>{
     this.arrCorrespodence=data
    this.arrCorrespodence=this.all.filter(x=>x.addressee=="2")
  
      this.arrCorrespodence=this.arrCorrespodence.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
   
   debugger;
  })
  }
  sortByDate(){
   var d:Date=new Date();
   if(this.sortD==1)
   this.arrCorrespodenceByNew=this.arrCorrespodence.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
   else
  this.arrCorrespodenceByOld= this.arrCorrespodence.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      
  }
  sortNew()
  {
    var d:Date=new Date();
    this.arrCorrespodenceByNew=this.arrCorrespodence.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
  sortOld()
  {
    var d:Date=new Date();
    this.arrCorrespodenceByOld= this.arrCorrespodence.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  }
sortByName()//מיון לפי שם
{
 debugger;
this.arrCorrespodenceByName=this.all.filter(o=>o.sending_id==this.person&&o.addressee=="1")
this.arrCorrespodence=this.arrCorrespodenceByName;
}
aprovalses(){  this.router.navigate(['/first-nav/aprovals'])
}
ChangeStatus()
{
  debugger;
  let d=new GroupModule()
  d={...this.currentGroup};
   if(this.changeStatus=="1")
  {d.joining=1}
    if(this.changeStatus=="2")
 { d.joining=2}
  if(this.changeStatus=="3")
 { d.joining=3} 
 
  this.groupService.updateGroup(d).subscribe(d=>{
this.hishtana=true;
    debugger;
    if(this.changeStatus=="1")
    this.JoinStatus="ההצטרפות פתוחה"
      if(this.changeStatus=="2")
      this.JoinStatus="ההצטרפות סגורה"
    if(this.changeStatus=="3")
     this.JoinStatus="הצטרפות  באישור מנהל "
  }
)}
ShowChangeStatus()
{
  if(this.degelS==true){
    this.degelS=false
  }
  else{
    this.degelS=true;
  }
}
sendMassegeOfEveryone()
{
   this.degelMassege=true;
}
sendMassegeOfManager()
{
   this.degelMassegeMnager=true;
}
sendToEveryone()
{
  debugger;
  let c=new CorrespodenceModule()
  c.group_id=this.id
  c.sending_id=this.personService.curentUser.person_id
  c.addressee="1"
  c.contents=this.corre
  this.correspodenceService.addCorrespodence(c).subscribe(data=>{
 this.odaa=true;
 this.correspodenceService.getCorrespodenceByGroupId(this.id).subscribe(data=>{this.arrCorrespodence=data;
  this.arrCorrespodence=this.arrCorrespodence.filter(x=>x.addressee=="1")
 this.arrCorrespodence=this.arrCorrespodence.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
 this.display=false;

  this.display3=false;
  
  debugger;
  })
  })
}

sendToManager()
{
  debugger;
  let c=new CorrespodenceModule()
  c.group_id=this.id
  c.sending_id=this.personService.curentUser.person_id
  c.addressee="2"
  c.contents=this.corr
  this.correspodenceService.addCorrespodence(c).subscribe(data=>{
  this.odaaMenahel=true;
  
  // this.correspodenceService.getCorrespodenceByGroupId(this.id).subscribe(data=>{this.arrCorrespodenceToManager=data;
  //   this.arrCorrespodence=this.arrCorrespodence.filter(x=>x.addressee=="2")
  // this.arrCorrespodence=this.arrCorrespodence.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  this.display=false;
  this.display2=false;

  debugger;
})
// })
}
meeting()
{
 this.meetingService.group= this.currentGroup
  debugger;
  this.router.navigate(['/first-nav/my-meeting'])

}
addMemberfromManager(id:number)
{
this.personService.addMemberfromManager=true;
this.router.navigate(['/first-nav/registration'])

}
  //הצטרפות לקבוצה
  addMember()
  {
    this.memberGroupService.currentId=this.id
    if(this.personService.curentUser.name!=undefined)
    {
      let m=new MemberGroupModule()
      m.person_id=this.personService.curentUser.person_id
      m.group_id=this.id
      if(this.isJoin==3)
     { 
      m.member_status=1
     
          debugger
          this.memberGroupService.addMemberGroup(m).subscribe(data=>{

            if(data!=null){ 
              this.hiz=true;
              this.display=false;
              if(this.personService.curentUser.person_id=="206672925")
                {
                this.personService.yonit=true;
               }
             let e: email = new email;
              e.email=this.currentGroup.emailManager;
              e.subject="שלום לך  "  +this.currentGroup.nameManager
              e.content="התקבלה בקשה להצטרפות מאת "  +this.personService.curentUser.name
              
            +"  כתובת מייל המבקש   "+this.personService.curentUser.email
              this.emailService.sende(e).subscribe(h=>{
              })
         }
         else{
this.reg=true;         }
        //  this.router.navigate(['/first-nav/Home'])
             })
      

    }
    else{
      m.member_status=2
      this.memberGroupService.addMemberGroup(m).subscribe(data=>{
        if(data!=null){
        if(this.isJoin!=3)
        this.nirshmta=true;
      }
     else{
       this.reg=true     }
         })
    }
    debugger
      
    
    }
  
    else{
      debugger;
      this.memberGroupService.isRegister=true;
      this.router.navigate(['/first-nav/identification'])
    }
    

    
    
}




yeziaa(){
  alert("נשלחה בקשה לעזיבה")
  let e: email = new email;
   e.email=this.currentGroup.emailManager;
   e.subject="שלום לך  "  +this.currentGroup.nameManager
   e.content="    התקבלה בקשה לעזוב קבוצה מאת   "  +this.personService.curentUser.name+"כתובת מייל המבקש"+this.personService.curentUser.email
   this.emailService.sende(e).subscribe()

      // this.arrPersonsToExit=this.push(this.personService.curentUser);
}


}







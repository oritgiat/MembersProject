import { Component, OnInit } from '@angular/core';
import{ GroupService } from '../services/group.service'
import { from } from 'rxjs';
import { GroupModule } from '../modules/group.module';
import { PersonService } from '../services/person.service';
import { MemberGroupModule } from '../modules/memberGroup.module';
import { MemberGroupService } from '../services/memberGroup.service';
import { Router } from '@angular/router';
import {  ActivatedRoute } from '@angular/router';

import { email } from '../email';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit 
{
  email:email=new email()
  arrGroup:Array<GroupModule>=new Array<GroupModule>()
  disabled:boolean=false;
  bakash:boolean=false;
  id:number;//הגדרת המזהה
  isJoin:number=0;
  JoinStatus:string
  rashom:boolean=false;
  nirshmta:boolean=false;
  currentGroup:GroupModule=new GroupModule()
  constructor(private router:Router, private groupService:GroupService,private active:ActivatedRoute,
    public personService:PersonService,private memberGroupService:MemberGroupService,private emailService:EmailService) {
      this.active.params.subscribe(params=>{
        this.id=params['id']; 
        this.personService.idGroup=this.id;
      this.groupService.getGroupById(this.id).subscribe(d=>{this.currentGroup=d;
      this.isJoin=d.joining
  
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
  {
    debugger
    this.groupService.getAllGroup().subscribe(data=> {this.arrGroup=data; debugger
    }
      )//שליפת כל הפרטים ממחלקת השרות של קבוצה
    this.arrGroup;//הצגת מערך הקבוצה
   
  }
  
  addMember(idgroup:number)
  {
    if(this.personService.curentUser.name!=undefined)
    {
      let m=new MemberGroupModule()
      m.person_id=this.personService.curentUser.person_id
      m.group_id=idgroup;
      if(this.isJoin==3)
     { debugger;
      m.member_status=1
      this.bakash=true;
       let e: email = new email;
        e.email=this.currentGroup.emailManager;
        e.subject="שלום לך  "  +this.currentGroup.nameManager
        e.content="    התקבלה בקשה להצטרפות מאת   "  +this.personService.curentUser.name+"כתובת מייל המבקש"+this.personService.curentUser.email
        this.emailService.sende(e).subscribe(h=>{
          debugger
          this.memberGroupService.addMemberGroup(m).subscribe(data=>{
            if(data!=null){
            
         }
         else{
           this.rashom=true;
         }
         this.router.navigate(['/first-nav/Home'])
             })
        })

    }
    else{
      m.member_status=2
      this.memberGroupService.addMemberGroup(m).subscribe(data=>{if(data!=null){
        if(this.isJoin!=3)
        this.nirshmta=true;
     }
     else{
       this.rashom=true;
     }
         })
    }
    debugger
      
    
    }
  



  
  }}
import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
// import {personModule}from '../modules/person.module'
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { GroupModule } from '../modules/group.module';
import { EmailService } from '../services/email.service';
import { email } from '../email';
@Component({
  selector: 'app-private-area',
  templateUrl: './private-area.component.html',
  styleUrls: ['./private-area.component.css']
})
export class PrivateAreaComponent implements OnInit 
{
listMember:Array<GroupModule>=new Array<GroupModule>()
listManager:Array<GroupModule>=new Array<GroupModule>()
listWait:Array<GroupModule>=new Array<GroupModule>()
isMemberStatus:boolean=true
isManagerStatus:boolean=true
isMember:boolean=true
isManager:boolean=true
isWaiting:boolean=true
display:boolean=false
display2: boolean = false;

wait:boolean=false;
  constructor(public personService:PersonService ,private groupService:GroupService,private router:Router,private emailService:EmailService) { }

  ngOnInit() 
  {
    this.display2;

    debugger;
    this.showDialog;
    if(this.personService.curentUser.email==undefined)
    {
      this.router.navigate(['/first-nav/identification'])
    }
    else{
      this.groupService.getStatus(this.personService.curentUser).subscribe(data=>{
            if(data==2)//מצאת אדם שהוא מנהלוגם חבר
             this.personService.status="מנהל וחבר" ;
           if(data==1)//רשום במערכת
            this.personService.status=" " ;
           if(data==3)//מנהל
            this.personService.status="מנהל "
            if(data==4)//חבר
        this.personService.status="חבר" 
      
      this.groupService.getGroupWaitOfPerson(this.personService.curentUser.person_id).subscribe(d=>{
        debugger;
      this.listWait=d;
      if(d[0]==null)
      {
        this.wait=true;
      }
      if(this.groupService.status==0||this.groupService.status==1)
      {
        this.router.navigate(['/first-nav/Home'])
      }
      
      if(this.groupService.status==4)
      {
        debugger;
        this.groupService.getGroupOfMember(this.personService.curentUser.person_id).subscribe(data=>{
          debugger;
          this.listMember=data
        if(data[0]==null)
        {
          this.isManager=true;
        }
        },
        err=>{alert("שגיאה בגישה לשרת")});
        this.isManagerStatus=false;
        
      }
      if(this.groupService.status==3)
      {
        this.groupService.getGroupOfManager(this.personService.curentUser.person_id).subscribe(data=>{
        this.listManager=data
        if(data[0]==null)
        {
         this.isMember=false;
        }
        },
        err=>{alert("שגיאה בגישה לשרת")});
        this.isMemberStatus=false;
      }
      if(this.groupService.status==2)
      {
        debugger;
        this.groupService.getGroupOfManager(this.personService.curentUser.person_id).subscribe(data=>{
        this.listManager=data;
        if(data[0]==null)
        {
          this.isManager=true;
        }
        this.groupService.getGroupOfMember(this.personService.curentUser.person_id).subscribe(data=>{
          this.listMember=data
          if(data[0]==null)
        {
         this.isMember=false;
        }
          debugger;
          
          },
          err=>{alert("שגיאה בגישה לשרת")});

        },
        err=>{alert("שגיאה בגישה לשרת")});
       
      }
     
      })
    })
    }
  
  }
  showDialog() {
    this.display = true;
  }
  meeting()
  {
    this.router.navigate(['/first-nav/my-meeting'])

  }
  icon_display()
{
  this.display2=true;
}
aprovalses()
{
  this.router.navigate(['/first-nav/aprovals'])

}

  updateUser(){}
}
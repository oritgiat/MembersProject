import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { GroupService } from '../services/group.service';
import { GroupModule } from '../modules/group.module';
import { MemberGroupService } from '../services/memberGroup.service';
import { MemberGroupModule } from '../modules/memberGroup.module';
import { MeetingService } from '../services/meeting.service';
import { CorrespodenceModule } from '../modules/correspodence.module';
import { CorrespodenceService } from '../services/correspodence.service';
import { EmailService } from '../services/email.service';
import { email } from '../email';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../services/person.service';
import { PersonModule } from '../modules/person.module';
import { id } from 'date-fns/locale';
import { closestIndexTo } from 'date-fns';

@Component({
  selector: 'app-aprovals',
  templateUrl: './aprovals.component.html',
  styleUrls: ['./aprovals.component.css']
})

export class AprovalsComponent implements OnInit {
  noMassege:boolean=false;
  meushar:boolean=false;
  mesorav:boolean=false;
  
  arrPersonWait:Array<MemberGroupModule>=new Array<MemberGroupModule>()
arrPersons:Array<PersonModule>=new Array<PersonModule>()
arrGroupId:Array<GroupModule>=new Array<GroupModule>()
  constructor(private router:Router,private active:ActivatedRoute,
    public personService:PersonService,private groupService:GroupService,
    private memberGroupService:MemberGroupService,private meetingService:MeetingService,
    private correspodenceService:CorrespodenceService,private emailService:EmailService) { }

  ngOnInit() {
    this.arrPersonWait=new Array<MemberGroupModule>()
    debugger;
    
    this.memberGroupService.getGroupOfMemberAwait(this.personService.curentUser.person_id).
    subscribe(data=>{this.arrPersons=data;
debugger;
if(this.arrPersons.length==0)
{
this.noMassege=true;
}
    })
  
  }
  aprovalByManager(p:PersonModule)
  {
    debugger;
   
    this.memberGroupService.updateMemberGroup(p).subscribe(d=>{
      this.meushar=true;
      this.arrPersons=d
    debugger;
    if(p.person_id=="206672925")
    {
      this.personService.yonit=false;
    }
    
    let e: email = new email;
        e.email=p.email;
        e.subject="שלום לך  "  +p.name
        e.content="  צורפת לקבוצת שיתוף מתכונים " 
        this.emailService.sende(e).subscribe()
    })
  
  }
  refusalByManager(p:PersonModule)
  {
    debugger;
    this.memberGroupService.updateMemberGroupToRefuse(p).subscribe(d=>{
     this.mesorav=true;
      this.arrPersons=d;
      if(p.person_id=="206672925")
      {
        this.personService.yonit=false;
      }
    let e: email = new email;
    e.email=p.email;
    e.subject="שלום לך  "  +p.name
    e.content="  קיבלת סירוב להצטרף לקבוצת שיתןף מתכונים "
    this.emailService.sende(e).subscribe()
      })
}
}
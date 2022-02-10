import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { GroupModule } from '../modules/group.module';
import {MemberGroupModule} from '../modules/memberGroup.module';
import { MemberGroupService } from '../services/memberGroup.service';
import { Router } from '@angular/router';
import { PersonService } from '../services/person.service';
import { PersonModule } from '../modules/person.module';
import { EmailService } from '../services/email.service';
import { email } from '../email';
import {document}from '../Document';
import { DocumentService } from '../services/document.sevice';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit
{
  arrGroup:Array<GroupModule>=new Array<GroupModule>()
  groupModule:GroupModule=new GroupModule()
  arrMemberGroup:Array<MemberGroupModule>=new Array<MemberGroupModule>()
  memberGroupModule:MemberGroupModule=new MemberGroupModule()
  personModule:PersonModule=new PersonModule()
  chadasha:boolean=false;
  arr:Array<string>=new Array<string>();
  constructor(private DocumentService:DocumentService, private groupService:GroupService,private memberGroupService:MemberGroupService,private router:Router,private personService: PersonService,private emailService:EmailService) { }
  ngOnInit() 
  { 
     if(this.personService.isFromNewGroup==true&&this.personService.curentUser.email==undefined  )
    {
      this.personService.isFromNewGroup=false;
      this.personService.isFromIdentification=false;
      this.router.navigate(['/first-nav/identification'])
    }
 
    else
    {
    this.groupService.getAllGroup().subscribe(data=>this.arrGroup=data)
    this.arrGroup;
    // this.memberGroupService.getAllMemberGroups().subscribe(data=>this.arrMemberGroup=data)
    // this.arrMemberGroup;
    }
  }
  file:document=new document();
  //העלאת קבצים
  
handleFileInput(file) {
  this.DocumentService.uploadImage(file[0]).subscribe(
    data => {
    
     this.groupModule.image=file[0].name;
    }
  );
}

  //הוספת קבוצה חדשה
  addGroup()
  {
    debugger;
    this.groupService.addGroup(this.groupModule).subscribe(data=>{
      this.arrGroup=data;
      this.chadasha=true;
      let e: email = new email;
        e.email=this.personService.curentUser.email;
        e.subject="שלום לך  "  +this.personService.curentUser.name
        e.content="אנו מודים לך על פתיחת קבוצת  "  +this.groupModule.group_description
      this.emailService.sende(e).subscribe()
  
      if(this.personService.isFromNewGroup==false)
      this.router.navigate(['/first-nav/Home'])
      else
      this.router.navigate(['/first-nav/private-area'])
    },
    err=>{alert("שגיאה בגישה לשרת")});
  }
  


}


import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import { PersonModule } from '../modules/person.module';
import { MemberGroupService } from '../services/memberGroup.service';
import { MemberGroupModule } from '../modules/memberGroup.module';
import { Router } from '@angular/router';
import { email } from '../email';

import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit
{
  baruch:boolean=false;
  arrPerson:Array<PersonModule>=new Array<PersonModule>()
  arrMemberGroup:Array<MemberGroupModule>=new Array<MemberGroupModule>()
  personModule:PersonModule=new PersonModule()
  memberGroupModule:MemberGroupModule=new MemberGroupModule()
  constructor(private personService:PersonService,private memberGroupService:MemberGroupService,private router:Router,private emailService:EmailService) { }

  ngOnInit() 
  {
   
    this.personService.getAllPersons().subscribe(data=>this.arrPerson=data)
    this.arrPerson;
    this.memberGroupService.getAllMemberGroups().subscribe(data=>this.arrMemberGroup=data)
    this.arrMemberGroup;

  }   
  
  add()//הוספת משתמש למערכת
  {
  
    debugger;
    this.personService.addPerson(this.personModule).subscribe(data=>{
    this.personModule=data;
    this.personService.curentUser=data;

    debugger;
    })

    
      this.baruch=true;

    err=>{alert("שגיאה בגישה לשרת")};
    if(this.personService.isFromNewGroup==false)
       
       this.router.navigate(['/first-nav/new-group'])
      
  }
  
  
  
    
    
    


}

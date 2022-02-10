import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { NgForm } from '@angular/forms';
import { PersonModule } from '../modules/person.module';
import { Router } from '@angular/router';
import { PersonService } from '../services/person.service';
import { MemberGroupService } from '../services/memberGroup.service';
import { MemberGroupModule } from '../modules/memberGroup.module';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css']
})
export class IdentificationComponent implements OnInit 
{
  personModule:PersonModule=new PersonModule()
  isExite:number;//הגדרת משתנה בשביל בדיקה אם המשתמש קיים
  email:string;
  password:number;
  form:NgForm;
  display: boolean = false;
  unuser: boolean = false;
  rashum:boolean=false;
  nirshamta:boolean=false;
  baruchaba:boolean=false;
  constructor(private personService:PersonService,
     private groupService:GroupService,private router:Router,private memberGroupService:MemberGroupService) { }
  

  
  ngOnInit()
  {
    this.showDialog;
    
  }
  open(){
    document.getElementById('addModal').style.display='block'}
  showDialog() {
    this.display = true;
  }
add(){
  
  this.personService.addPerson(this.personModule).subscribe(data=>{
    this.personModule=data;
    this.personService.curentUser=data;
    debugger;
    })

    this.personService.iden=true;

     this.baruchaba=true;

    err=>{alert("שגיאה בגישה לשרת")};
    if(this.personService.isFromNewGroup==false)
       
       this.router.navigate(['/first-nav/new-group'])
      
  

  
    
}
sendToregist(){
 this.router.navigate(['/first-nav/registration'])

}
  send()
  {  
    this.groupService.getStatus(this.personModule).subscribe(data=>{debugger;
    this.groupService.status=data

      if(data==0)//משתמש אינו רשום
     {
        this.unuser=true;  
     }
      else
      {     
        if(data==2)//מצאת אדם שהוא מנהלוגם חבר
         { 
         this.personService.status="מנהל וחבר" ;
         this.personService.managerAproval=true;
         this.personService.isShowGroup=true;
         }
        if(data==1)//רשום במערכת
         {
        this.personService.status=" " ;
        this.personService.person=true;
         }
        if(data==3)//מנהל
        { 
          this.personService.status="מנהל "
          this.personService.managerAproval=true;
          this.personService.isShowGroup=true;
        }
        if(data==4)//חבר
        {  
         this.personService.status=" חבר"
         this.personService.isFromIdentificationToGroup=false;
         this.personService.statusMember=true;
         this.personService.isShowGroup=true;
        }
        this.groupService.retrievalPerson(this.personModule).subscribe(data1=>{this.personService.curentUser=data1;
        if(this.personService.isFromIdentification==false)//אם הגיע מפתיחת קבוצה חדשה 
          this.router.navigate(['/first-nav/new-group'])
        if(this.memberGroupService.isRegister==true)//אם הגיע מהרשמה
          {
            if(this.groupService.statusGroup==3)
            {

            }
           else
            {let m=new MemberGroupModule()
            m.person_id=this.personService.curentUser.person_id
            m.group_id=this.memberGroupService.currentId
            this.memberGroupService.addMemberGroup(m).subscribe(data=>{
              debugger
              if(data!=null){
                this.nirshamta=true;
              }
              else{
                this.rashum=true;
                }
              if(this.personService.isFromRgister==false)//המשתמש זוהה ונשלח אל האיזור אישי שלו
              {
                this.router.navigate(['/first-nav/private-area'])
              }
              
           //אם הגיע מהצטרפות מתוך הקבוצה
              this.router.navigate(['/first-nav/group',m.group_id]),this.memberGroupService.isRegister=false
            })
          }
        }
          else
         {
           //אם הוא הגיע מקבוצה חדשה
          if(this.personService.isFromIdentification==false)
          this.router.navigate(['/first-nav/new-group'])
          else
         this.router.navigate(['/first-nav/private-area'])
         }
      }) 
      
      }
    }) 
        
  }
 
}






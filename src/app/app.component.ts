import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from './services/person.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  
AprovalManager:boolean=false;
  constructor(private router:Router,public personService:PersonService){
    

  
  }
  ngOnInit(){
    
   this.router.navigate(['/first-nav'])
  
  }
  
  
  title = 'קורס אנגולר!';
}




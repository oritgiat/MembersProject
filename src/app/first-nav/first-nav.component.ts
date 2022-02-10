import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-nav',
  templateUrl: './first-nav.component.html',
  styleUrls: ['./first-nav.component.css']
})
export class FirstNavComponent implements OnInit {

  constructor(private router:Router) { }
    ///הגדרת רשימה מקומית
  ngOnInit() {
this.router.navigate(['/first-nav/Home'])
    //קריאה לפונקציה מהשרת והצבה ברשימה המקומית
  }

}

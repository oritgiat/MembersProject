import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  data: any;
img:any;

  
 

  

    constructor(private groupServis: GroupService) {

        this.data = {
          
            labels: ['שיתוף מתכונים','ועד הורים','הצעות עבודה'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384  "+"  ",
                        "#36A2EB"+"  ",
                        "#FFCE56"+"  "
                    ],

                }]    
            };
            
    }
   
    ngOnInit(): void {
    this.data;
    }
  
  }

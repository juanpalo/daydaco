//this componet response for dispay jobs info from every broker or owner post
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { AngularFireDatabase,AngularFireObject,AngularFireList  } from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import{JobBlock} from'../job-block';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-jobs-page',
  templateUrl: './jobs-page.component.html',
  styleUrls: ['./jobs-page.component.css']
})
export class JobsPageComponent implements OnInit {

  public JobForm;
  public companyName;
  public title;
  public info;
  i;

  contractorsWithJobBlock: Array<JobBlock>=[];

  itemsRef: AngularFireList<any>;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public db: AngularFireDatabase,
    public afAuth:AngularFireAuth,
    private router: Router) { 
            
    }

//function collect contractors and it's jobs form a new object array

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.companyName = params.get('companyName');
    });

    this.itemsRef = this.db.list(`ownerOrBrokerCreateJobs/${this.companyName}`);

    this.itemsRef.snapshotChanges(['child_changed'])
    .subscribe(actions => {
      this.contractorsWithJobBlock=new Array<JobBlock>();
      actions.forEach(action => {
        console.log(action.payload.val());
        
        var contra;
        contra=action.key;
        var jCount;
        var jId;

 //traslate action payload to json string
 var userStr=JSON.stringify(action.payload.val());

 JSON.parse(userStr, (key, value) => {
   //let regexpNumber = new RegExp('^[0-9]');
   //check job has been token or not
   //key=='Occupied'&&value=='false'&&
  
   if(key=='Times'||key=='JobID'){

      if(key=='Times'){
        jCount=value;
      }
      if(key=='JobID'){
        jId=value;
      }
      if(jCount&&jId){
        this.contractorsWithJobBlock.push(new JobBlock(contra,jId,jCount));
      }
      
     }
     
   }
 );

      //console.log(action.type);
    /* 
      var jlist=new Array<string>();
      
      var contra;

      contra=String(action.key);

      //traslate action payload to json string
      var userStr=JSON.stringify(action.payload.val());

      JSON.parse(userStr, (key, value) => {
        let regexpNumber = new RegExp('^[0-9]');
        //check job has been token or not
        //key=='Occupied'&&value=='false'&&
        
        if(regexpNumber.test(key)){
            jlist.push(key);
          }
        }
      );

      this.contractorsWithJobBlock.push(new JobBlock(contra,jlist));
        console.log(action.key);
        console.log(action.payload.val());  */
         
      });
    });

    

  }

}

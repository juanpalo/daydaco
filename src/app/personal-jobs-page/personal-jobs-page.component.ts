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
  selector: 'app-personal-jobs-page',
  templateUrl: './personal-jobs-page.component.html',
  styleUrls: ['./personal-jobs-page.component.css']
})
export class PersonalJobsPageComponent implements OnInit {

  contractorsWithJobBlock: Array<JobBlock>=[];

  itemsRef: AngularFireList<any>;

  userId;
  userName;
  
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public db: AngularFireDatabase,
    public afAuth:AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {

    this.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
       this.userName=this.afAuth.auth.currentUser.displayName;
       this.userId=this.afAuth.auth.currentUser.uid;
       this.itemsRef = this.db.list(`onGoingJobs/${this.userId}`);
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
    
     if(key=='JobID'){
  
        
          jCount=1;

        if(key=='JobID'){
          jId=value;
        }
        if(jCount&&jId){
          this.contractorsWithJobBlock.push(new JobBlock(contra,jId,jCount));
            }
          }    
        }
      );
      });
    });
    }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

//object to check data exit
itemRef: AngularFireObject<any>;
public info;
public role;
public company;
paid;

  constructor(public db: AngularFireDatabase,
    private router: Router,
    public afAuth:AngularFireAuth,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {

    //the long logic cause web console error can't find value
    this.afAuth.auth.onAuthStateChanged(user=>{
      if(user){

        this.db.object(`users/${this.afAuth.auth.currentUser.uid}/paid`).snapshotChanges().subscribe(action=>{
          console.log(action.payload.val());
          this.paid=action.payload.val();
          if(!this.paid){
            this.router.navigate(['']);
          }
        })

        this.itemRef = this.db.object(`trucker/${this.afAuth.auth.currentUser.uid}`);
        this.itemRef.snapshotChanges().subscribe(action => {
          if(action.payload.val()==null){
            console.log('not a trucker');
          }else{
            this.role='trucker';
            this.info=action.payload.val();
            this.company=String(this.info.Employer);
            console.log(this.company);
          }
        });
    
        this.itemRef = this.db.object(`broker/${this.afAuth.auth.currentUser.uid}`);
        this.itemRef.snapshotChanges().subscribe(action => {
          if(action.payload.val()==null){
            console.log('not a broker');
          }else{
            this.role='broker';
            this.info=action.payload.val();
            this.company=String(this.info.CompanyName);
            console.log(action.payload.val());
          }
        });
    
        this.itemRef = this.db.object(`owner/${this.afAuth.auth.currentUser.uid}`);
        this.itemRef.snapshotChanges().subscribe(action => {
          if(action.payload.val()==null){
            console.log('not a owner');
          }else{
            this.role='owner';
            this.info=action.payload.val();
            this.company=String(this.info.CompanyName);
            console.log(action.payload.val().CompanyAddress);
          }
        });
    
      }
    })

  }

}

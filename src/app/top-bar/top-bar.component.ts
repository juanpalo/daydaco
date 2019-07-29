import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  paid;
  constructor(public afAuth:AngularFireAuth,
    public db: AngularFireDatabase,
    private router: Router) {
    
   }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  ngOnInit() {
    
  }

}

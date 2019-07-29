import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dumpapp';
  constructor(public au: AngularFireAuth,public db: AngularFireDatabase) {
  
  }

  logout() {
    this.au.auth.signOut();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';

import { AngularFireDatabase,AngularFireObject  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
public role;
public truckerDiv=false;

//public alreadySignUp=false;

itemRef: AngularFireObject<any>;
item: Observable<any>;

public title;
public checkoutForm;

public info;

  constructor( private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public db: AngularFireDatabase,
    public afAuth:AngularFireAuth,
    private router: Router
    ) {

      this.checkoutForm = this.formBuilder.group({
        CompanyName: '',
        DispatcherName: '',
        CompanyPhone: '',
        CompanyEmail:'',
        CompanyAddress:'',

        DriverName:'',
        Employer:'',
        Phone:'',
        Email:'',
        Address:''

      });

     }

     onSubmit(customerData) {
      // Process user data here
      
      console.warn('Your info has been submitted', customerData.CompanyName);
//authenticate check
if(this.afAuth.user){
  let path=`${this.role}/${this.afAuth.auth.currentUser.uid}`;

  if(this.role=="trucker"&&customerData.DriverName!=""&&customerData.Employer!=""&&
    customerData.Phone!=""&&customerData.Email!=""&&customerData.Address!=""){
    let data={
      DriverName: customerData.DriverName,
      Employer:customerData.Employer,
      Phone:customerData.Phone,
      Email:customerData.Email,
      Address:customerData.Address,
    }
    this.db.object(path).update(data).catch(error=>console.log(error)).then(any=>this.router.navigate(['profile']));
  }else if(this.role=="broker"&&
  customerData.CompanyName!=""
  &&customerData.DispatcherName!=""&&
  customerData.CompanyPhone!=""&&
  customerData.CompanyEmail!=""&&
  customerData.CompanyAddress!=""){
    let data={
      CompanyName: customerData.CompanyName,
      DispatcherName: customerData.DispatcherName,
      CompanyPhone: customerData.CompanyPhone,
      CompanyEmail:customerData.CompanyEmail,
      CompanyAddress:customerData.CompanyAddress,
    }
    this.db.object(path).update(data).catch(error=>console.log(error)).then(any=>this.router.navigate(['profile']));
  }else if(this.role=="owner"&&
  customerData.CompanyName!=""
  &&customerData.DispatcherName!=""&&
  customerData.CompanyPhone!=""&&
  customerData.CompanyEmail!=""&&
  customerData.CompanyAddress!=""){
    let data={
      CompanyName: customerData.CompanyName,
      DispatcherName: customerData.DispatcherName,
      CompanyPhone: customerData.CompanyPhone,
      CompanyEmail:customerData.CompanyEmail,
      CompanyAddress:customerData.CompanyAddress,
    }
    this.db.object(path).update(data).catch(error=>console.log(error)).then(any=>this.router.navigate(['profile']));
  }
}
      this.checkoutForm.reset();
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.role = params.get('role');
      switch(this.role) { 
        case "broker": { 
           this.title="Broker/Dispatcher";
           break; 
        } 
        case "owner": { 
           this.title="Owner/Operator";
           break; 
        } 
        case "trucker"
        : { 
           this.title="Trucker/Driver" ;
           break; 
        } 
        default: { 
          console.log("Invalid choice"); 
          break;              
       } 
     } 
    });

if(this.role=="trucker"){
  this.truckerDiv=true;
}else{
  this.truckerDiv=false;
}

this.afAuth.auth.onAuthStateChanged(user=>{
  if(user){

    this.itemRef = this.db.object(`${this.role}/${this.afAuth.auth.currentUser.uid}`);
this.itemRef.snapshotChanges().subscribe(action => {
  //console.log(action.type);
  //console.log(action.key)
  //console.log(action.payload.val())
  if(action.payload.val()==null){
   
    //this.alreadySignUp=false;
  }else{
    //this.alreadySignUp=true;
    
    this.info=action.payload.val();
    //go to profile page
    //this.router.navigate(['profile']);
    this.checkoutForm.get('DriverName').setValue(this.info.DriverName);
    this.checkoutForm.get('Employer').setValue(this.info.Employer);
    this.checkoutForm.get('Phone').setValue(this.info.Phone);
    this.checkoutForm.get('Email').setValue(this.info.Email);
    this.checkoutForm.get('Address').setValue(this.info.Address);

    this.checkoutForm.get('CompanyName').setValue(this.info.CompanyName);
    this.checkoutForm.get('DispatcherName').setValue(this.info.DispatcherName);
    this.checkoutForm.get('CompanyPhone').setValue(this.info.CompanyPhone);
    this.checkoutForm.get('CompanyEmail').setValue(this.info.CompanyEmail);
    this.checkoutForm.get('CompanyAddress').setValue(this.info.CompanyAddress);
    
  }
});

  }
});

  }

}

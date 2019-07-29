import { Component, OnInit,ViewChild ,Inject,forwardRef } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { AngularFireDatabase,AngularFireObject,AngularFireList  } from '@angular/fire/database';
import { Observable, from, Observer } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Options } from 'selenium-webdriver/firefox';

import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-stage-one',
  templateUrl: './stage-one.component.html',
  styleUrls: ['./stage-one.component.css'],
  providers: [
    { provide: 'Window',  useValue: window },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StageOneComponent),
      multi: true,
    },
  ]
})
export class StageOneComponent implements OnInit {

name;
userId;
contractor;
jobId;
companyName;

itemsRef: AngularFireObject<any>;

info;
TruckNo='aa';
public checkoutForm;
public loadForm;
public arriveForm

base64Image;

signatureData;

DriverSign;

@ViewChild(SignaturePad, {static: false}) public signaturePad: SignaturePad;

public options: Object = {};

  public _signature: any = null;

  public propagateChange: Function = null;

  get signature(): any {
    return this._signature;
  }

  set signature(value: any) {
    this._signature = value;
    console.log('set signature to ' + this._signature);
    console.log('signature data :'+value);
    console.log(this.signaturePad.toData());

    this.propagateChange(this.signature);
  }

public rewind(){
  this.signaturePad.fromData(this.signatureData);
}

  public writeValue(value: any): void {
    if (!value) {
      return;
    }
    this._signature = value;
    this.signaturePad.fromDataURL(this.signature);
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(): void {
    // no-op
  }

  public ngAfterViewInit(): void {
    this.signaturePad.clear();
  }

  public drawBegin(): void {
    console.log('Begin Drawing');
  }

  public drawComplete(): void {

    this.signatureData=this.signaturePad.toData();
    this.signature = this.signaturePad.toDataURL('image/jpeg', 0.5);

  }

  public clear(): void {
    this.signaturePad.clear();
    this.signature = '';
  }


public signaturePadOptions: Object = { 
  // passed through to szimek/signature_pad constructor
  'minWidth': 5,
  'canvasWidth': 300,
  'canvasHeight': 200,
  'backgroundColor':'rgb(255,255,255)',
};


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public db: AngularFireDatabase,
    public afAuth:AngularFireAuth,
    private router: Router,
    @Inject('Window') private window: Window,
  ) {
    //trucker infomations
    this.checkoutForm = this.formBuilder.group({ 
      TruckNo:'',
      LicPlate:'',
      TruckType:'',
      //modify time
      BeginShift:'',

    });
    //trucker info modi button
    //begin shift button

    //arrive at work place
    this.arriveForm = this.formBuilder.group({ 
      
      ArriveAtSite:'',
      //modify time

    });
    //arrive modify button


    //start load and unload
    this.loadForm = this.formBuilder.group({ 
      ScaleTagID: '',
      Weight: '',
      Material: '',
      LoadStart:'',
      LoadEnd:'',
      UnloadStart:'',
      UnloadEnd:'',
      Note:'',
      EndShift:''
      //modify time
    });
      //load and unload modify button
      //new load button
      //end shift button
      
      //later on add note button
   }

   onSubmit(data) {
     console.log(this.loadForm.get('ScaleTagID').value);
   }

   BeginShift(){

   }

giveUp(){
    //delet job in hand
    let path=`onGoingJobs/${this.userId}/${this.contractor}/${this.jobId}`;
    //let occupPath=`ownerOrBrokerCreateJobs/${this.companyName}/${this.contractor}/${this.jobId}`;
    
    this.db.object(path).remove();
    //update occupied in job toable
   //this.db.object(occupPath).update({Occupied:'false'});
   this.router.navigate(['profile']);
  
}

getBase64ImageFromURL(url: string) {
  return Observable.create((observer: Observer<string>) => {
    // create an image object
    let img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
        observer.next(this.getBase64Image(img));
        observer.complete();
      };
      img.onerror = (err) => {
         observer.error(err);
      };
    } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
    }
  });
}

getBase64Image(img: HTMLImageElement) {
  // We create a HTML canvas object that will create a 2d image
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  // This will draw image    
  ctx.drawImage(img, 0, 0);
  // Convert the drawn image to Data URL
  var dataURL = canvas.toDataURL("image/png");
return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}


download() {
  var doc = new jsPDF();
  
  doc.text(20, 20, `Driver: ${this.name}`);
  doc.text(20, 30, `Arrive At: ${this.info.ArriveAt}`);
  //doc.addPage();
  doc.text(20, 40, `Arrive time: ${this.info.ArriveTime}, ${this.info.JobDate}`);
  doc.text(20,50,`Job: ${this.info.Job}`);

// for testing you can add any image url here or get dynamically  from other methods as you require
/*
let imageUrl = 'https://firebasestorage.googleapis.com/v0/b/tfttierlist.appspot.com/o/items%2FB.F.%20Sword.png?alt=media&token=194d2184-0ce6-4489-9e90-e4c4943a4da6'
;

this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {    
  console.log(base64data);
  // this is the image as dataUrl
  this.base64Image = 'data:image/jpg;base64,' + base64data;
});
**/

this.signaturePad.fromData(this.signatureData);
 doc.addImage((this.signaturePad.toDataURL('image/jpeg', 0.5)) ,"JPG", 50, 200, 100,50);
  // Save the PDF
  doc.save('Test.pdf');
}


drawStart() {
  // will be notified of szimek/signature_pad's onBegin event
  console.log('begin drawing');
}


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      //this.companyName = params.get('companyName');userid/:contractor/:jobid
      this.userId=params.get('userid');
      this.contractor=params.get('contractor');
      this.jobId=params.get('jobid');
    });

   
    this.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
        this.name=this.afAuth.auth.currentUser.displayName;
      }});
    //get the company name first
    let companyNamePath=`onGoingJobs/${this.userId}/${this.contractor}/${this.jobId}/companyName`;
    this.db.object(companyNamePath).snapshotChanges().subscribe(action => {
    this.companyName =action.payload.val();
    });

    //get on going job info
    this.itemsRef = this.db
    .object
    (`onGoingJobs/${this.userId}/${this.contractor}/${this.jobId}`);

    this.itemsRef.snapshotChanges().subscribe(action => {
      //console.log(action.type)
      //console.log(action.key)
      if(action.payload.val()==null){
      }else{
        //go to profile page
        this.info=action.payload.val();
      }
    });

  }

}

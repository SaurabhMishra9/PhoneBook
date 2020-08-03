import { Component, OnInit } from '@angular/core';
import {Contacts} from './Contact';
import {ContactService} from './Contact.service';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {
  contactObj:Contacts;
  contacts:Contacts[];
  myForm:FormGroup;
  showModal: boolean;

  submitted = false;

  showSuccessText: boolean;
  searchKey:string;
  showToggle:boolean;
  SortArray:[];

  constructor(private ContactSer:ContactService,private fb: FormBuilder) 
  {
   this.contactObj=new Contacts(); 
   this.contacts=this.ContactSer.getContacts();
    this.myForm= this.fb.group({
      Fname1:new FormControl(null,Validators.required),
      Fname2:new FormControl(null,Validators.required),
      Number:new FormControl(null,[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)])
    });
    this.showToggle=false;

   }
   OnUpdate(){
     this.myForm.patchValue({
       Fname1: this.contactObj.fname,
       Fname2: this.contactObj.lname,
       Number: this.contactObj.mobileNumber

     });
  }
   //get method
   public get Fname1(){
    return this.myForm.get('Fname1');
  }
  public get Fname2(){
    return this.myForm.get('Fname2');
  }
  public get Number(){
    return this.myForm.get('Number');
  }

  get f() {
     return this.myForm.controls;
     }

     initializeFromGroup(){
      this.myForm.setValue({
          Fname1: '',
          Fname2: '',
          Number: ''
      });
  }

  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.myForm.reset();
    this.initializeFromGroup();
    this.showModal = false;
  }

  onSubmit() {
    // stop here if form is invalid

    if(this.myForm.valid)
    {
      this.ContactSer.AddNewContact(this.contactObj);
      //console.log("saving");
      this.showToggle=true;
      this.contactObj.fname=this.Fname1.value;
      this.contactObj.lname=this.Fname2.value; 
      this.contactObj.mobileNumber=this.Number.value;
      this.contactObj = new Contacts();
      
      this.hide();

    }
   
  }
  //on close reset form
  onClose(){
    this.myForm.reset();
  }
  onDelete(c:Contacts) {
    //this.ContactSer.DeleteContact(this.contactObj);
    this.contacts = this.contacts.filter(item => item !== c);

  }

  ngOnInit(): void {
  }
onClose1(){
  this.searchKey="";
  return this.ContactSer.getContacts();
}
//searching contact by name
OnSearch(){
  this.contacts = this.ContactSer.getContacts().filter(x=>x.lname.toLowerCase()==this.searchKey.trim().toLowerCase()||x.fname.toLowerCase()==this.searchKey.trim().toLowerCase());
}
 
ByNameAesc(){
  this.contacts.sort((a, b) => (a.fname < b.fname ? -1 : 1));
}
ByNameDesc(){
  this.contacts.sort((a, b) => (a.fname > b.fname ? -1 : 1));
}
ByNum(){
  this.contacts.sort((a, b) => (a.mobileNumber < b.mobileNumber ? -1 : 1));
}


}

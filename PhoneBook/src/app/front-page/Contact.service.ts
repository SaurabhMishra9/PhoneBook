import {Contacts} from './Contact';

export class ContactService{

    contact:ContactsService;
    contactlist:Contacts[];
    contactSearch:Contacts[];

    constructor(){
        this.contactlist = [];
        this.contactSearch=[];
        var contact1;
        contact1= new Contacts();
        contact1.fname="Bill";
        contact1.lname="Gates";
        contact1.mobileNumber=9991118880;
        this.contact.push(contact1);
    }
    
    getContacts():Contacts[]{
        return this.contactlist;
    }

    AddNewContact(c:Contacts):Contacts[]
    {
         this.contactlist.push(c);
         return this.contactlist;
    }
     DeleteContact(num:Contacts):Contacts[]{
        for(let index=0; index<this.contactlist.length;index++)
        {
            if(num.mobileNumber==this.contactlist[index].mobileNumber)
            {   
                const i=index;
                this.contactlist.splice(i,1);
                break;
            }
        }
        return this.contactlist;
    }   
 
    UpdateContact(c:Contacts):Contacts[]
    {
        for(let index =0; index<this.contactlist.length; index++)
        {
            if(c.fname==this.contactlist[index].fname ||c.lname==this.contactlist[index].lname|| c.mobileNumber==this.contactlist[index].mobileNumber)
            {
                this.contactlist[index].fname=c.fname;
                this.contactlist[index].lname=c.lname;
                this.contactlist[index].mobileNumber=c.mobileNumber;
                break;
            }
            else
            {
             this.contact.AddNewContact(c);   
            }
    
        }
    
        return this.contactlist;
        
    }

    sortarray(sortDesc:boolean):Contacts[]
{   if(sortDesc==false)
    {
    this.contactlist=this.contactlist.sort((obj1, obj2) => {
      if (obj1.fname > obj2.fname) {
          return 1;
      }
  
      else if (obj1.fname < obj2.fname) {
          return -1;
      }
      else if(obj1.fname==obj2.fname)
      {
          if(obj1.lname>obj2.fname)
          {
              return 1;
          }
          else if(obj1.fname<obj2.lname)
          {
              return -1;
          }
      }
  
      return 0;
  });
    }


   
} 

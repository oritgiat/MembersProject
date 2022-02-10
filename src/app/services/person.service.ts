import {Injectable} from'@angular/core';
import {HttpClient}from'@angular/common/http';
import { Observable } from 'rxjs';
import { PersonModule } from '../modules/person.module';
@Injectable({
    providedIn:'root'
})
export class PersonService
{
    status:string=""
    curentUser:PersonModule=new PersonModule()
    isFromRgister:boolean=true
    isFromIdentification:boolean=true
    isFromIdentificationToGroup:boolean=true
    yonit:boolean=false;
    isToRe:boolean=false;//בשביל עדין לא רשום
    isToDisabled:boolean=false;//בשביל כניסה לקבוצה פתוחה
    isFromNewGroup:boolean=true;
    managerAproval:boolean=false;
    isShowGroup:boolean=false;
    person:boolean=false;
    statusMember:boolean=false;
    iden:boolean=false;
    memberPerson:boolean=false;
    orit:boolean=false;
    addMemberfromManager=false;//מנהל שמצרף חבר
    idGroup:any
    constructor(private client:HttpClient){}
    url:string="http://localhost:52491/api/person/"
    listPersons:PersonModule[]
    getPersonById(id:number):Observable<PersonModule>
    {
        return this.client.get<PersonModule>(this.url+"getPersonById"+id)
    }
    getAllPersons():Observable<Array<PersonModule>>
    {
        return this.client.get<Array<PersonModule>>(this.url+"getAllPersons")
    }
    addPerson(p:PersonModule):Observable<PersonModule>
    {
        return this.client.post<PersonModule>(this.url+"addPerson",p)
    }
    deletePerson(id:number):Observable<Array<PersonModule>>
    {
        return this.client.delete<Array<PersonModule>>(this.url+"deletePerson"+id)
    }
    updatePerson(p:PersonModule):Observable<Array<PersonModule>>
    {
        return this.client.put<Array<PersonModule>>(this.url+"updatePerson",p)
    }
    
    
}
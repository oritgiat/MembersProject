import {Injectable} from'@angular/core';
import {HttpClient}from'@angular/common/http';
import { Observable } from 'rxjs';
import { GroupModule } from '../modules/group.module';
import { PersonModule } from '../modules/person.module';
@Injectable({
    providedIn:'root'
})
export class GroupService
{
    constructor(private client:HttpClient){}
    url:string="http://localhost:52491/api/group/"
    listGroups:GroupModule[]
    arrPersonWait:Array<PersonModule>=new Array<PersonModule>()
    statusGroup:number;
    status:number;
    id:number;
    idG:GroupModule=new GroupModule;
    getGroupById(id:number):Observable<GroupModule>
    {
        return this.client.get<GroupModule>(this.url+"getGroupById/"+id)
    }
    getAllGroup():Observable<Array<GroupModule>>
    {
        return this.client.get<Array<GroupModule>>(this.url+"getAllGroups")
    }
    addGroup(g:GroupModule):Observable<Array<GroupModule>>
    {
        return this.client.post<Array<GroupModule>>(this.url+"addGroup",g)
    }
    deleteGroup(id:number):Observable<Array<GroupModule>>
    {
        return this.client.delete<Array<GroupModule>>(this.url+"deleteGroup"+id)
    }
    updateGroup(g:GroupModule):Observable<boolean>
    {
        
        return this.client.put<boolean>(this.url+"updateGroup",g)
    }
    getStatus(p:PersonModule):Observable<number>
    {
        
        return this.client.post<number>(this.url+"getStatus",p) 
    }
    retrievalPerson(p:PersonModule):Observable<PersonModule>
    {       
        return this.client.post<PersonModule>(this.url+"retrievalPerson",p) 
    }
    getGroupOfMember(id:string):Observable<Array<GroupModule>>
    {
        return this.client.get<Array<GroupModule>>(this.url+"getGroupOfMember/"+id)
    }
    getGroupOfManager(id:string):Observable<Array<GroupModule>>
    {
        return this.client.get<Array<GroupModule>>(this.url+"getGroupOfManager/"+id)
    }
    getGroupWaitOfPerson(id:string):Observable<Array<GroupModule>>
    {
        return this.client.get<Array<GroupModule>>(this.url+"getGroupWaitOfPerson/"+id)
  
    }
}
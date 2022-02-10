import {Injectable} from'@angular/core';
import {HttpClient}from'@angular/common/http';
import { Observable } from 'rxjs';
import { MemberGroupModule } from '../modules/memberGroup.module';
import { CorrespodenceModule } from '../modules/correspodence.module';
import { PersonModule } from '../modules/person.module';
@Injectable({
    providedIn:'root'
})
export class MemberGroupService
{
    currentId:number
    isRegister:boolean
    curentMember:MemberGroupModule=new MemberGroupModule()
    // curentMember:MemberGroupModule=new MemberGroupModule()

    constructor(private client:HttpClient){}
    url:string="http://localhost:52491/api/memberGroup/"
    listMemberGroups:MemberGroupModule[]

    getMemberGroupById(id:number):Observable<MemberGroupModule>
    {
        return this.client.get<MemberGroupModule>(this.url+"getMemberGroupById/"+id)
    }
    getAllMemberGroups():Observable<Array<MemberGroupModule>>
    {
        return this.client.get<Array<MemberGroupModule>>(this.url+"getAllMemberGroups")
    }
    addMemberGroup(m:MemberGroupModule):Observable<MemberGroupModule>
    {
        return this.client.post<MemberGroupModule>(this.url+"addMemberGroup",m)
    }
    deleteMemberGroup(id:number):Observable<Array<MemberGroupModule>>
    {
        return this.client.delete<Array<MemberGroupModule>>(this.url+"deleteMemberGroup/"+id)
    }
    updateMemberGroup(p:PersonModule):Observable<Array<PersonModule>>
    {
        return this.client.put<Array<PersonModule>>(this.url+"updateMemberGroup",p)
    }
    updateMemberGroupToRefuse(p:PersonModule):Observable<Array<PersonModule>>
    {
        return this.client.put<Array<PersonModule>>(this.url+"updateMemberGroupToRefuse",p)
    }
    getMemberGroupByGroupId(id:number):Observable<Array<MemberGroupModule>>
    { 
        return this.client.get<Array<MemberGroupModule>>(this.url+"getMemberGroupByGroupId/"+id)
    }
    getCorrespodenceByGroupIdToPerson(c:CorrespodenceModule):Observable<Array<MemberGroupModule>>
    {
        return this.client.post<Array<MemberGroupModule>>(this.url+"getCorrespodenceByGroupIdToPerson",c)
    }
    getGroupOfMemberAwait(id:string):Observable<Array<PersonModule>>
    {
        return this.client.get<Array<PersonModule>>(this.url+"getGroupOfMemberAwait/"+id)

    }

    
}
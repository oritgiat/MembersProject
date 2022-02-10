import {Injectable} from'@angular/core';
import {HttpClient}from'@angular/common/http';
import { Observable } from 'rxjs';
import { MemberGroupModule } from '../modules/memberGroup.module';
@Injectable({
    providedIn:'root'
})
export class RegistrationService
{
    currentId:number
    isRegister:boolean
    curentMember:MemberGroupModule=new MemberGroupModule()
    // curentMember:MemberGroupModule=new MemberGroupModule()

    constructor(private client:HttpClient){}
    url:string="http://localhost:52491/api/registration/"
    listMemberGroups:MemberGroupModule[]

    
}
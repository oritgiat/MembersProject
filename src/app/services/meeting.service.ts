import {Injectable} from'@angular/core';
import {HttpClient}from'@angular/common/http';
import { Observable } from 'rxjs';
import { MeetingModule } from '../modules/meeting.module';
import { GroupModule } from '../modules/group.module';
import {MessageService} from 'primeng/api';

@Injectable({
    providedIn:'root'
})
export class MeetingService
{
    constructor(private client:HttpClient){}
    url:string="http://localhost:52491/api/Meeting/"
    listMeeting:MeetingModule[]
    group:GroupModule
    getMeetingById(id:number):Observable<Array<MeetingModule>>
    {debugger;
        return this.client.get<Array<MeetingModule>>(this.url+"getMeetingById/"+id)
    }
    getAllMeeting():Observable<Array<MeetingModule>>
    {
        return this.client.get<Array<MeetingModule>>(this.url+"getAllMeeting")
    }
    addMeeting(m:MeetingModule):Observable<MeetingModule>
    {
        return this.client.post<MeetingModule>(this.url+"addMeeting",m)
    }
    deleteMeeting(id:number):Observable<boolean>
    {
        return this.client.delete<boolean>(this.url+"deleteMeeting/"+id)
    }
    updateMeeting(m:MeetingModule):Observable<Array<MeetingModule>>
    {
        return this.client.put<Array<MeetingModule>>(this.url+"updateMeeting",m)
    }
    getMeetingByGroupId(id:number, idP:string):Observable<Array<MeetingModule>>
    {
        return this.client.get<Array<MeetingModule>>(this.url+"getMeetingByGroupId/"+id+"/"+idP)
    }
}
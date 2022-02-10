import {Injectable} from'@angular/core';
import {HttpClient}from'@angular/common/http';
import { Observable } from 'rxjs';
import { ParticipationModule } from '../modules/participation.module';
@Injectable({
    providedIn:'root'
})
export class ParticipationService
{
    constructor(private client:HttpClient){}
    url:string="http://localhost:52491/api/Participation/"
    listParticipation:ParticipationModule[]
    getParticipationById(id:number):Observable<Array<ParticipationModule>>
    {
        return this.client.get<Array<ParticipationModule>>(this.url+"getParticipationById"+id)
    }
    getAllParticipations():Observable<Array<ParticipationModule>>
    {
        return this.client.get<Array<ParticipationModule>>(this.url+"getAllParticipations")
    }
    addParticipation(p:ParticipationModule):Observable<boolean>
    {
        return this.client.post<boolean>(this.url+"addParticipation",p)
    }
    getMemberParticipationGroupId(id:number):Observable<Array<ParticipationModule>>
    { 
        return this.client.get<Array<ParticipationModule>>(this.url+"getMemberParticipationGroupId/"+id)
    }
    deleteParticipation(id:number):Observable<Array<ParticipationModule>>
    {
        return this.client.delete<Array<ParticipationModule>>(this.url+"deleteParticipation"+id)
    }
    updateParticipation(p:ParticipationModule):Observable<Array<ParticipationModule>>
    {
        return this.client.put<Array<ParticipationModule>>(this.url+"updateParticipation",p)
    }
}
import {Injectable} from'@angular/core';
import {HttpClient}from'@angular/common/http';
import { Observable } from 'rxjs';
import { CorrespodenceModule } from '../modules/correspodence.module';
@Injectable({
    providedIn:'root'
})
export class CorrespodenceService
{
    constructor(private client:HttpClient){}
    url:string="http://localhost:52491/api/Correspodence/"
    listCorrespodences:CorrespodenceModule[]

    getCorrespodenceById(id:number):Observable<CorrespodenceModule>
    {
        return this.client.get<CorrespodenceModule>(this.url+"getCorrespodenceById"+id)
    }
    getAllCorrespodence():Observable<Array<CorrespodenceModule>>
    {
        return this.client.get<Array<CorrespodenceModule>>(this.url+"getAllCorrespodence")
    }
    addCorrespodence(c:CorrespodenceModule):Observable<Array<CorrespodenceModule>>
    {
        return this.client.post<Array<CorrespodenceModule>>(this.url+"addCorrespodence",c)
    }
    deleteCorrespodence(id:number):Observable<Array<CorrespodenceModule>>
    {
        return this.client.delete<Array<CorrespodenceModule>>(this.url+"deleteCorrespodence"+id)
    }
    updateCorrespodence(c:CorrespodenceModule):Observable<Array<CorrespodenceModule>>
    {
        return this.client.put<Array<CorrespodenceModule>>(this.url+"updateCorrespodence",c)
    }
    getCorrespodenceByGroupId(id:number):Observable<Array<CorrespodenceModule>>
    {
        return this.client.get<Array<CorrespodenceModule>>(this.url+"getCorrespodenceByGroupId/"+id)
    }
    getCorrespodenceByGroupId2(id:number):Observable<Array<CorrespodenceModule>>
    {
        return this.client.get<Array<CorrespodenceModule>>(this.url+"getCorrespodenceByGroupId2/"+id)
    }
    sortByPerson(id:number,id_name:string):Observable<Array<CorrespodenceModule>>
    {
        return this.client.get<Array<CorrespodenceModule>>(this.url+"sortByPerson/"+id+"/"+id_name)
    }
}


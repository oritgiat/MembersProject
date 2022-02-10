import { document } from '../document';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  url: string = "http://localhost:52491/api/document/"
//   mychange():Observable<boolean> {
//     return this.http.post<boolean>(this.url + "SaveFileByBase64", d);
//   }

//עדכון והוספת תמונה
uploadImage(image) {
    const formData: FormData = new FormData();
    formData.append('img', image, image.name);
    return this.http.post(this.url +"UploadImage", formData);
}
  constructor(private http: HttpClient) { }



}
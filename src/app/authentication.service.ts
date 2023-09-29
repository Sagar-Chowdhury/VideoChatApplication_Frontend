import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url:string = 'http://localhost:8080/api/v1/users'
  constructor(private http:HttpClient) { }
  
  login(username:string , email:string , password:string){
     const data = {
      username: username,
      email: email,
      password: password
    }
    return this.http.post(this.url+'/login', data);
  }
   
  signup(username:string , email:string , password:string){
    const data = {
      username: username,
      email: email,
      password: password
    }
    return this.http.post(this.url, data);
  }
  
  isLoggedIn(): boolean {
    const token = localStorage.getItem('user');
    return !!token;
   }
  
}

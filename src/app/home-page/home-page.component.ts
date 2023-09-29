import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(private _router: Router){}
  clearLocalStorage(){
    localStorage.clear();
    this._router.navigate(['']); 
  }
  navigatetoChatRoom(){
    this._router.navigate(['/chatroom']);
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  constructor(private auth:AuthenticationService, private router:Router,private formBuilder:FormBuilder,private toastr:ToastrService){
     this.loginForm = this.formBuilder.group({
      Username : ['',[Validators.required, Validators.minLength(1)]],
      email : ['',[Validators.required, Validators.email]],
      password : ['',[Validators.required, Validators.minLength(1)]]
     });
  }

  login(){
      console.log("Login Form Submitted");
      if(this.loginForm.valid){
        const username = this.loginForm.get('username')?.value  
        const email = this.loginForm.get('email')?.value
        const password = this.loginForm.get('password')?.value
        this.auth.login(username, email, password).pipe(
          catchError((error) => { console.log(error.message);
          
            return of([]);
          
          })).subscribe( (response:any) => {
             
            console.log(response);
            
            if( response.length!=0 )
            {
                 localStorage.setItem('user', JSON.stringify(response));
                 this.navigateToHome(); 
            }
            else
            {
               this.toastr.error("Wrong username or email or password");
            }


          });

      }
      else
      {
         console.log("Invalid Crdedentials")
         this.toastr.error("Invalid Crdedentials")
         
      }
      
  }

  navigateToSignup(){
    this.router.navigate(['/signup']);
  }

  navigateToHome(){
    this.router.navigate(['/home']);
  }






}

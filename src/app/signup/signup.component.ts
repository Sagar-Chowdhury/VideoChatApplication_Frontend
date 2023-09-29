import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm!: FormGroup;
  constructor(private auth:AuthenticationService,private router:Router,private formBuilder:FormBuilder,private toastr:ToastrService){
     this.signupForm = this.formBuilder.group({
      Username : ['',[Validators.required, Validators.minLength(1)]],
      email : ['',[Validators.required, Validators.email]],
      password : ['',[Validators.required, Validators.minLength(1)]]
     });
  }

  signin(){
    
    if(this.signupForm.valid){
      const username = this.signupForm.get('Username')?.value  
      const email = this.signupForm.get('email')?.value
      const password = this.signupForm.get('password')?.value
      console.log("Username: " + username);
      
      this.auth.signup(username, email, password).pipe(
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
             this.toastr.error("Try again with valid Crdentials");
          }


        });
    }
    else
    {
        this.toastr.error("Try again with valid Crdentials");
    }
  }

  navigateTologin(){
    this.router.navigate(['']);
  }
   
  navigateToHome(){
    this.router.navigate(['/home']);
  }

}

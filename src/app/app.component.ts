import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from './val.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Task-1-Reactive-forms';

  PASSWORD = '';

  reactiveForm: FormGroup;

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      Firstname: new FormControl(null,[Validators.required,CustomValidator.noSpaceValidator]),
      Lastname: new FormControl(null,[Validators.required,CustomValidator.noSpaceValidator]),
      Gender: new FormControl(null,Validators.required),
      Address: new FormGroup({
        Country: new FormControl(null, Validators.required),
        City: new FormControl(null,Validators.required),
        Street: new FormControl(null,Validators.required),
        Postal: new FormControl(null,Validators.required)
      }),
      PhoneNumber: new FormControl(null,Validators.required),
      Email: new FormArray([
        new FormControl(null)
      ]),
      Dob: new FormControl(null,Validators.required),
      Position: new FormControl(null, Validators.required),
      Account: new FormGroup({
        Username: new FormControl(null,CustomValidator.noSpaceValidator,CustomValidator.usernameNotAllowed),
        Password: new FormControl(null,[Validators.required,Validators.minLength(8)]),
        confirmPassword: new FormControl(null,Validators.required)
      }),
      Subscribe: new FormControl(false)
    });
       
        this.reactiveForm.get('Subscribe').valueChanges.subscribe((subscribeValue) => {
          const emailControl = this.reactiveForm.get('Email');
    
          if (subscribeValue) {
          
            emailControl.setValidators([Validators.email, Validators.required]);
          } else {
      
            emailControl.setValidators([Validators.email]);
          }
    
      
          emailControl.updateValueAndValidity();
        });
  }
  onSubmit() {
    console.log(this.reactiveForm);
  }
  addEmail(){
    (<FormArray>this.reactiveForm.get('Email')).push(new FormControl(null,Validators.email));
  }
  deleteEmail(index: number){
    (<FormArray>this.reactiveForm.get('Email')).removeAt(index);
  }
}

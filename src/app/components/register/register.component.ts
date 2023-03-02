import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WriteVarExpr } from '@angular/compiler';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  imagePreview: any;
  somevalue:any
  shopForm:any = FormGroup
  name: FormControl = new FormControl("", [Validators.required]);
  email: FormControl = new FormControl("");
  password: FormControl = new FormControl("",[Validators.required, Validators.minLength(8)]);
  // img: FormControl = new FormConrol()



  
  isSuccessful = false
  isSignUpFailed = false
  errorMessage = ''
  

  

  constructor(private router: Router, private location : Location, 
    private authService: AuthService, private fb: FormBuilder,private http: HttpClient) {
    this.shopForm = this.fb.group({
      name: [null],
      email: null,
      password: null,
      img: ['']
    })
   }
  
  ngOnInit(): void {
    this.imagePreview = "https://www.thesait.org.za/global_graphics/default-store-350x350.jpg"
  }
  fileSelect(event: any){
 
    if (event.target.files[0]) {
     
      var reader = new FileReader();
      
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.imagePreview = event.target.result;

        this.shopForm.patchValue({
        img: this.imagePreview
      });
      this.shopForm.get('img').updateValueAndValidity()
       
      }
    }
  }

  onSubmit(): void {
    
    const data :any =  new FormData()
    data.append('name', this.shopForm.get('name').value)
    data.append('email', this.shopForm.get('email').value)
    data.append('password', this.shopForm.get('password').value)
    data.append('img', this.shopForm.get('img').value)
    
   
    var obj :any = {}

    for (let x of data){
      
      let key = x[0]
      let value = x[1]
      obj[key as keyof typeof obj] = value
      
   }

    console.log(obj)
  
   
    
     
    const {name, email, password, img} = obj

    this.authService.register(name, email, password, img )
      .subscribe({
        next: data => {
          console.log(data)
          this.isSuccessful = true
          this.isSignUpFailed = false
        },
        error: err => {
          this.errorMessage = err.error.message
          this.isSignUpFailed = true
        }
      })
      
        
      
      
      //this.router.navigate(['/home'])
  }
}
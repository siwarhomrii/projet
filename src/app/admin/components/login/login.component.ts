import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  private loginService:LoginService = inject(LoginService);
  private router:Router= inject(Router);
  private fb:FormBuilder=inject(FormBuilder);
  loginObj!:{userName:string,password:string};
ngOnInit(): void {
  this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  this.loginService.getLogin().subscribe(
    data=>this.loginObj=data
  )
}
onLogin() {
  if (this.loginForm.valid) {
    const { username, password } = this.loginForm.value;
    const isValid = username===this.loginObj.userName && password===this.loginObj.password;
    if (isValid) {
      this.router.navigate(['/layout']);
      localStorage.setItem('state','connected');
    } else {
      alert('Invalid username or password');
      this.loginForm.reset();
      localStorage.setItem('state','disconnected');
    }
  }
}
}

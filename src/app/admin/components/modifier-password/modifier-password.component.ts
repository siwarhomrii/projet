import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-modifier-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modifier-password.component.html',
  styleUrls: ['./modifier-password.component.css']
})
export class ModifierPasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  login: { userName: string; password: string } = { userName: '', password: '' };
  private readonly formbuilder: FormBuilder = inject(FormBuilder);
  private readonly loginservice: LoginService = inject(LoginService);
  private readonly router: Router = inject(Router);

  ngOnInit() {
    this.passwordForm = this.formbuilder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8),Validators.pattern('^[A-Z](?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{7,}$')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    })
  }
  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if(this.passwordForm.valid){
    const currentPassword = this.passwordForm.get('currentPassword')?.value;
    const newPassword = this.passwordForm.get('newPassword')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;
    if (newPassword !== confirmPassword) {
      alert('Les mots de passe ne sont pas identiques');
      return;
    }
   else 
  {
    this.loginservice.getLogin().subscribe(
      (login) => {
        this.login=login
        console.log(this.login)
        if (login.password !== currentPassword) {
          alert('Mot de passe actuel incorrect');
        }
        const updatedLogin = { userName: login.userName, password: newPassword };
        this.loginservice.modifyLogin(updatedLogin).subscribe(
          () => {
            alert('Mot de passe modifié avec succès');
            this.router.navigate(['/layout/products']);
          }
        );
      }
    );
  }
}
  }
isValidPassword(){
  return this.passwordForm.get('newPassword')?.errors?.['pattern'] && this.passwordForm.get('newPassword')?.dirty
}
}

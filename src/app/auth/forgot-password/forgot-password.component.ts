// forgot-password.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  submitted = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() { return this.forgotPasswordForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Check if the form is valid
    if (this.forgotPasswordForm.invalid) {
      return; // Stop if invalid
    }

    const email = this.f['email'].value;

    // Call AuthService to send the password reset email
    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        this.successMessage = response.message; // Display success message
        this.errorMessage = null; // Clear any previous error message
      },
      error: (err) => {
        this.errorMessage = err.message; // Display error message
        this.successMessage = null; // Clear any previous success message
      }
    });
  }
}

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
  loading = false; // Add loading state for better UX

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    // Initialize form with email validation
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Convenient getter for form controls
  get f() { return this.forgotPasswordForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Stop if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    const email = this.f['email'].value;
    this.loading = true; // Show loading indicator

    // Call AuthService to send the password reset email
    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        // Handle successful response
        this.successMessage = 'Password reset link has been sent to your email address.';
        this.errorMessage = null;
        this.loading = false;
      },
      error: (err) => {
        // Handle error response
        this.errorMessage = 'Failed to send reset password email. Please try again later.';
        this.successMessage = null;
        this.loading = false;
      }
    });
  }
}

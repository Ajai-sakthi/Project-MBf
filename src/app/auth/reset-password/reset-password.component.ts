import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  token: string = ''; // Holds the reset token from the URL

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    // Initializing the form with validators
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.mustMatch('password', 'confirmPassword') // Custom validator for matching passwords
    });
  }

  ngOnInit(): void {
    // Extract the reset token from the URL query parameters
    this.route.queryParams.subscribe(params => {
      this.token = params['token']; // Assuming the reset token is passed as a query parameter
    });
  }

  // Custom validator to check if password and confirmPassword match
  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[confirmPassword];

      // Set error if passwords don't match
      if (confirmPassControl.errors && !confirmPassControl.errors['mustMatch']) {
        return;
      }

      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ mustMatch: true });
      } else {
        confirmPassControl.setErrors(null); // Clear error if passwords match
      }
    };
  }

  // Handler for form submission
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Check if form is valid before proceeding
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.loading = true;

    // Get the new password from the form
    const password = this.resetPasswordForm.get('password')?.value;

    // Call AuthService to reset password with the provided token and new password
    this.authService.resetPassword(this.token, password).subscribe(
      response => {
        this.loading = false;
        this.successMessage = 'Password reset successful. You will be redirected to login.';
        // Redirect to login after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error => {
        this.loading = false;
        this.errorMessage = 'Password reset failed. Please try again or check your reset link.';
      }
    );
  }
}

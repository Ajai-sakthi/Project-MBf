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
  token: string = ''; // This will hold the reset token from the URL

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.mustMatch('password', 'confirmPassword') // Custom validator for matching passwords
    });
  }

  ngOnInit(): void {
    // Get the reset token from the query parameters in the URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token']; // Assuming the token is passed as a query parameter
    });
  }

  // Custom validator for matching password and confirmPassword
  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[confirmPassword];

      if (confirmPassControl.errors && !confirmPassControl.errors['mustMatch']) {
        return;
      }

      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ mustMatch: true });
      } else {
        confirmPassControl.setErrors(null);
      }
    };
  }

  // Submit form handler
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.resetPasswordForm.invalid) {
      return; // Form is invalid, don't proceed
    }

    this.loading = true;

    const password = this.resetPasswordForm.get('password')?.value;

    // Call AuthService to reset password with the token and new password
    this.authService.resetPassword(this.token, password).subscribe(
      response => {
        this.loading = false;
        this.successMessage = 'Password reset successful. You will be redirected to login.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000); // Redirect after 3 seconds
      },
      error => {
        this.loading = false;
        this.errorMessage = 'Password reset failed. Please try again or check your reset link.';
      }
    );
  }
}

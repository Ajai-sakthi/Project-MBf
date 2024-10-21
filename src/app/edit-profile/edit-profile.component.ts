import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  user: any; // To hold the current user data

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.editProfileForm = this.fb.group({
      name: ['', Validators.required], // Add more fields as necessary
      email: [{ value: '', disabled: true }], // Set the initial value for the email control
    });
  }

  ngOnInit(): void {
    this.loadUserData();
    this.editProfileForm.get('email')?.disable(); // Disable email input programmatically
  }

  loadUserData(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = currentUser;
      this.editProfileForm.patchValue({
        name: this.user.name,
        email: this.user.email, // Display current email, but don't allow editing
      });
    }
  }

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      // Logic to update the user's profile
      const updatedUser = {
        ...this.user,
        name: this.editProfileForm.get('name')?.value,
      };

      this.authService.updateUser(updatedUser).subscribe(
        response => {
          console.log('Profile updated successfully:', response);
          this.router.navigate(['/profile']); // Redirect to profile page after update
        },
        error => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }
}

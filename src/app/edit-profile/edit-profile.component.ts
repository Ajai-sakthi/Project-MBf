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
  editProfileForm!: FormGroup;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.userId = currentUser.id;

      // Initialize the form with the current user's data
      this.editProfileForm = this.fb.group({
        name: [currentUser.name, Validators.required],
        email: [currentUser.email, Validators.required],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Phone number required
        address: ['', Validators.required], // Address required
        password: ['', Validators.required] // Password required
      });

      // Disable email field after form initialization
      this.editProfileForm.get('email')?.disable();
    }
  }

  onSubmit(): void {
    if (this.editProfileForm.valid && this.userId !== null) {
      const updatedData = {
        ...this.editProfileForm.getRawValue(),
        id: this.userId
      };

      this.authService.updateUser(updatedData).subscribe(
        response => {
          console.log('Profile updated successfully', response);
          this.router.navigate(['/profile']);
        },
        error => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }
}

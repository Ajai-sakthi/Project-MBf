// src/app/components/customComponents/sidebar/sidebar.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faHome, faEnvelope, faQuestionCircle, faInfoCircle, faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen: boolean = false; // Receive the sidebar state

  // Icon definitions
  faHome: IconDefinition = faHome;
  faEnvelope: IconDefinition = faEnvelope;
  faQuestionCircle: IconDefinition = faQuestionCircle;
  faInfoCircle: IconDefinition = faInfoCircle;
  faUserCircle: IconDefinition = faUserCircle;

  isProfileOpen: boolean = false;
  isAboutOpen: boolean = false;
  isHelpOpen: boolean = false;
  isContactOpen: boolean = false;

  constructor(private router: Router) {}

  // Toggle profile navigation
  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
    this.router.navigate(this.isProfileOpen ? ['/profile'] : ['/home']);
  }

  // Toggle About Us section
  toggleAbout() {
    this.isAboutOpen = !this.isAboutOpen;
    this.router.navigate(this.isAboutOpen ? ['/about-us'] : ['/home']);
  }

  // Toggle Help section
  toggleHelp() {
    this.isHelpOpen = !this.isHelpOpen;
    this.router.navigate(this.isHelpOpen ? ['/Help'] : ['/home']);
  }

  // Toggle Contact section
  toggleContact() {
    this.isContactOpen = !this.isContactOpen;
    this.router.navigate(this.isContactOpen ? ['/contact'] : ['/home']);
  }
}

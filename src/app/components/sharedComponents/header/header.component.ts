import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggle = new EventEmitter<void>(); // Emit event on toggle

  toggleSidebar() {
    this.toggle.emit(); // Emit the event
  }
}

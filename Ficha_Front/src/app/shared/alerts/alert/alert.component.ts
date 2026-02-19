import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

  @Input() alertType: string = ''; //los mismos tipos de Bootstrap 5.3
  @Input() alertMsg: string = '';
  @Input() titleMsg: string = '';
  @Input() iconType: string = '';
  @Input() iconName: string = '';
  @Input() iconVisible: string = 'n';

}

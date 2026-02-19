import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-btn-action',
  imports: [CommonModule, RouterModule],
  templateUrl: './btn-action.component.html',
  styleUrls: ['./btn-action.component.scss']
})
export class BtnActionComponent {

  @Input() btnSize: string = '';
  @Input() btnType: string = '';
  @Input() btnText: string = '';
  @Input() toggle: string = '';
  @Input() target: string = '';


}

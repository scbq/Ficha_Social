import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [CommonModule, RouterModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']

})
export class ButtonComponent implements OnInit {
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  @Input() text: string = '';
  @Input() btnType: string = '';
  @Input() btnColor: string = '';
  @Input() btnText: string = '';
  @Input() url: string = '';
  @Input() toggle: string = '';
  @Input() target: string = '';

}



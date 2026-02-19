import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-otp-card',
  imports: [CommonModule],
  templateUrl: './otp-card.component.html',
  styleUrl: './otp-card.component.scss',
})
export class OtpCardComponent {

  view: boolean = true;
  @ViewChild('otp') otp!: ElementRef;
  //Agregar @Input y @Output para su funcionamiento
  @Output() otpEmit = new EventEmitter<string>();
  enviarOtp(otp: HTMLInputElement) {
    this.otpEmit.emit(otp.value);
  }
  verPassword() {
    console.log(this.otp);
    this.otp.nativeElement.type =
      this.otp.nativeElement.type == 'text'
        ? (this.otp.nativeElement.type = 'password')
        : (this.otp.nativeElement.type = 'text');
  }

}

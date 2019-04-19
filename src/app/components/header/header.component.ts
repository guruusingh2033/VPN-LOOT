import { Component, OnInit, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
declare var System: any; 
import {ElectronService} from '../../providers/electron.service'
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap';
import { AuthService } from '../../service/authService';

// const rm = require('electron').remote
// import * as systemjs from 'systemjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('closewindow') public closeTemplate
  modalRef: BsModalRef;
  emailID: String;
  alertMessage: String;
  showRedBar :boolean;
  showBuyButton :boolean;
  @Output() statusAlert: EventEmitter<any> = new EventEmitter();

  constructor(public authService: AuthService,private modalService: BsModalService,private electronService : ElectronService) {
  }
  
  ngOnInit() {
    if (localStorage.getItem('currentUser')){

    this.emailID = JSON.parse(localStorage.getItem('currentUser')).email;
    this.authService
      .getSubscription({ email: this.emailID })
      .subscribe(
        data => {
          if (data.account_status){

          this.statusAlert.emit(data);
          
          switch (data.account_status)
          {
            case ('PAID'):
            this.showRedBar = false;
            break;
            
            case ('TRIAL'):
            this.alertMessage = "You're on a TRIAL account";
            this.showRedBar = true;
            this.showBuyButton = true;
            break;
            
            case ('TRIAL ENDED'):
            this.alertMessage = "Your TRIAL has ENDED";
            this.showRedBar = true;
            this.showBuyButton = true;
            break;
            
            case ('CLOSED'):
            this.alertMessage = "Your account is CLOSED";
            this.showRedBar = true;
            this.showBuyButton = true;
            break;
            
            case ('BANNED'):
            this.alertMessage = "Your account is BANNED";
            this.showRedBar = true;
            this.showBuyButton = false;
            break;
          }
          }

        },
        err => {
          this.alertMessage = "Something went wrong with server";
          this.showRedBar = true;
          this.showBuyButton = false;    
          }
      );
      }
  }

  openLink(mediaLink: any)
  {
    this.electronService.openMediaLinkOnBrowser(mediaLink);
  }

  auto()
  {
    this.electronService.launchWindow();
  }

  closeWindow()
  {
    this.electronService.closeWindow();
  }

  maximizeWindow()
  {
    this.electronService.maximizeWindow()
  }

  minimizeWindow()
  {
    this.electronService.minimizeWindow()
  }
  closeModal() {
    this.modalRef.hide();
  }

  confirmClose(){
    this.modalRef = this.modalService.show(this.closeTemplate);
  }
}

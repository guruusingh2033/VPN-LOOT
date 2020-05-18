import { Component, OnInit, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
declare var System: any; 
import {ElectronService} from '../../providers/electron.service'
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap';
import { AuthService } from '../../service/authService';
import * as io from "socket.io-client";


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
  updateInfo: object;
  showRedBar :boolean;
  showBlueBar :boolean;
  showBuyButton :boolean;
  socket = io('http://139.99.167.155:3000/loot'); 
  @Output() statusAlert: EventEmitter<any> = new EventEmitter();

  constructor(public authService: AuthService,private modalService: BsModalService,private electronService : ElectronService) {
  }
  
  ngOnInit() {
    this.socket.emit('update-request',{myappversion : '1.0'})
    this.socket.on('update', function (data) {
      let LatestVersion = parseFloat(data.version)
      if (LatestVersion > 1.0){
        this.showBlueBar = true;
        this.updateInfo = data;
        this.updateInfo.title = "Update of LootVPN is available";
      }
    }.bind(this));
    setInterval(function(){
      console.log("emittttting")
      this.socket.emit('update-request', { myappversion: '1.0' })
    }.bind(this),3600000)

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
            
            case ('CANCELLED'):
            this.alertMessage = "Your account is EXPIRED";
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
  hideBlueBar(){
    this.showBlueBar = false;
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

  // maximizeWindow()
  // {
  //   this.electronService.maximizeWindow()
  // }

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

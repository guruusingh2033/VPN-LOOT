import { Component, OnInit, TemplateRef ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {ElectronService} from "../../providers/electron.service"
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {CurrentUserService} from '../../service/currentUserService';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('logout') public logoutTemplate
  authForm: FormGroup;
  email = new FormControl('');
  password = new FormControl();
  modalRef: BsModalRef;
  emailID: String;
  connected:Boolean;
  disableConnectButton :boolean = true;
  showLoader: boolean = false;
  serverList:any
  selectedServer:any
  constructor(private toastr: ToastrService,public electronService: ElectronService, private route: ActivatedRoute, private router: Router, private modalService: BsModalService, private currentUserService: CurrentUserService) { 
    this.emailID = JSON.parse(localStorage.getItem('currentUser')).email;
    this.connected= false
    
  }

  ngOnInit() {
    this.electronService.getCertificates().then(res=>{
      this.serverList= res 
      this.selectedServer = this.serverList[0].location
      this.electronService.configureFile(this.selectedServer);
    },err=>{
      this.serverList= []; 

    })
    
  }

  getSubscription($event){
    console.log($event);
         switch ($event.account_status)
          {
            case ('PAID'):
            this.disableConnectButton = false;
            break;
            
            case ('TRIAL'):
            this.disableConnectButton = false;
            break;
            
            case ('TRIAL ENDED'):
            this.disableConnectButton = true;
            break;
            
           case ('CANCELLED'):
            this.disableConnectButton = true;
            break;
            
            case ('BANNED'):
            this.disableConnectButton = true;
            break;
          }



  }
  showSuccess(message,config) {
    this.toastr.success( "",message, config);
  }
  showError(message,config) {
    this.toastr.error("", message, config)
  }

  connect() {
    debugger;
    this.showLoader = true
    this.electronService.connect().then(res=>{
      if(res == true){
        this.connected = true
        let config = {
          positionClass: 'toast-bottom-right',
          timeOut: 6000
        }
        this.showSuccess('You are connected with ' + this.selectedServer, config)
      }
      else if (res == 'NOTADMIN'){
        let config = {
          positionClass: 'toast-bottom-right',
          timeOut: 6000
        }
        this.showError("Some error occured. Please make sure 'LootVPN' is running as 'Administrator'.", config)
      }
      else if (res == 'CERTIFICATE_ERROR'){
        let config = {
          positionClass: 'toast-bottom-right',
          timeOut: 6000
        }
        this.showError("Something went wrong with your 'VPN Certificate'.Please check and try again later", config)
      }
      else{
        this.connected = false
      }
      this.showLoader = false
      
    },err=>{
        this.connected = false
        this.showLoader = false

    });
  }
  disconnect() {
    debugger;
    this.showLoader = true
    this.electronService.kill().then(res=>{
      if(res == true){
        
        let config = {
          positionClass: 'toast-bottom-right',
          timeOut: 6000
        }
        this.showSuccess("You are Disconnected with "+this.selectedServer,config)
        
        this.connected = false
      }
      else {
        
        this.connected = true
      }
      this.showLoader = false

    },err=>{
        this.connected = true
        this.showLoader = false

    });
  }

  LogoutConfirmed(){
    
    this.electronService.quick_kill()
    this.electronService.writefile();
    this.currentUserService.purgeAuth();
    this.modalRef.hide()
    this.router.navigate(['/']);
  }
  Logout()
  {
      if (this.connected) {
        this.modalRef = this.modalService.show(this.logoutTemplate);

      }
      else{
        this.electronService.quick_kill()
        this.electronService.writefile();
        this.currentUserService.purgeAuth();
        this.router.navigate(['/']);
      }
  }
  
  openLink(mediaLink: any) {
    this.electronService.openMediaLinkOnBrowser(mediaLink);
  }

   openModal(template: TemplateRef<any>) {
     this.emailID = JSON.parse(localStorage.getItem('currentUser')).email;
    this.modalRef = this.modalService.show(template);
  }

 // Close Date Modal
  closeModal() {
    this.modalRef.hide();
  }



}

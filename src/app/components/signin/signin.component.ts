import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
 import {AuthService} from '../../service/authService';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectronService } from "../../providers/electron.service"

import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  authForm: FormGroup;
  modalRef: BsModalRef;
  Loginerror : any;
  ShowLoginError : boolean = false;
  showLoader : boolean = false;
  saveUser : Object = false;

  constructor(public electronService: ElectronService,public fb: FormBuilder, public authService: AuthService, private route: ActivatedRoute, private router: Router) { 
    this.authForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    // this.submitForm();
  }
  openLink(mediaLink: any) {
    this.electronService.openMediaLinkOnBrowser(mediaLink);
  }
  submitForm() {  
    // debugger;
    this.showLoader = true
    const credentials = this.authForm.value;
    this.authService
      .attemptAuth(credentials)
      .subscribe(
        data => {
          this.showLoader = false
          this.ShowLoginError = false;
          this.router.navigate(['/home']);
        },
        err => {
          this.showLoader = false
          this.Loginerror = "Email or Password is wrong"
          this.ShowLoginError = true;
        }
      );
   }
}



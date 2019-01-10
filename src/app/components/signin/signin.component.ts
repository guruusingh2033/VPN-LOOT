import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
 import {AuthService} from '../../service/authService';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(public fb: FormBuilder, public authService: AuthService, private route: ActivatedRoute, private router: Router) { 
    this.authForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    // this.submitForm();
  }
  
  submitForm() {  
    this.router.navigate(['/home']);
    // debugger;
    // const credentials = this.authForm.value;
    // this.authService
    //   .attemptAuth(credentials)
    //   .subscribe(
    //     data => {
    //       console.log(data);
    //     },
    //     err => {

    //     }
    //   );
   }

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }

  //Close Date Modal
  // closeModal() {
  //   this.modalRef.hide();
  // }
}



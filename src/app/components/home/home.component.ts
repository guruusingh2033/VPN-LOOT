import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {ElectronService} from "../../providers/electron.service"
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  authForm: FormGroup;
  email = new FormControl('');
  password = new FormControl();
  modalRef: BsModalRef;
 

  constructor(public electronService: ElectronService, private route: ActivatedRoute, private router: Router, private modalService: BsModalService) { 

  }

  ngOnInit() {
  }

  Logout()
  {
    // this.modalRef.hide();
    this.router.navigate(['/']);
  }
  
  openLink(mediaLink: any) {
    this.electronService.openMediaLinkOnBrowser(mediaLink);
  }

   openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

 // Close Date Modal
  closeModal() {
    this.modalRef.hide();
  }

}

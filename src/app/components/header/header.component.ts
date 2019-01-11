import { Component, OnInit } from '@angular/core';
declare var System: any; 
import {ElectronService} from '../../providers/electron.service'
// const rm = require('electron').remote
// import * as systemjs from 'systemjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private electronService : ElectronService) { }

  ngOnInit() {
     
  }

  openLink(mediaLink: any)
  {
    
    this.electronService.openMediaLinkOnBrowser(mediaLink);
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
}

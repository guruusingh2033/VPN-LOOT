import { Injectable } from '@angular/core';

import * as launch from 'auto-launch';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, shell } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as openvpn from 'node-openvpn';
import { exec, spawn } from 'child_process';
import * as ps from 'ps-tree';



@Injectable()
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  shell: typeof shell;
  fs: typeof fs;
  AutoLaunch: typeof launch;
  minecraftAutoLauncher: any;
  VPNService: typeof openvpn;
  openVPN: any;
  exec: typeof exec;
  spawn: typeof spawn;
  exec_path: typeof exec;
  ps: typeof ps;
  path: any;
  close_process: any;



  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.shell = window.require('electron').shell;
      this.AutoLaunch = window.require('auto-launch');
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.VPNService = window.require('node-openvpn');
      this.exec = window.require('child_process').exec;
      this.spawn = window.require('child_process').spawn;
      this.ps = window.require('ps-tree');
      this.close_process = window.require('child_process');

      console.log("----------------------------");
      console.log("----------------------------");

    }
  }
  createFile() {
    const route = this.remote.app.getPath('userData')
    console.log(route);
    var absolute_path = route
    this.fs.appendFile(absolute_path + '/' + 'config.ovpn', '', function (err) {
      if (err) throw err;
      console.log('Saved!');
    })

  }
  getCertificates() {
    return new Promise((resolve, reject) => {
      const certificates = JSON.parse(localStorage.getItem('currentUser')).certificates;
      if (certificates != undefined && certificates.length > 0) {

        resolve(certificates)
      }
      else {
        reject(new Error("Not available"))
      }
    })

  }
  configureFile(location) {
    const absolute_path = this.remote.app.getPath('userData')
    console.log('configure');
    const certificates = JSON.parse(localStorage.getItem('currentUser')).certificates;

    let australia_VPN = ""
    for (var i = 0; i < certificates.length; i++) {
      if (certificates[i].location == 'Australia(Sydney)') {
        australia_VPN = certificates[i].certificate
      }
    }
    this.fs.writeFile(absolute_path + '/' + 'config.ovpn', australia_VPN, function (err) {
      if (err) throw err;
      console.log('writtennnnnnn');
    });

    // this.fs.readFile(absolute_path + '/' + 'readhere.ovpn', function (err, data) {
    //   if (err) {
    //     return;
    //   }
    //   console.log(data);
    //   this.fs.writeFile(absolute_path + '/' + 'config.ovpn', data, function (err) {
    //     if (err) throw err;
    //     console.log('writtennnnnnn');
    //   });
    // }.bind(this))

  }


  quick_kill() {
    const ovpnProcess = this.exec('taskkill.exe /F /IM openvpn.exe');

  }
  kill() {
    return new Promise((resolve, reject) => {


      const ovpnProcess = this.exec('taskkill.exe /F /IM openvpn.exe');

      ovpnProcess.stdout.on('data', function (data) {
        resolve(true)
      });
      ovpnProcess.stderr.on('data', function (data) {
        reject(false)

      });

      ovpnProcess.on('close', function (code) {

        reject(true)
        console.log('closing code: ' + code);
      }.bind(this));
    })
  }

  connect() {
    return new Promise((resolve, reject) => {

      debugger
      this.exec('NET SESSION', function (err, so, se) {
        console.log(se.length === 0 ? "admin" : "not admin");
        if (se.length !== 0){
          resolve("NOTADMIN")
        }
        else{

      
      const absolute_path = this.remote.app.getPath('userData')

      const ovpnProcess = this.exec('openvpn ' + absolute_path + '/config.ovpn');

      var isConnected = false
      ovpnProcess.stdout.on('data', function (data) {
        console.log('absolute_path: ' + absolute_path);
        console.log('data: ' + data);
        if (data.indexOf('Initialization Sequence Completed') > -1) {

          console.log('yessssssss: ');

          isConnected = true
          resolve(isConnected)
        }
      
      }.bind(this));
      ovpnProcess.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
        isConnected = false
        reject(isConnected)

      });
      ovpnProcess.on('close', function (code) {
        console.log('closing code: ' + code);
        resolve(isConnected)
      }.bind(this));
        }

      }.bind(this));
    })
  }
  // connect() {
  //   debugger

  //   // this.exec.command
  //   // debugger;
  //   const ovpnProcess = this.exec('sudo openvpn /home/bytecode-mean/Desktop/VPN-LOOT/working/VPN-LOOT/VPN-LOOT/src/app/files/vpnbook-us1-tcp80.ovpn');

  //   ovpnProcess.stdout.on('data', function (data) {
  //     debugger;
  //     console.log('stdout: ' + data);
  //   });
  //   ovpnProcess.stderr.on('data', function (data) {
  //     console.log('stdout: ' + data);
  //   });
  //   ovpnProcess.on('close', function (code) {
  //     debugger;
  //     console.log('closing code: ' + code);
  //   });
  // }

  writefile() {
    const absolute_path = this.remote.app.getPath('userData')

    debugger;
    this.fs.writeFile(absolute_path + '/config.ovpn', ' ', function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }

  launchWindow() {
    const path = this.remote.app.getAppPath()
    console.log(path);

    var minecraftAutoLauncher = new this.AutoLaunch({
      name: this.remote.app.getName(),
    });

    console.log(minecraftAutoLauncher);
    minecraftAutoLauncher.enable();
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

  closeWindow() {
    this.kill().then(res => {
      this.remote.app.quit();
    },
      err => {
        this.remote.app.quit();
      })
  }

  openMediaLinkOnBrowser(mediaLink: any) {
    this.shell.openExternal(mediaLink);
  }

  maximizeWindow() {
    var window = this.remote.getCurrentWindow();
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  }

  minimizeWindow() {
    // this.remote.BrowserWindow.getFocusedWindow().minimize();
    var window = this.remote.BrowserWindow.getFocusedWindow();
    window.minimize();
  }
}

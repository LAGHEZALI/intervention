import { Component, OnInit } from '@angular/core';
import {UserInfoService} from '../../shared/services/user-info.service';

@Component({
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  sideBar = false;

  constructor(
    private userInfoService: UserInfoService
  ) { }

  ngOnInit() {
  }

  sideBarToggle() {
    if (!this.sideBar) {
      this.w3_open();
    } else {
      this.w3_close();
    }
    document.getElementById('op').classList.toggle('change');
    this.sideBar = !this.sideBar;
  }

  deco() {
    this.userInfoService.disconnect();
  }

  w3_open() {
    document.getElementById('main').style.marginLeft = '25%';
    document.getElementById('mySidebar').style.width = '25%';
    document.getElementById('mySidebar').style.display = 'block';
  }
  w3_close() {
    document.getElementById('main').style.marginLeft = '0%';
    document.getElementById('mySidebar').style.display = 'none';
  }
}

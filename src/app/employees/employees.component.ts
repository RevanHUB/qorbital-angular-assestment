import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppComponent } from '../app.component';
import axios from 'axios';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  config: any = [{}];
  employees: any = [];
  showModal: any = () => {};
  hideModal: any = () => {};
  setModal: any = () => {};
  onlineIcon : any = "<span class='material-icons'> wifi </span>"
  offlineIcon : any = "<span class='material-icons'> wifi_off </span>"
  constructor(
    private AppComponent: AppComponent
  ) {
    this.config = this.AppComponent.config;
    this.searchEmployees();
    this.setModal = this.AppComponent.setModal;
    this.showModal = this.AppComponent.showModal;
    this.hideModal = this.AppComponent.hideModal;
   
  }

  ngOnInit(): void {
    if (this.config.menuController.teamsBool === true) {
      let employeInterval = setInterval(() => {
        this.searchEmployees();
        if (this.config.menuController.teamsBool === false) {
          clearInterval(employeInterval)
        }
      }, 3000)
    }
    
}

  @Input() groupList: any = [{}];
  @Input() groupListObj: any = [{}];
  @Input() selectedGroup: any = 'QOrbital';
  @Input() members: any = '';

  searchEmployees() {
    var url = 'http://127.0.0.1:3001/checklistA';
    axios.get(url).then((response) => {
      this.employees[0] = response.data;
    });
  }
  public debuggingModal() {
    console.log(this.config.modalSelectedId)
  }
}

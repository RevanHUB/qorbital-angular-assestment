import { Component, Input, NgIterable, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppComponent } from '../app.component';
import { EmployeesComponent } from '../employees/employees.component';
import { SocketWebService } from '../socket-web.service';
import { map } from 'rxjs/operators';
import axios from 'axios';



@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit  {
  config : any = [];
  employees: any = [{}];
  tasks: any = [];
  online: any;
  searchPerId : any = [];
  showModal: any = () => {}
  setModal: any = () => {}
  sendMessage : any = () => {};
  refresh : any = () => {}; 
  log_local = this.SocketWebService.log_local;

  ticks = Date.now().valueOf();
  constructor(
    private route : ActivatedRoute, 
    private AppComponent : AppComponent, 
    private EmployeesComponent : EmployeesComponent,
    private SocketWebService : SocketWebService, 
    
    ) {
      this.config= this.AppComponent.config;
      this.showModal = this.AppComponent.showModal;
      this.setModal = this.AppComponent.setModal;
      this.employees = this.EmployeesComponent.employees;
      this.taskList(this.tasks);
      this.onlineUsers();
       
   }
   ngOnInit() {
        if (this.config.menuController.chatBool === true) {
          let taskInterval = setInterval(() => {
              this.taskList(this.tasks);
              this.onlineUsers();
              if (this.config.menuController.chatBool === false) {
                clearInterval(taskInterval)
              }
          }, 3000)
      };

    };

  public taskList = (tasks: Array<Object>) =>  {
    var url = "http://127.0.0.1:3001/tasks";
    axios.get(url)
    .then(response => {
      tasks[0] = response.data;
    })
  } 

  public findPerId = (id: Number) => {
    var url = "http://127.0.0.1:3001/employeePerId/" + id;
    axios.get(url)
    .then(response => {
      this.searchPerId.push(response.data)
      return response.data;
    })
  } 
  public onlineUsers() {
    var url = "http://127.0.0.1:3001/onlineInChat";
    axios.get(url)
    .then(response => {
      this.online = response.data;
      return response.data;
    })
  } 

  public clearChat(event : any) {
    event.value = ' ';
  }
  
  useNgxService(msg : String) {
    this.SocketWebService.emitMessage(msg, this.config.userLogged);
  }

}

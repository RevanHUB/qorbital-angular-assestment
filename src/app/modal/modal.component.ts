import { Component, Input, OnInit } from '@angular/core';
import { EmployeesComponent } from '../employees/employees.component';
import { MeetingComponent } from '../meeting/meeting.component';
import axios from 'axios';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  employees : any = [{}];
  // resetComponent : any = () => {}
  constructor(
    private EmployeesComponent : EmployeesComponent, 
    // private MeetingComponent : MeetingComponent 
  ) { 
    this.employees = this.EmployeesComponent.employees;
    // this.resetComponent = this.MeetingComponent.resetComponent;
  }

  ngOnInit(): void {
    
  }
  @Input() showModal : any = () => {} 
  @Input() hideModal : any = () => {} 
  @Input() config : any = [];
  @Input() checkLogin : any = () => {}
  @Input() addUser : any = () => {}
  @Input() addTask : any = () => {}
  @Input() selectedId : any = Number;

/* user changes */ 

  public deleteUser(id: Number) {
    var url = "http://127.0.0.1:3001/deleteUser/" + id;
    axios.get(url)
  }
  public usernameChanges(id: Number, username : String) {
    var url = "http://127.0.0.1:3001/changeUsername/" + id + "&"+ username;
    axios.get(url)
  }
  public passwordChanges(id: Number, password : String) {
    var url = "http://127.0.0.1:3001/changePassword/" + id + "&"+ password;
    axios.get(url)
  }
  public roleChanges(id: Number, role : String) {
    var url = "http://127.0.0.1:3001/changeRole/" + id + "&"+ role;
    axios.get(url)
  }
  public avatarChanges(id: Number, avatar : String) {
    var url = "http://127.0.0.1:3001/changeAvatar/" + id + "/"+ avatar;
    axios.get(url)
  }


  /* task changes */ 
  public deleteTask(id: Number) {
    var url = "http://127.0.0.1:3001/deleteTask/" + id;
    axios.get(url)
  }
  
  public taskStatusChange(id: Number, status : String) {
    var url = "http://127.0.0.1:3001/changeStatus/" + id + "&"+ status;
    axios.get(url)
  }
  public taskDescChange(id: Number, desc : String) {
    var url = "http://127.0.0.1:3001/changeDesc/" + id + "&"+ desc;
    axios.get(url)
  }
  public taskPriorityChange(id: Number, priority : any) {
    var url = "http://127.0.0.1:3001/changePriority/" + id + "&"+ priority;
    axios.get(url)
  }
  public taskDateChange(id: Number, date : any) {
    var url = "http://127.0.0.1:3001/changeDate/" + id + "&"+ date;
    axios.get(url)
  }
  public assignTask(id: Number, username : String, userId : any, avatar : String) {
    var url = "http://127.0.0.1:3000/assignToTask/" + id + "&"+ username + "&" + userId + "/" + avatar ;
    axios.get(url)
  }
  public clearAssignement(id: Number) {
    var url = "http://127.0.0.1:3000/clearAssignement/" + id;
    axios.get(url)
  }
  public debugIncluded () {
    console.log(this.config.tasks.assigned)
  }
  public changeToApplied (button : any, title : any) {
    console.log("changing")
    button.innerText = "Applied"
    title.innerText = "Applied changes"
    setTimeout(() => {
      button.innerText = "Skip";
      title.innerText = "Still doing changes?"
    }, 1000);
   
  }

}

import { Component, Input, OnInit,  } from '@angular/core';
import { SocketWebService } from '../socket-web.service';
import axios from 'axios';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {
  log_local = this.SocketWebService.log_local;
  constructor(private SocketWebService : SocketWebService) {}

  ngOnInit(): void {
  
      this.searchEmployees(this.employees);
      this.taskList(this.tasks);
 
    
  }
  

  
  @Input() config: any = [{}];
  @Input() employees: any = [{}];
  @Input() groupList: any = [{}];
  @Input() groupListObj: any = [{}];
  @Input() selectedGroup: any = 'QOrbital';
  @Input() members: any = '';
  @Input() tasks: any = [{}]
  @Input() showModal : any = () => {};
  @Input() hideModal : any = () => {};
  @Input() setModal : any = () => {};
  @Input() getMessage : any = () => {};
  @Input() sendMessage : any = () => {};
  @Input() navigationViews = {
    membersTable: true,
    groupsTable: false,
  }
  @Input() settingsController: any = {
      setAccountTab: true,
      setServerTab: false,
      setWebsiteTab: false,
      setHelpTab: false,
  }
  public setSelectedGroup(group: String ) {
    this.selectedGroup = group;
  }
  public navegationMembers() {
    this.navigationViews.membersTable = true;
    this.navigationViews.groupsTable = false;
    console.log(this.navigationViews.membersTable)
  }
  public navegationGroups() {
    this.navigationViews.membersTable = false;
    this.navigationViews.groupsTable = true;
    console.log(this.navigationViews.groupsTable)
  }
  
  searchEmployees(employees: any) {
    var url = "http://127.0.0.1:3001/checklistA";
    axios.get(url)
    .then(response => {
      // console.log(response)
      employees.push(response.data) ;
      return employees;
      // console.log(employees[1])
    })
  } 

  taskList(tasks: Array<Object>) {
    var url = "http://127.0.0.1:3001/tasks";
    axios.get(url)
    .then(response => {
      tasks.push(response.data)
      // console.log(tasks[1])
      console.log(tasks)
    })
  } 



  public checkOnline(creator : any){
    // let check = this.employees.find((user : any) => (user.username === creator && user.online === true));
    // console.log(check)
    // if (check != undefined ) {
    //   return true;
    // } else {
    //   return false;
    // }
  }


  

  public selectSettingAccount() {
      this.settingsController.setAccountTab = true;
      this.settingsController.setServerTab = false;
      this.settingsController.setWebsiteTab = false;
      this.settingsController.setHelpTab = false;
  }
  public selectSettingServer() {
    this.settingsController.setAccountTab = false;
    this.settingsController.setServerTab = true;
    this.settingsController.setWebsiteTab = false;
    this.settingsController.setHelpTab = false;
  }
  public selectSettingWebsite() {
    this.settingsController.setAccountTab = false;
    this.settingsController.setServerTab = false;
    this.settingsController.setWebsiteTab = true;
    this.settingsController.setHelpTab = false;
  }
  public selectSettingHelp() {
    this.settingsController.setAccountTab = false;
    this.settingsController.setServerTab = false;
    this.settingsController.setWebsiteTab = false;
    this.settingsController.setHelpTab = true;
  }
  public setUserLogged(user : any) {
    this.config.userLogged.id = user.id;
    this.config.userLogged.username = user.username;
    this.config.userLogged.online = true;
    this.config.userLogged.position = user.position;
    this.config.userLogged.group = user.group;  
  }

  // useNgxService(msg : String) {
  //   // this.ngxChatService.emitHello()
  //   this.SocketWebService.emitMessage(msg);
  //   console.log("Sending message: " + msg)
  // }
  // checkInput(event : any) {
  //   console.log(event)
  // }

  
}
 




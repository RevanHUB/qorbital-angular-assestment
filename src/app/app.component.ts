import { Component, Input, ViewChild } from '@angular/core';
import axios from 'axios';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  

  constructor() {};

  ngOnInit(): void {
    this.tab = false;
    this.sendMessage("test")
    this.title = "empleados";
    this.config = {
      theme: {
        light: true,
        applyChange: 0,
      },
      menuController: {
        teamsBool: false,
        chatBool: true,
        settingsBool: false,
        loadingBool: false,
      }, 
      landingController: {
        homeBool: true,
        aboutBool: false,
        contactBool: false,
      }, 
      active: {
        active: 'Teams'
      },
      activeInLanding: {
        active: 'Home'
      },
      settings : {
        deleteServer: false,
      },
      userLogged: {
        id: null,
        username: null,
        avatar: null,
        online: false,
        position: 'Visitor',
        group: null
      },
      employees: {
        selected: 99,
        refresh: false
      },
      tasks: {
        selected: 99,
        assigned: [],
        refresh: false
      },
      modal: true,
      modalClass: 'login',
      modalSelectedId: Number,
    }
    
    this.menu = [
      {showName: "Teams", action: ''},
      {showName: "Meeting", action: ''},
    ]
    
  }

  //variables //

  @Input() tab : any = Boolean;
  @Input() title : any =  String;
  @Input() config : any = {}
  @Input() menu : any = []
  @Input() landingMenu : any = []
  @Input() sendMessage : any = () => {};
  @Input() getMessage : any = () => {};

  // functions //
  public changeTheme() {
    this.config.theme.applyChange++;
    if (this.config.theme.applyChange % 2 == 0) {
      this.config.theme.light = false;
    } else {
      this.config.theme.light = true;
    }
  }
  
  public checkLogin(username: any, password: any) {
    var url = "http://localhost:3001/checklogin/" + username +"&" + password;
    axios.get(url)
    .then(response => {
      if(response.data.id != undefined)
      {
        this.config.userLogged.id = response.data.id;
        this.config.userLogged.username = response.data.username;
        this.config.userLogged.avatar = response.data.avatar;
        this.config.userLogged.online = true;
        this.config.userLogged.position = response.data.position;
        this.config.userLogged.group = response.data.group;
        this.hideModal()
      } 
 
  } ) }
  
  public logout(username: any, id: any) {
    var url = "http://localhost:3001/offline/" + username +"&" + id;
    axios.get(url)
    .then(response => {
      if(response.data.id != undefined)
      {
        this.config.userLogged.id = null;
        this.config.userLogged.username = null;
        this.config.userLogged.avatar = null;
        this.config.userLogged.online = false;
        this.config.userLogged.position = null;
        this.config.userLogged.group = null;
        this.hideModal()
      } else {
        console.log("Salida de no result")
      }
 
  } ) }

  public addUser(username: String, password: String, position: String, group: String) {
    var url = "http://127.0.0.1:3001/createuser/" + username + "&" + password + "&"+ position + "&" + group;
    axios.get(url)
    .then(response => {
      console.log("Introduced user")
    })
  } 
  public addTask(title: String, desc: String, creator: String, priority: Number, Date: any) {
    var url = "http://127.0.0.1:3001/createtask/" + title + "&" + desc + "&"+ creator +"&" + Date + "&"+ priority + "&QOrbital";
    axios.get(url)
    .then(response => {
      console.log("Introduced task")
    })
  
  } 

  /* modals */ 
  public hideModal() {
    this.config.modal = false;
  }
  public showModal() {
    this.config.modal = true;
  }
  public setModal(value : any) {
    this.config.modalClass = value;
  }

  // refresh options 

}

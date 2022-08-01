import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {}
  @Input() tab : any = Boolean;
  @Input() title : any =  String;
  @Input() config : any = {}
  @Input() menu : any = []
  @Input() landingMenu : any = []
  @Input() showModal : any = () => {}  
  @Input() setModal : any = () => {}  
  @Input() logout : any = () => {}  
  @Input() changeTheme : any = () => {}
 

  public teams() {
    this.config.menuController.loadingBool = true;
    this.config.menuController.teamsBool = true;
    this.config.menuController.settingsBool = false;
    this.config.menuController.chatBool = false;
    
    setInterval(() => {
      this.config.menuController.loadingBool = false;
    }, 1200)

    // styles 

    this.config.active = this.config.menuController.teamsBool;
    document.getElementById('Teams')?.classList.add('actived_button');
  }
  public settings() {

    setInterval(() => {
      this.config.menuController.loadingBool = false;
    }, 1200)

    // styles // 

    this.config.active = this.config.menuController.settingsBool;
    document.getElementById('Settings')?.classList.add('actived_button');
  }
  public chat() {
    this.config.menuController.loadingBool = true;
    this.config.menuController.chatBool = true;
    this.config.menuController.settingsBool = false;
    this.config.menuController.teamsBool = false;

    setInterval(() => {
      this.config.menuController.loadingBool = false;
    }, 1200)

    // styles // 

    this.config.active = this.config.menuController.chatBool;
    document.getElementById('Meeting')?.classList.add('actived_button');
  }

  public Home() {


    setInterval(() => {
      this.config.menuController.loadingBool = false;
    }, 1200)

    // styles // 

    this.config.activeInLanding = this.config.menuController.chatBool;
    document.getElementById('Home')?.classList.add('actived_button');
  }
  public About() {

    setInterval(() => {
      this.config.menuController.loadingBool = false;
    }, 1200)

    // styles // 

    this.config.activeInLanding = this.config.menuController.chatBool;
    document.getElementById('About Us')?.classList.add('actived_button');
  }

  public Contact() {


    setInterval(() => {
      this.config.menuController.loadingBool = false;
    }, 1200)

    // styles // 

    this.config.activeInLanding = this.config.menuController.chatBool;
    document.getElementById('Contact')?.classList.add('actived_button');
  }



  public void(voideable : any) {
    document.getElementById(voideable)?.classList.remove('actived_button');
  }

  public signOut() {
    this.config.userLogged.id = null;
    this.config.userLogged.username = null;
    this.config.userLogged.position = null;
    this.config.userLogged.avatar = null;
    this.config.userLogged.online = false;
    this.config.userLogged.group = null;
  }
  public goToLanding() {
    window.location.assign('127.0.0.1:4200/landing')
  }

}

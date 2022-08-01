import { Injectable, Input, OnInit } from '@angular/core';
import  SocketClient  from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketWebService implements OnInit {

  constructor() { 
    this.emitHello();
    this.io.on('distribution', (value : any) => {

        (this.io.id === value.id )? "local" : "remoto";

        if (this.io.id === value.id) {
          this.log_local.push({
            value: value.value,
            id: "local",
            userCreator: value.userCreator,
            userAvatar: value.userAvatar,
            time: value.time
          });
        } else {
          this.log_local.push({
            value: value.value,
            id: "remote",
            userCreator: value.userCreator,
            userAvatar: value.userAvatar,
            time: value.time
          });
        }

    })
    this.io.on('updateRequest', (value : any) => {

      
    })
  }

@Input() io = SocketClient('http://localhost:3000', {
  autoConnect: true
})
@Input() log_local : any = [];
  public emitHello = () => {
    this.io.emit('test')
  }
  public emitMessage = (msg : String, user : any) => {
    // console.log(user)
    this.io.emit('message', {
      msg,
      user
    })
  }

  ngOnInit(): void {
  
  }

}

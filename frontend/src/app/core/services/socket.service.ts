import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket : Socket) { }

  public sendMessage(message : string) {
    this.socket.emit('message', message);
  }

  public getMessage(): any {
    return this.socket.on('message', (data: any) => {
      return data;
    });
  }

}

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client/dist/socket.io';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket
  constructor(public fs: AngularFirestore) { 
    
    this.socket = io('http://localhost:3000');
  }
   Draw(data){
    this.socket.emit('draw',data)
  }

}

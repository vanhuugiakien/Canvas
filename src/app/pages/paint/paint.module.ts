import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaintRoutingModule } from './paint-routing.module';
import { PaintComponent } from './paint.component';
import { Shape } from './models/Shape.model';
import {AngularFireModule} from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SocketService } from './services/socket.service';


@NgModule({
  declarations: [PaintComponent],
  imports: [
    CommonModule,
    PaintRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyApFUw785jJLtxhfHny81Y2zyRq0ZviecM",
      authDomain: "logindemo-9d736.firebaseapp.com",
      databaseURL: "https://logindemo-9d736.firebaseio.com",
      projectId: "logindemo-9d736",
      storageBucket: "logindemo-9d736.appspot.com",
      messagingSenderId: "1044895162795",
      appId: "1:1044895162795:web:57d1a616e055fc2c23b2ee",
      measurementId: "G-ZF3KJHPQ2Y"
    }),
    AngularFirestoreModule,
    
  ],
  providers:[SocketService]
})
export class PaintModule { }

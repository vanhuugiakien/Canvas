import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';
import { FabricModule } from 'ngx-fabric-wrapper';
import { FABRIC_CONFIG } from 'ngx-fabric-wrapper';
import { FabricConfigInterface } from 'ngx-fabric-wrapper';
const DEFAULT_FABRIC_CONFIG: FabricConfigInterface = {};
@NgModule({
  declarations: [NewComponent],
  imports: [CommonModule, NewRoutingModule, FabricModule],
  providers: [
    {
      provide: FABRIC_CONFIG,
      useValue: DEFAULT_FABRIC_CONFIG,
    },
  ],
})
export class NewModule {}

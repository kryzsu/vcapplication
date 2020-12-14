import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VcApplicationSharedModule } from 'app/shared/shared.module';
import { MachineComponent } from './machine.component';
import { MachineDetailComponent } from './machine-detail.component';
import { MachineUpdateComponent } from './machine-update.component';
import { MachineDeleteDialogComponent } from './machine-delete-dialog.component';
import { machineRoute } from './machine.route';

@NgModule({
  imports: [VcApplicationSharedModule, RouterModule.forChild(machineRoute)],
  declarations: [MachineComponent, MachineDetailComponent, MachineUpdateComponent, MachineDeleteDialogComponent],
  entryComponents: [MachineDeleteDialogComponent],
})
export class VcApplicationMachineModule {}

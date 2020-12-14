import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'machine',
        loadChildren: () => import('./machine/machine.module').then(m => m.VcApplicationMachineModule),
      },
      {
        path: 'job',
        loadChildren: () => import('./job/job.module').then(m => m.VcApplicationJobModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class VcApplicationEntityModule {}

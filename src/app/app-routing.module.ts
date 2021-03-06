import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cv',
    loadChildren: () =>
      import('./pages/canvas/canvas.module').then((m) => m.CanvasModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/paint/paint.module').then((m) => m.PaintModule),
  },
  { path: 'new', loadChildren: () => import('./pages/new/new.module').then(m => m.NewModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

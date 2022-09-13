import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './shared/content/content.component';
import { content } from "./shared/router/content-router";

const routes: Routes = [

  {
    path: '',
    redirectTo: '/pagina/client',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentComponent,
    children: content
  },

  {
    path: '**',
    redirectTo: '/pagina/product'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],//relativeLinkResolution legacy
  exports: [RouterModule]
})
export class AppRoutingModule { }

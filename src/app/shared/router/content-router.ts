import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'pagina',
    loadChildren: () => import('../../components/pagina/pagina.module').then(m => m.PaginaModule)
  },

  {
    path: 'auth',
    loadChildren: () => import('../../components/pagina/pagina.module').then(m => m.PaginaModule)
  },

];

import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CrisisListComponent} from './crisis-list.component';
import {PageNotFoundComponent} from './not-found.component';

const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
      {enableTracing: true} // debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}

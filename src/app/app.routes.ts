import { Routes } from '@angular/router';
import { ManVsManComponent } from './components/man-vs-man/man-vs-man.component';
import { ManVsMachineComponent } from './components/man-vs-machine/man-vs-machine.component';




export const ROUTES: Routes = [
    { path: 'manvsman', component: ManVsManComponent },
    { path: 'manvsmachine', component: ManVsMachineComponent }
];

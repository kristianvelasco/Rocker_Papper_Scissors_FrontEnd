import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ManVsManComponent } from './components/man-vs-man/man-vs-man.component';
import { ManVsMachineComponent } from './components/man-vs-machine/man-vs-machine.component';
import { GlobalResultsComponent } from './components/global-results/global-results.component';

// Importar rutas
import { ROUTES } from './app.routes';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    ManVsManComponent,
    ManVsMachineComponent,
    GlobalResultsComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot( ROUTES, { useHash: true } )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

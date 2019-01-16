import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SingleWordComponent } from './word/single-word/single-word.component';
import { ListWordComponent } from './word/list-word/list-word.component';
import { LastAddWordComponent } from './word/last-add-word/last-add-word.component';
import {RouterModule, Routes} from '@angular/router';
import {WordService} from './services/word.service';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { SearchComponent } from './search/search.component';
import {LoaderComponent} from './loader/loader.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'words', component: ListWordComponent },
    { path: 'words/:id', component: SingleWordComponent },
    { path: 'auth', component: AuthComponent },
    { path: '**', redirectTo: 'home' },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SingleWordComponent,
    ListWordComponent,
    LastAddWordComponent,
    SearchComponent,
    LoaderComponent,
    FooterComponent,
    HomeComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [WordService],
  bootstrap: [AppComponent]
})
export class AppModule { }

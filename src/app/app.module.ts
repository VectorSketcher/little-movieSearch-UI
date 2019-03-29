import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MovieServiceService } from '../../src/app/services/movie-service.service';
import { MovieListComponent } from './movie-list/movie-list.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FilterPipe } from '../app/filters/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    FooterComponent,
    HeaderComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [HttpClientModule, HttpClient, MovieServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

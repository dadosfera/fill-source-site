import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbAutocompleteModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTagModule,
  NbToastrModule,
  NbToggleModule,
  NbTooltipModule,
  NbActionsModule,
  NbListModule,
} from '@beast/theme';
import { NbEvaIconsModule } from '@beast/eva-icons';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    // Nebular
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbToastrModule.forRoot(),
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbSpinnerModule,
    NbCardModule,
    NbTooltipModule,
    NbFormFieldModule,
    NbBadgeModule,
    NbTagModule,
    NbAutocompleteModule,
    NbSelectModule,
    NbCheckboxModule,
    NbTabsetModule,
    NbToggleModule,
    NbActionsModule,
    NbListModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

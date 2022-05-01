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
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { DisplayNamePipe } from './pipes/display-name/display-name.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CredentialsViewComponent } from './components/credentials-view/credentials-view.component';
import { SourceListItemComponent } from './components/source-list-item/source-list-item.component';
import { HelloUserComponent } from './components/hello-user/hello-user.component';
import { NoDataComponent } from './components/no-data/no-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreateComponent,
    EditComponent,
    DisplayNamePipe,
    CredentialsViewComponent,
    SourceListItemComponent,
    HelloUserComponent,
    NoDataComponent,
  ],
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

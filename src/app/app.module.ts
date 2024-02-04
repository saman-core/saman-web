import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { DataBaseModule } from '@saman-core/data';
import { JwtInterceptor } from './oidc/interceptor/jwt.interceptor';
import { OidcService } from './oidc/oidc.service';

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
    HttpClientModule,
    DataBaseModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8080'],
        sendAccessToken: true,
      },
    }),
  ],
  providers: [
    OidcService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    IconSetService,
    Title,
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true,
      },
    ],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

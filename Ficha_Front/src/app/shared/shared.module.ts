import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AlertComponent } from './alerts/alert/alert.component';
import { RoundedBadgeComponent } from './badges/rounded-badge/rounded-badge.component';
import { FirmanteCardComponent } from './cards/firmante-card/firmante-card.component';
import { HomeCardComponent } from './cards/home-card/home-card.component';
import { OtpCardComponent } from './cards/otp-card/otp-card.component';
import { DocIframeComponent } from './iframes/doc-iframe/doc-iframe.component';
//import { PaginationComponent} from ' ./pagination/pagination.component';
import { PrevisualizarDocComponent } from './previsualizar-doc/previsualizar-doc.component';
import { SearcherTableComponent } from './searcher-table/searcher-table.component';
import { StepperComponent } from './stepper/stepper.component';
import { TableComponent } from './tables/table/table.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ButtonComponent } from './buttons/button/button.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  imports: [
    AlertComponent,
    RoundedBadgeComponent,
    FirmanteCardComponent,
    HomeCardComponent,
    OtpCardComponent,
    DocIframeComponent,
    PaginationComponent,
    PrevisualizarDocComponent,
    SearcherTableComponent,
    StepperComponent,
    TableComponent,
    TimelineComponent,
    TooltipComponent,
    ButtonComponent,
    NavbarComponent
  ],

  exports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    AlertComponent,
    RoundedBadgeComponent,
    FirmanteCardComponent,
    HomeCardComponent,
    OtpCardComponent,
    DocIframeComponent,
    PaginationComponent,
    PrevisualizarDocComponent,
    SearcherTableComponent,
    StepperComponent,
    TableComponent,
    TimelineComponent,
    TooltipComponent,
    ButtonComponent,
    NavbarComponent

  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})


export class SharedModule { }

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagingHeaderComponent } from './Components/paging-header/paging-header.component';
import { PagerComponent } from './Components/pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './Components/order-totals/order-totals.component'
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './Components/text-input/text-input.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './Components/stepper/stepper.component';
import { BasketSummeryComponent } from './Components/basket-summery/basket-summery.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    BasketSummeryComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    CdkStepperModule,
    RouterModule
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    CdkStepperModule,
    StepperComponent,
    BasketSummeryComponent
  ]
})
export class SharedModule { }

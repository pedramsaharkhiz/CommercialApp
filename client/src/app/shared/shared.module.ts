import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
    ],
  exports:[PaginationModule]
})
export class SharedModule { }

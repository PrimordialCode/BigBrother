import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatGridListModule,
  MatDividerModule,
  MatListModule,
  MatSidenavModule,
  MatTreeModule,
  MatTabsModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    MatTreeModule,
    MatTabsModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    MatTreeModule,
    MatTabsModule,
    MatTableModule
  ]
})
export class MaterialModule { }

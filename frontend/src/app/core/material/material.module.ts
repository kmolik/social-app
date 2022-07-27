import { NgModule } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";

const material = [
  MatButtonModule,
  MatDialogModule
]

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }

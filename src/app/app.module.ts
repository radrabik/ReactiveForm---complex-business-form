import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CreateCourseComponent } from './create-course/create-course.component';

import { CreateCourseStep1Component } from './create-course/create-course-step-1/create-course-step-1.component';
import { CreateCourseStep2Component } from './create-course/create-course-step-2/create-course-step-2.component';
import { CreateCourseStep3Component } from './create-course/create-course-step-3/create-course-step-3.component';

import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule, 
    BrowserAnimationsModule, 
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  declarations: [ 
    AppComponent, 
    HelloComponent, 
    CreateCourseComponent,
    CreateCourseStep1Component,
    CreateCourseStep2Component,
    CreateCourseStep3Component 
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

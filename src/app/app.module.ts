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
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CoursesService } from './services/courses.service';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule, 
    BrowserAnimationsModule, 
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    HttpClientModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule
    
  ],
  declarations: [ 
    AppComponent, 
    HelloComponent, 
    CreateCourseComponent,
    CreateCourseStep1Component,
    CreateCourseStep2Component,
    CreateCourseStep3Component,
    FileUploadComponent
  ],
  providers: [CoursesService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

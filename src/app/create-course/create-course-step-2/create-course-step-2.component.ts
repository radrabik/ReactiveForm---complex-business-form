import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-course-step-2',
  templateUrl: './create-course-step-2.component.html',
  styleUrls: ['./create-course-step-2.component.css']
})
export class CreateCourseStep2Component implements OnInit {

  form = this.fb.group({

  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
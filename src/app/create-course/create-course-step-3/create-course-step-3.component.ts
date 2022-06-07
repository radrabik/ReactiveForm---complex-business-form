import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-course-step-3',
  templateUrl: './create-course-step-3.component.html',
  styleUrls: ['./create-course-step-3.component.css']
})
export class CreateCourseStep3Component implements OnInit {

  form = this.fb.group({
    lessons: this.fb.array([])

  });

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
  }

}
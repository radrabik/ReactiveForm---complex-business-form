import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-course-step-2',
  templateUrl: './create-course-step-2.component.html',
  styleUrls: ['./create-course-step-2.component.css']
})
export class CreateCourseStep2Component implements OnInit {

  form = this.fb.group({
    courseType: ['premium', Validators.required],
    price: [null, {
      validators: [Validators.required, Validators.min(1), Validators.max(9999), Validators.pattern("[0-9]+") ]
    }]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
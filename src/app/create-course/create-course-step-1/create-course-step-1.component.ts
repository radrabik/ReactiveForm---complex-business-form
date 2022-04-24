import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { coursetitleValidator } from '../../validators/course-title.validator';

@Component({
  selector: 'app-create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.css']
})
export class CreateCourseStep1Component implements OnInit {

  form = this.fb.group({
    title: ['', {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(60)],
        // Asynchronous validator (backend call to check if course with the same title exists)
        // ValidatorFN expects the instance of backend service
        asyncValidators: [coursetitleValidator(this.courses)]
      }
   ],
   releasedAt: [new Date(), Validators.required],
   downloadsAllowed: [false, Validators.requiredTrue],
   longDescription: ['', Validators.required, Validators.minLength(3)]
  });

  constructor(private fb: FormBuilder, private courses:CoursesService) { }

  ngOnInit() {
  }

  get courseTitle() {
    return this.form.controls['title'];
  }

}
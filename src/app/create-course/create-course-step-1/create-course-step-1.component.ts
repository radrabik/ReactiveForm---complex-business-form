import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { coursetitleValidator } from '../../validators/course-title.validator';

interface CourseCategory {
  code: string;
  description: string;
}

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
            asyncValidators: []
          }
      ],
      releasedAt: [new Date(), {
        validators: [Validators.required]
        },
      ],
      category: ['BEGINNER', Validators.required],
      downloadsAllowed: [false, {
        validators: [Validators.required]
        },
      ],
      longDescription: ['', {
          validators: [Validators.required, Validators.minLength(3)]
          }
      ]
   
  });

  courseCategories$ : Observable<CourseCategory[]>;

  constructor(private fb: FormBuilder, private courses:CoursesService) { }

  ngOnInit() {
    this.courseCategories$ = this.courses.findCourseCategories();
  }

  get courseTitle() {
    return this.form.controls['title'];
  }

}
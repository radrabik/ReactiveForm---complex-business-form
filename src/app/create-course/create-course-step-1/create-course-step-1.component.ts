import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
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


    // if cached draft of form exists in local storage => prepopulate all fields
    const draft = localStorage.getItem("STEP_1");
    if(draft) {
      this.form.setValue(JSON.parse(draft));
    }

    // save form field into local storage if values are valid
    this.form.valueChanges
    .pipe(
      // filter the changes which are not valid using .pipe
      // only when inputs are valid we will save them
      filter(()=> this.form.valid)
    )
    .subscribe( val => {
      localStorage.setItem("STEP_1", JSON.stringify(val))
    });
  }

  get courseTitle() {
    return this.form.controls['title'];
  }

}
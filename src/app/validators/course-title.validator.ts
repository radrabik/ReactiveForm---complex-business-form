import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import {map} from 'rxjs/operators';

// This validator function return a function - AsyncValidatorFN
// Input: for validator: instance of backend course service
export function coursetitleValidator(courses: CoursesService ): AsyncValidatorFn {

  // function takes AbstractControl as input
  // returning Promise or Observable (because it is Async) instead of plain value as in Sychronous
  return (control: AbstractControl) => {
    return courses.findAllCourses()
        .pipe(
            map(courses => {

                // Get all courses from backend and check if there is a course with the same title
                const course = courses.find(
                    course => course.description.toLowerCase()
                        == control.value.toLowerCase() );

                // If course with the same title exists return "titleExists: true", if not "null"
                return course ? {titleExists:true} : null;

            })
        )

}

}
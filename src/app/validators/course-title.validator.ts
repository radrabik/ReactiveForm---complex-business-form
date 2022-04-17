import { AsyncValidatorFn } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import {map} from 'rxjs/operators';

// This validator function return a function - AsyncValidatorFN
export function coursetitleValidator(courses: CoursesService ): AsyncValidatorFn {

  // function takes AbstractControl as input
  // returning Promise or Observable (because it is Async)
  return (control: AbstractControl) => {
    return courses.findAllCourses()
        .pipe(
            map(courses => {

                const course = courses.find(
                    course => course.description.toLowerCase()
                        == control.value.toLowerCase() );

                return course ? {titleExists:true} : null;

            })
        )

}

}
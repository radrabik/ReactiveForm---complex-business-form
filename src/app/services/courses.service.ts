import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Course, CourseCategory } from '../model/course';
import { map } from 'rxjs/operators';
import { Lesson } from '../model/lesson';

const localUrl = 'assets/categories.json';

const listCategories = [
  { code: 'BEGINNER', description: 'Beginner' },
  { code: 'INTERMEDIATE', description: 'Intermediate' },
  { code: 'ADVANCED', description: 'Advanced' },
];

@Injectable()
export class CoursesService {
  constructor(private http: HttpClient) {}

  findCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${courseId}`);
  }

  findCourseCategories(): Observable<CourseCategory[]> {
    return of(listCategories);
  }

  findAllCourses(): Observable<Course[]> {
    return this.http.get('/api/courses').pipe(map((res) => res['payload']));
  }

  findAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return this.http
      .get('/api/lessons', {
        params: new HttpParams()
          .set('courseId', courseId.toString())
          .set('pageNumber', '0')
          .set('pageSize', '1000'),
      })
      .pipe(map((res) => res['payload']));
  }

  findLessons(
    courseId: number,
    filter = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3
  ): Observable<Lesson[]> {
    return this.http
      .get('/api/lessons', {
        params: new HttpParams()
          .set('courseId', courseId.toString())
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString()),
      })
      .pipe(map((res) => res['payload']));
  }
}

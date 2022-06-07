import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  submit(step1, step2, step3) {
    console.log(typeof(step1), step2, step3)

  }

}
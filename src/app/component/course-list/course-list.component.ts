import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CourseServiceService } from 'src/app/services/course-service.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  filteredCourses$:Observable<Course[]> = of([]);
  courses$:Observable<Course[]> = of([]);

  constructor(private courseService: CourseServiceService, private router:Router) {

  }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courses$ = this.courseService.getCourses();
    this.filteredCourses$ = this.courses$
    .pipe(map((courses) => {
      return courses.sort((a: Course, b: Course) => a.courseName.localeCompare(b.courseName))
    }));
  }

  searchCourses(event: any): void {
    const searchTerm = event.target.value;
    if(!searchTerm) {
      this.filteredCourses$ = this.courses$;
    }

    this.filteredCourses$ = this.courses$
    .pipe(map((courses)=> {
      return courses.filter((course)=> {
        course.id.toString().includes(searchTerm) || course.courseName.toString().includes(searchTerm)
      })
    }));
  }

  deleteCourse(id: any) {
    this.courseService.deleteCourse(id).subscribe((data)=> {
      this.router.navigate(['/view']);
    })
  }
}

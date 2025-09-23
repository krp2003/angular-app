import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CourseServiceService } from 'src/app/services/course-service.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courses$:Observable<Course[]> = of([]);

  constructor(private courseService: CourseServiceService, private route:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(para => {
      const id = para['id'];
      this.getCourse(id);
    })
  }
  

  getCourse(id: any): void {
    this.courseService.getCourse(id).subscribe(data => {
      this.courses$ = of(data);
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {
  apiUrl = 'https://ec2-13-204-71-72.projects.wecreateproblems.com/proxy/3000/courses';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getCourse(id: any): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((data)=> {
        if(Array.isArray(data)) {
          return data;
        } else {
          return [data];
        }
      })
    )
  }

  updateCourse(id: any, course: Course) {
    return this.http.put(`${this.apiUrl}/${id}`, course);
  }

  addCourse(course: Course): Observable<any> {
    return this.http.post(`${this.apiUrl}`, course);
  }

  deleteCourse(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

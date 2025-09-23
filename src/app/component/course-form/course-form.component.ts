import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseServiceService } from 'src/app/services/course-service.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  courseForm!:FormGroup;
  courseStatus = ['Draft', 'Published', 'Archived', 'Retired'];
  idVal!:any;
  success:boolean = false;
  
  constructor(private fb: FormBuilder, private router: Router, private courseService: CourseServiceService, private ar: ActivatedRoute) { }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      courseName: ['', [Validators.required]],
      enrollmentCount: ['', [Validators.required, Validators.min(1)]],
      status: [this.courseStatus[0]],
      publishDate: ['', [Validators.required, this.dateValidator]],
      category: ['', [Validators.required]]
    })
    
    this.ar.params.subscribe(para => {
      if(para['id']) {
        this.idVal = para['id'];
        this.courseService.getCourse(this.idVal).subscribe((data)=> {
          var oldCourse = data[0];
          this.courseForm.patchValue({
            courseName: oldCourse.courseName,
            enrollmentCount: oldCourse.enrollmentCount,
            status: oldCourse.status,
            publishDate: oldCourse.publishDate,
            category: oldCourse.category,
            id: oldCourse.id
          });
        })
      }
    })
  }

  dateValidator(control: FormControl): ValidationErrors | null {
    const datePa = /^\\d{4}-\\d{2}-\\d{2}$/;
    if(datePa.test(control.value)) {
      return {invalidDate: true};
    }
    return null;
  }

  onSubmit(): void {
    if(this.courseForm.valid) {
      if(this.idVal) {
        this.courseService.updateCourse(this.idVal, this.courseForm.value).subscribe((data)=> {
          this.success = true;
          this.router.navigate(['/view']);
          this.courseForm.reset();
        })
      } else {
          this.courseService.addCourse(this.courseForm.value).subscribe((data) => {
            this.success = true;
            this.router.navigate(['/view']);
            this.courseForm.reset();
          })
      }
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    formGroup.get('')?.touched;
  }
}


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent } from './component/course-form/course-form.component';
import { CourseListComponent } from './component/course-list/course-list.component';
import { CourseDetailsComponent } from './component/course-details/course-details.component';

const routes: Routes = [
  {path: 'add', component: CourseFormComponent},
  {path: 'view', component: CourseListComponent},
  {path: 'view/:id', component: CourseDetailsComponent},
  {path: 'update/:id', component: CourseFormComponent},
  {path: 'delete/:id', component: CourseListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

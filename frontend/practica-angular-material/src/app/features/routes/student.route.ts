import {Routes} from '@angular/router';
import { StudentListComponent } from '../pages/student-list-component/student-list-component';
import { StudentDetailComponent } from '../pages/student-detail-component/student-detail-component';

export const studentsRoutes: Routes = [
    { path: '', component: StudentListComponent },
    { path: ':id', component: StudentDetailComponent },
]
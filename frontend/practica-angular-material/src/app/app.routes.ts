import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'students', pathMatch: 'full' },
    { 
        path: 'students',
        loadChildren: () =>
            import('./features/routes/student.route').then(m => m.studentsRoutes)
    },
    { 
        path: 'courses',
        loadChildren: () =>
            import('./features/routes/course.route').then(m => m.coursesRoutes)
    },
    { path: '**', redirectTo: 'students' }
];

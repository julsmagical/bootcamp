import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { 
        path: 'home',
        loadChildren: () =>
            import('./features/routes/home.route').then(m => m.homeRoutes)
    },
    { 
        path: 'recipes',
        loadChildren: () =>
            import('./features/routes/recipe.route').then(m => m.recipeRoutes)
    },
    { 
        path: 'chefs',
        loadChildren: () =>
            import('./features/routes/chef.route').then(m => m.chefRoutes)
    },
    { path: '**', redirectTo: 'recipes' }
];

import { Routes } from '@angular/router';
import { PublicLayout } from './core/layouts/public/public-layout/public-layout';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayout,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
            {
                path: 'home',
                loadComponent: () =>
                    import('./features/pages/public/home-page/home-page').then((m)=>m.HomePage)
            },
            {
                path: 'about',
                loadComponent: () =>
                    import('./features/pages/public/about-us-page/about-us-page').then((m) => m.AboutUsPage),
            },
            {
                path: 'contact',
                loadComponent: () =>
                    import('./features/pages/public/contact-us-page/contact-us-page').then((m) => m.ContactUsPage),
            },
            {
                path: 'products',
                loadComponent: () =>
                    import('./features/pages/public/product-public-page/product-public-page').then((m) => m.ProductPublicPage),
            },
            {
                path: 'login',
                loadComponent: () =>
                    import('./features/pages/private/login-page/login-page').then((m) => m.LoginPage),
            },
        ],
    },
    {
        path: 'admin',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./core/layouts/private/private-layout/private-layout').then((m) => m.PrivateLayout),
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/pages/private/dashboard-page/dashboard-page').then((m) => m.DashboardPage),
            },
            {
                path: 'adminproducts',
                loadComponent: () =>
                    import('./features/pages/private/product/product-page/product-page').then((m) => m.ProductPage),
            },
            {
                path: 'carts',
                loadComponent: () =>
                    import('./features/pages/private/cart-page/cart-page').then(m => m.CartPage)
            }
        ],
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];
import { Routes } from "@angular/router";
import { ChefList } from "../pages/chef/chef-list/chef-list";
import { ChefDetail } from "../pages/chef/chef-detail/chef-detail";

export const chefRoutes: Routes = [
    { path: '', component: ChefList },
    { path: ':id', component: ChefDetail },
]
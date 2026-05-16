import { Routes } from "@angular/router";
import { RecipeList } from "../pages/recipe/recipe-list/recipe-list";
import { RecipeDetail } from "../pages/recipe/recipe-detail/recipe-detail";

export const recipeRoutes: Routes = [
    { path: '', component: RecipeList },
    { path: ':id', component: RecipeDetail },
]
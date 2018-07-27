import { Route } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { ActorsPageComponent } from "./actors/actors-page/actors-page.component";

export const routes: Route[] = [
  // { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomePageComponent },
  { path: "actors/:name", component: ActorsPageComponent },
  { path: "**", redirectTo: "home" }
];

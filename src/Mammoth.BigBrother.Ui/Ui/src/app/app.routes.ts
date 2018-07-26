import { Route } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { ActorsPageComponent } from "./actors/actors-page/actors-page.component";

export const routes: Route[] = [
  { path: "home", component: HomePageComponent },
  { path: "actor/:name", component: ActorsPageComponent },
  { path: "**", redirectTo: "home" }
];

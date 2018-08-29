import { Route } from "@angular/router";
import { ActorsPageComponent } from "./actors/actors-page/actors-page.component";
import { ActorsCanActivateGuard } from "./actors/guards/actors-can-activate.guard";
import { HomePageComponent } from "./home-page/home-page.component";

export const routes: Route[] = [
  // { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomePageComponent },
  { path: "actors/:name", component: ActorsPageComponent, canActivate: [ActorsCanActivateGuard] },
  { path: "**", redirectTo: "home" }
];

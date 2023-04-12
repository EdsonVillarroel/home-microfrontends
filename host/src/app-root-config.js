import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    const moduleMap = {
      "@app/home-microfrontends": () => import("ngmfe1/MFEModule1"),
      "@app/app": () => import("ngmfe2/MFEModule2"),
    };
    return moduleMap[name]();
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });
applications.forEach(registerApplication);
layoutEngine.activate();
start();


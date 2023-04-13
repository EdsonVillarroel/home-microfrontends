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
    console.log("name Root",name);
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();


// import { registerApplication, start, LifeCycles } from "single-spa";

// // registerApplication({
// //   name: "@single-spa/welcome",
// //   app: () =>
// //     System.import<LifeCycles>(
// //       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
// //     ),
// //   activeWhen: ["/"],
// // });

// registerApplication({
//   name: "module1-microfrontend",
//   app: () => System.import<LifeCycles>("module1-microfrontend"),
//   activeWhen: ["/"]
// });
// // registerApplication({
// //   name: "@module1-microfrontend/module2",
// //   app: () => System.import<LifeCycles>("module1-microfrontend/module2"),
// //   activeWhen: ["/"],
// // });


// start({
//   urlRerouteOnly: true,
// });

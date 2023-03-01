import { loader } from "./app";
import "./index.css";

if (module.hot) {
  module.hot.accept("./app", () => {
    const loader = require("./app").loader;
    loader();
  });

  module.hot.accept("./index.css", () => require("./index.css"));
}

loader();

console.log('updated CI script')
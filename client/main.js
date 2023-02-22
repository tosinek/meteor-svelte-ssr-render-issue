import App from "/imports/ui/App.svelte";
import { onPageLoad } from "meteor/server-render";

onPageLoad(() => {
  new App({
    target: document.getElementById("app"),
    hydrate: true,
  });
});

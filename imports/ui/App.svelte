<script>
  import { Router, Route } from 'svelte-routing'
  import Links from "./Links.svelte";

  // for SSR sink
  export let url = ''
</script>

<Router {url}>
  <Route path="/"><Links /></Route>
</Router>


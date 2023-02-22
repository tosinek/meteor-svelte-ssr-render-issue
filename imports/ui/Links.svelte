<script>
  import { Meteor } from 'meteor/meteor';
  import { LinksCollection } from '../api/links';
  $m: {
    // guards as subscriptions are not available on the server
    if (Meteor.isClient) Meteor.subscribe("links.all");
  }
  
  let links;
  if (Meteor.isServer) {
    // to initially load data via SSR
    links = LinksCollection.find().fetch();
  }
  $m: links = LinksCollection.find().fetch();
</script>

<svelte:head>
  <title>LINKS - doubled</title>
  <meta name="description" content="Links page - doubled">
</svelte:head>

<style>
  /* styles will get doubled */
  li {
    list-style: none;
    margin: 10px 0;
  }
</style>

{#if Meteor.isClient}
   <h1>CLIENT VERSION</h1>
{/if}

<h2>Learn Meteor!</h2>
  {#if links}
    <ul>
      {#each links as link (link._id)}
        <li><a href={link.url} target="_blank" rel="noreferrer">{link.title}</a></li>
      {/each}
    </ul>
  {:else}
    <div>Loading ...</div>
  {/if}

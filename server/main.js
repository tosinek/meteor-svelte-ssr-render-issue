import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { onPageLoad } from "meteor/server-render";
import C from "/imports/ui/App.svelte";

// ssr
onPageLoad((sink) => {
  const { headers, url, browser } = sink.request;
  const { html, css, head } = C.render({ url: url.path }); // pathname, path, href

  // i need to add title and meta for SEO - but then i gets duplicated
  sink.appendToHead(head);

  // loading the style again doesn't seem to be necessary, as it is already in the head in
  // <link rel="stylesheet" type="text/css" class="__meteor-css__" href="/merged-stylesheets.css?hash=...
  // sink.appendToHead(`<style>${css.code}</style>`)
  
  // add h1 - which does not have any effect on the behavior
  sink.renderIntoElementById("app", '<h1>SSR VERSION</h1>' + html);
  console.log("🚀 ~ file: main.js:14 ~ onPageLoad ~ html:", html)

  // good approach ???
  const pageNotFound = head.search("<title>404 -") !== -1;
  if (pageNotFound) sink.setStatusCode(404);
});





// links
async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}
Meteor.publish('links.all', function publishLinksAll() {
  return LinksCollection.find();
})
Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if (await LinksCollection.find().countAsync() === 0) {
    await insertLink({
      title: 'Do the Tutorial',
      url: 'https://svelte-tutorial.meteor.com/',
    });

    await insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    await insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    await insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }
});






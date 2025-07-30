import rss from './rss.mjs';

async function postBuild() {
  await rss();
}

await postBuild();

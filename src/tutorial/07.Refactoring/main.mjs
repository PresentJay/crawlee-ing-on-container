// codes are basically from https://crawlee.dev/docs/introduction/refactoring

import { PlaywrightCrawler, log, Dataset } from 'crawlee';
import { router } from './routes.mjs';

// This is better set with CRAWLEE_LOG_LEVEL env var
// or a configuration option. This is just for show 😈
log.setLevel(log.LEVELS.DEBUG);

log.debug('Setting up crawler.');
const crawler = new PlaywrightCrawler({
    // Instead of the long requestHandler with
    // if clauses we provide a router instance.
    requestHandler: router,
    maxRequestsPerCrawl: 20
});

log.debug('Adding requests to the queue.');
await crawler.addRequests(['https://apify.com/store']);

// crawler.run has its own logs 🙂
await crawler.run();

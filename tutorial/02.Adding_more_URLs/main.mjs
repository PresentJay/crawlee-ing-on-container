// codes are basically from https://crawlee.dev/docs/introduction/adding-urls

// Author: presentj94@gmail.com (PresentJay@Github)

import { CheerioCrawler } from 'crawlee';

const crawler = new CheerioCrawler({
    maxRequestsPerCrawl: 20,
    async requestHandler({ $, request, enqueueLinks }) {
        const title = $('title').text();
        console.log(`The title of "${request.url}" is: ${title}.`);
        await enqueueLinks({
            strategy: 'same-domain',
            globs: ['http?(s)://apify.com/*/*'],
            transformRequestFunction(req) {
                // ignore all links ending with `.pdf`
                if (req.url.endsWith('.pdf')) return false;
                return req;
            },
        });
    },
});

await crawler.run(['https://crawlee.dev']);


// codes are basically from https://crawlee.dev/docs/introduction/saving-data

import { PlaywrightCrawler, Dataset } from 'crawlee';

const crawler = new PlaywrightCrawler({
    maxRequestsPerCrawl: 20,
    requestHandler: async ({ page, request, enqueueLinks }) => {
        console.log(`Processing: ${request.url}`)
        if (request.label === 'DETAIL') {
            const urlParts = request.url.split('/').slice(-2);
            const modifiedTimestamp = await page.locator('time[datetime]').getAttribute('datetime');
            const runsRow = page.locator('ul.ActorHeader-stats > li').filter({ hasText: 'Runs' });
            const runCountString = await runsRow.locator('span').last().textContent();

            const results = {
                url: request.url,
                uniqueIdentifier: urlParts.join('/'),
                owner: urlParts[0],
                title: await page.locator('h1').textContent(),
                description: await page.locator('span.actor-description').textContent(),
                modifiedDate: new Date(Number(modifiedTimestamp)),
                runCount: Number(runCountString.replaceAll(',', '')),
            }

            await Dataset.pushData(results);
        } else {
            await page.waitForSelector('.ActorStorePagination-pages a');
            await enqueueLinks({
                selector: '.ActorStorePagination-pages > a',
                label: 'LIST',
            })
            await page.waitForSelector('.ActorStoreItem');
            await enqueueLinks({
                selector: '.ActorStoreItem',
                label: 'DETAIL', // <= note the different label
            })
        }
    }
});

await crawler.run(['https://apify.com/store']);
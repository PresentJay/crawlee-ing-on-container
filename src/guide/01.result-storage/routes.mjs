// codes are basically from https://crawlee.dev/docs/introduction/refactoring

import { createPlaywrightRouter, Dataset, KeyValueStore } from 'crawlee';

// createPlaywrightRouter() is only a helper to get better
// intellisense and typings. You can use Router.create() too.
export const router = createPlaywrightRouter();

// Get the INPUT from the default key-value store
const input = await KeyValueStore.getInput();

// This replaces the request.label === DETAIL branch of the if clause.
router.addHandler('DETAIL', async ({ request, page, log }) => {
    log.debug(`Extracting data: ${request.url}`)
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

    log.debug(`Saving data: ${request.url}`)
    // Write the OUTPUT to the default key-value store
    await KeyValueStore.setValue(`${urlParts[0]}-${urlParts[1]}`, results);
});

// This is a fallback route which will handle the start URL
// as well as the LIST labelled URLs.
router.addDefaultHandler(async ({ request, page, enqueueLinks, log }) => {
    log.debug(`Enqueueing pagination: ${request.url}`)
    await page.waitForSelector('.ActorStorePagination-pages a');
    await enqueueLinks({
        selector: '.ActorStorePagination-pages > a',
        label: 'LIST',
    })
    log.debug(`Enqueueing actor details: ${request.url}`)
    await page.waitForSelector('.ActorStoreItem');
    await enqueueLinks({
        selector: '.ActorStoreItem',
        label: 'DETAIL', // <= note the different label
    })
});
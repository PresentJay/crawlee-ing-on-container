// codes are basically from https://crawlee.dev/docs/introduction/first-crawler

// Author: presentj94@gmail.com (PresentJay@Github)

// Add import of CheerioCrawler.

import { RequestQueue, CheerioCrawler } from 'crawlee';

// 1. RequestQueue 인스턴스 생성.
const requestQueue = await RequestQueue.open();

// 2. 하나 이상의 Request 인스턴스를 Queue에 추가.
await requestQueue.addRequest({ url: 'https://crawlee.dev' });

// 3. 크롤러를 생성해 목표 Queue를 전달하고, 행동 RequestHAndler를 정의하여 전달.
const crawler = new CheerioCrawler({
    requestQueue,
    // The `$` argument는 Chreeio가 website에서 파싱한 HTML을 가진 객체.
    async requestHandler({ $, request }) {
        // Extract <title> text with Cheerio.
        // See Cheerio documentation for API docs.
        const title = $('title').text();
        console.log(`The title of "${request.url}" is: ${title}.`);
    }
})

// Start the crawler and wait for it to finish
await crawler.run();

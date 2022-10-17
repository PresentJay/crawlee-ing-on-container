// codes are basically from https://crawlee.dev/docs/introduction/first-crawler

// Author: presentj94@gmail.com (PresentJay@Github)

// Add import of CheerioCrawler.

// import { RequestQueue, CheerioCrawler } from 'crawlee';
// ## RequestQueue import is gone! ##

import { CheerioCrawler } from 'crawlee';

// 1. RequestQueue 인스턴스 생성.
// const requestQueue = await RequestQueue.open();
// ## initiate RequestQueue is gone! ##

// 2. 하나 이상의 Request 인스턴스를 Queue에 추가.
// await requestQueue.addRequest({ url: 'https://crawlee.dev' });
// ## Run에서 처리할 것! ##

// 3. 크롤러를 생성해 목표 Queue를 전달하고, 행동 RequestHAndler를 정의하여 전달.
const crawler = new CheerioCrawler({
    // requestQueue,

    // ## requestQueue는 이미 crawler가 가지고 있다고 해서, is gone! ##

    // The `$` argument는 Chreeio가 website에서 파싱한 HTML을 가진 객체.
    async requestHandler({ $, request }) {
        // Extract <title> text with Cheerio.
        // See Cheerio documentation for API docs.
        const title = $('title').text();
        console.log(`The title of "${request.url}" is: ${title}.`);
    }
})

// Start the crawler and wait for it to finish
// ## url 배열을 넣어줌으로써 just run! ##
await crawler.run(['https://crawlee.dev']);


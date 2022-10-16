# [Crawling the Store](https://crawlee.dev/docs/introduction/crawling)

```sh
crawling.sh job tutorial 04
log-last.sh tutorial 04
```

## 04 튜토리얼 목표

- `Apify Store`(https://apify.com/store)를 크롤링.
- 목록 페이지와 세부 페이지를 모두 방문

<br>

### 효율을 위한 `Selector`, `label` 필터링

: `<a>`, href 태그를 기준으로 링크를 탐색하면 쓸데없는 페이지를 방문할 수 있음.

- 아래와 같이 구성하여 개선 가능 (`DevTools` 활용)

```js
import { PlaywrightCrawler } from 'crawlee';

const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page, request, enqueueLinks }) => {
        console.log(`Processing: ${request.url}`)
        // Wait for the actor cards to render,
        // otherwise enqueueLinks wouldn't enqueue anything.
        await page.waitForSelector('.ActorStorePagination-pages a');

        // Add links to the queue, but only from
        // elements matching the provided selector.
        await enqueueLinks({
            selector: '.ActorStorePagination-pages > a',
            label: 'LIST',
        })
    },
});

await crawler.run(['https://apify.com/store']);
```

- `Selector`
  - `.ActorStorePagination-pages a` 셀렉터로 `<a>`를 가져올 때 (class)
- `label`
  - `Request`의 label.

<br>

### 세부 페이지까지 크롤링

: 목록페이지에서 자세한 정보 취득을 위해 상세 페이지로 이동하는 경우

```js
import { PlaywrightCrawler } from 'crawlee';

const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page, request, enqueueLinks }) => {
        console.log(`Processing: ${request.url}`)
        if (request.label === 'DETAIL') {
            // We're not doing anything with the details yet.
        } else {
            // This means we're either on the start page, with no label,
            // or on a list page, with LIST label.

            await page.waitForSelector('.ActorStorePagination-pages a');
            await enqueueLinks({
                selector: '.ActorStorePagination-pages > a',
                label: 'LIST',
            })

            // In addition to adding the listing URLs, we now also
            // add the detail URLs from all the listing pages.
            await page.waitForSelector('.ActorStoreItem');
            await enqueueLinks({
                selector: '.ActorStoreItem',
                label: 'DETAIL', // <= note the different label
            })
        }
    },
});

await crawler.run(['https://apify.com/store']);
```

<br>

### 결과

```sh
(skip previous logs)
...
Processing: https://apify.com/mshopik/sugarbearhair-scraper
INFO  PlaywrightCrawler: All the requests from request list and/or request queue have been processed, the crawler will shut down.
INFO  PlaywrightCrawler: Crawl finished. Final request statistics: {"requestsFinished":1027,"requestsFailed":0,"retryHistogram":[1024,3],"requestAvgFailedDurationMillis":null,"requestAvgFinishedDurationMillis":27114,"requestsFinishedPerMinute":66,"requestsFailedPerMinute":0,"requestTotalDurationMillis":27846409,"requestsTotal":1027,"crawlerRuntimeMillis":929597}
```


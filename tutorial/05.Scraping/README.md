# [Scraping the Store](https://crawlee.dev/docs/introduction/scraping)

```sh
crawling.sh job tutorial 05
log-last.sh tutorial 05
```

## 05 튜토리얼 목표

: `Apify Store`(https://apify.com/store)에서 크롤링한 페이지의 데이터를 스크래이핑

- [ ] `URL`
- [ ] `Owner`
- [ ] `Unique identifier` 
- [ ] `Title`
- [ ] `Description`
- [ ] `Last modification date`
- [ ] `Number of runs`

<br>

### `URL`, `Owner`, `Unique identifier` 스크래이핑

- [x] `URL`
- [x] `Owner`
- [x] `Unique identifier` 


- 세부 페이지에 가지 않고도 확인할 수 있음.

```js
// request.url = https://apify.com/apify/web-scraper

const urlParts = request.url.split('/').slice(-2); // ['apify', 'web-scraper']
const uniqueIdentifier = urlParts.join('/'); // 'apify/web-scraper'
const owner = urlParts[0]; // 'apify'
```

<br>

### `Title`

: `ActorHeader-identificator` class `div`의 첫 번째 `h1`에 `textContent()`로 있음.

- 보통은 아니지만, 이 페이지에서는 `h1` 태그로 표현하고 있음 (유일)

```js
// const title = await page.locator('ActorHeader-identificator > h1').textContent();
const title = await page.locator('h1').textContent();
```

- [x] `Title`

<br>

### `Description`

: `actor-description` class `span`에 있음

```js
const description = await page.locator('span.actor-description').textContent();
```

- [x] `Description`

<br>

### `Last modification date`

: `<time>` 태그가 유일하게 있고, 속성 중에 datetime이 가지고 있음.

- `UNIX timestamp`로 저장되어 있기 때문에, `new Date()`로 캐스팅 (그 전에, 캐스팅을 위해 string을 숫자로 캐스팅)

```js
const modifiedTimestamp = await page.locator('time[datetime]').getAttribute('datetime');
const modifiedDate = new Date(Number(modifiedTimestamp));
```

- [x] `Last modification date`

<br>

### `Run count`

: selector를 사용하고, 변형해야 결과를 얻을 수 있음.

```js
const runsRow = page.locator('ul.ActorHeader-stats > li').filter({ hasText: 'Runs' });
const runCountString = await runsRow.locator('span').last().textContent();
const runCount = Number(runCountString.replaceAll(',', ''));
```

- selector로 li array + filter로 Runs 포함한 li 도달
- li의 span 중에서 마지막의 text 추출
- text의 , 표현 제거 후, 숫자로 캐스팅

<br>

### 결과

```sh
(skip previous logs)
...
INFO  PlaywrightCrawler: All the requests from request list and/or request queue have been processed, the crawler will shut down.
INFO  PlaywrightCrawler: Crawl finished. Final request statistics: {"requestsFinished":1024,"requestsFailed":3,"retryHistogram":[1012,12,null,3],"requestAvgFailedDurationMillis":20827,"requestAvgFinishedDurationMillis":33008,"requestsFinishedPerMinute":59,"requestsFailedPerMinute":0,"requestTotalDurationMillis":33862645,"requestsTotal":1027,"crawlerRuntimeMillis":1038464}
```

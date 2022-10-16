# [Scraping data](https://crawlee.dev/docs/introduction/saving-data)

```sh
crawling.sh job tutorial 06
log-last.sh tutorial 06
```

## 06 튜토리얼 목표

: `Dataset` 객체로 데이터 추출, 저장

<br>

### `Dataset` 클래스 import

```js
import { PlaywrightCrawler, Dataset } from 'crawlee';
```

<br>

### `Dataset`에 결과 저장

```js
await Dataset.pushData(results);
```

[`Dataset.pushData()`](https://crawlee.dev/api/core/class/Dataset#pushData)

- 속성 이름이 열 제목으로 사용되는 테이블의 새 행을 생성함.
- await을 사용해야 함 (크롤러가 종료되기 전 저장하는 것을 방지)
- 한 데이터의 크기가 JSON, 9MB 이하여야 함
- [`저장 가이드`](https://crawlee.dev/docs/guides/result-storage#dataset)
- 결과 데이터는 `${ResultURL}/datasets/` 하위에 데이터 하나씩 json으로 저장됨.
  - [`다른 방식`](https://crawlee.dev/docs/guides/result-storage#key-value-store)은 나중에 더 찾아봐야함(TODO)

<br>

### 결과

```sh
INFO  PlaywrightCrawler: Starting the crawl
Processing: https://apify.com/store
Processing: https://apify.com/store?page=0
Processing: https://apify.com/store?page=2
Processing: https://apify.com/store?page=1
Processing: https://apify.com/apify/web-scraper
Processing: https://apify.com/apify/google-search-scraper
Processing: https://apify.com/drobnikj/crawler-google-places
Processing: https://apify.com/vaclavrut/Amazon-crawler
Processing: https://apify.com/zuzka/instagram-profile-scraper
Processing: https://apify.com/store?page=3
Processing: https://apify.com/sauermar/tiktok-scraper
Processing: https://apify.com/bernardo/youtube-scraper
Processing: https://apify.com/pocesar/fast-instagram-hashtag-scraper
INFO  Statistics: PlaywrightCrawler request statistics: {"requestAvgFailedDurationMillis":null,"requestAvgFinishedDurationMillis":14462,"requestsFinishedPerMinute":13,"requestsFailedPerMinute":0,"requestTotalDurationMillis":188012,"requestsTotal":13,"crawlerRuntimeMillis":60374,"retryHistogram":[13]}
INFO  PlaywrightCrawler:AutoscaledPool: state {"currentConcurrency":7,"desiredConcurrency":8,"systemStatus":{"isSystemIdle":true,"memInfo":{"isOverloaded":false,"limitRatio":0.2,"actualRatio":null},"eventLoopInfo":{"isOverloaded":false,"limitRatio":0.6,"actualRatio":0.019},"cpuInfo":{"isOverloaded":false,"limitRatio":0.4,"actualRatio":null},"clientInfo":{"isOverloaded":false,"limitRatio":0.3,"actualRatio":0}}}
Processing: https://apify.com/drobnikj/seo-audit-tool
Processing: https://apify.com/pocesar/json-downloader
Processing: https://apify.com/vdrmota/twitter-scraper
Processing: https://apify.com/store?page=4
Processing: https://apify.com/vdrmota/contact-info-scraper
Processing: https://apify.com/jakubbalada/content-checker
Processing: https://apify.com/emastra/google-trends-scraper
INFO  PlaywrightCrawler: Crawler reached the maxRequestsPerCrawl limit of 20 requests and will shut down soon. Requests that are in progress will be allowed to finish.
Processing: https://apify.com/glenn/gif-scroll-animation
Processing: https://apify.com/hynekhruska/indeed-scraper
Processing: https://apify.com/trudax/reddit-scraper
Processing: https://apify.com/petrpatek/covid-19-aggregator
Processing: https://apify.com/valek.josef/weather-scraper
Processing: https://apify.com/store?page=5
Processing: https://apify.com/trudax/free-reddit-scraper
INFO  PlaywrightCrawler: Earlier, the crawler reached the maxRequestsPerCrawl limit of 20 requests and all requests that were in progress at that time have now finished. In total, the crawler processed 27 requests and will shut down.
INFO  PlaywrightCrawler: Crawl finished. Final request statistics: {"requestsFinished":27,"requestsFailed":0,"retryHistogram":[27],"requestAvgFailedDurationMillis":null,"requestAvgFinishedDurationMillis":12000,"requestsFinishedPerMinute":23,"requestsFailedPerMinute":0,"requestTotalDurationMillis":323999,"requestsTotal":27,"crawlerRuntimeMillis":71839}
```

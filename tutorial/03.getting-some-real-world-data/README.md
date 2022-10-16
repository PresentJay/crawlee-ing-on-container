# [Getting some real-world data](https://crawlee.dev/docs/introduction/real-world-project)

```sh
crawling.sh job tutorial 03
log-last.sh tutorial 03
```

## 03 튜토리얼 목표

- `Apify Store`(https://apify.com/store)를 크롤링하는 예제.
  - `Actor`를 스크랩
- `JavaScript Rendering`이 포함됨.

<br>

### 크롤링 프로세스 (반복)

1. 페이지에서 새로운 링크 탐색
2. domain을 가리키는 항목 필터링
3. [`RequestQueue`](https://crawlee.dev/api/core/function/enqueueLinks)에 추가

<br>

### `사전 조사`

: 크롤링/스크래이핑을 시작하기 전. 간단한 사전 조사가 필요함.

- [ ] 웹사이트의 구성
- [ ] HTTP 요청으로만 스크랩 가능한지 (`CheerioCrawler`)
- [ ] Headless 브라우저가 필요한지
- [ ] 크롤링 방지 장치가 있는지
- [ ] HTML을 구문 분석해야하는지/API로 직접 가져올 수 있는지

---

03 튜토리얼에서는 다음과 같이 설정함.

- [x] `CheerioCrawler`로 스크래이핑 불가능 --> `PlaywrightCrawler`로 동작
- [x] Headless 브라우저가 필요한지

<br>

### 새로운 link를 찾는 방법

: 주로 `<a>` 태그를 포함하는 요소(`href`속성 포함)를 찾음 -> `enqueueLinks()`

#### `EnqueueLinks()`를 구현해보면?

```js
import { URL } from 'node:url';

const links = $('a[href]')
   .map((_, el) => $(el).attr('href'))
   .get();

// Besides resolving the URLs, we now also need to
// grab their hostname for filtering.
const { hostname } = new URL(request.loadedUrl);
const absoluteUrls = links
   .map((link) => new URL(link, request.loadedUrl));

// We use the hostname to filter links that point
// to a different domain, even subdomain.
const sameHostnameLinks = absoluteUrls
   .filter((url) => url.hostname === hostname)
   .map((url) => ({ url: url.href }));

// Finally, we have to add the URLs to the queue
await crawler.addRequests(sameHostnameLinks);
```

### 동일한 도메인 유지

: 목표한 웹사이트에서 `Google`, `Facebook`, `Twitter` 등 외부 사이트로 이동하지 않기 위해 필터링 기능이 필요함

`enqueueLinks()`는 같은 hostname을 유지하도록 구성되고, 서브도메인을 포함하지 않음!
-> 만약 서브도메인을 추가로 반영하려면, `strategy` 인수를 사용해야 함.

```js
await enqueueLinks({
    strategy: 'same-domain'
});
```

### 중복URL 제거

: 동일한 페이지를 여러 번 반복하면, 중복된 URL을 건너뛰는 게 중요.

`RequestQueue`에서 `uniqueKey`로 처리 가능

##### `uniqueKey`: URL을 소문자화, 쿼리 매개변수를 정렬(`lexical`), 일부 표현 제거 등등



### [고급 필터링](https://crawlee.dev/api/core/enum/EnqueueStrategy)

: `enqueueLinks()`로 대기열에 추가하는 URL을 더 세밀하게 조정해야 할 필요가 있음 -> [`EnqueueStrategy`](https://crawlee.dev/api/core/enum/EnqueueStrategy)

1. `All` : 도메인 관계 없이 모든 링크를 대기열에 넣음
2. `SameDomain` : 동일한 도메인 이름을 대상으로 하는 링크를 대기열에 넣음
3. `SameHostname` : 같은 hostname을 가진 링크를 대기열에 넣음



### [URL 필터링 패턴](https://crawlee.dev/api/core/interface/EnqueueLinksOptions)

: `globs`, `regexps`, `pseudoUrls`를 추가적으로 활용 가능.

- 각 인수는 `Array`를 받음.
- 위 패턴을 사용 시, 명시적으로 설정하지 않는 한 `same-hostname`(`EnqueueStrategy`)이 적용되지 않음.


### `Request` 변형하기

: `Request`가 새롭게 생성되어 `RequestQueue`에 추가되기 직전에 동작하는 함수: `transformRequestFunction`


### 결과

```sh
The title of "https://crawlee.dev" is: Crawlee · Build reliable crawlers. Fast. | Crawlee.
The title of "https://crawlee.dev/docs/quick-start" is: Quick Start | Crawlee.
The title of "https://crawlee.dev/docs/introduction" is: Introduction | Crawlee.
The title of "https://crawlee.dev/docs/guides" is: Guides | Crawlee.
The title of "https://crawlee.dev/docs/next/quick-start" is: Quick Start | Crawlee.
The title of "https://crawlee.dev/docs/introduction/setting-up" is: Setting up | Crawlee.
The title of "https://crawlee.dev/docs/introduction/first-crawler" is: First crawler | Crawlee.
The title of "https://crawlee.dev/docs/examples" is: Examples | Crawlee.
The title of "https://crawlee.dev/api/core" is: @crawlee/core | API | Crawlee.
The title of "https://crawlee.dev/docs/introduction/real-world-project" is: Getting some real-world data | Crawlee.
The title of "https://crawlee.dev/docs/introduction/crawling" is: Crawling the Store | Crawlee.
The title of "https://crawlee.dev/docs/introduction/adding-urls" is: Adding more URLs | Crawlee.
The title of "https://crawlee.dev/docs/upgrading" is: Upgrading | Crawlee.
The title of "https://crawlee.dev/docs/3.0/quick-start" is: Quick Start | Crawlee.
The title of "https://crawlee.dev/docs/introduction/scraping" is: Scraping the Store | Crawlee.
The title of "https://crawlee.dev/docs/introduction/refactoring" is: Refactoring | Crawlee.
The title of "https://crawlee.dev/api/cheerio-crawler/class/CheerioCrawler" is: CheerioCrawler | API | Crawlee.
The title of "https://crawlee.dev/api/core/changelog" is: Changelog | API | Crawlee.
The title of "https://crawlee.dev/api/puppeteer-crawler/class/PuppeteerCrawler" is: PuppeteerCrawler | API | Crawlee.
The title of "https://crawlee.dev/docs/introduction/saving-data" is: Saving data | Crawlee.
The title of "https://crawlee.dev/docs/guides/configuration" is: Configuration | Crawlee.
INFO  CheerioCrawler: Crawler reached the maxRequestsPerCrawl limit of 20 requests and will shut down soon. Requests that are in progress will be allowed to finish.
The title of "https://crawlee.dev/docs/guides/request-storage" is: Request Storage | Crawlee.
The title of "https://crawlee.dev/docs/guides/result-storage" is: Result Storage | Crawlee.
The title of "https://crawlee.dev/docs/upgrading/upgrading-to-v3" is: Upgrading to v3 | Crawlee.
The title of "https://crawlee.dev/docs/next/introduction" is: Introduction | Crawlee.
The title of "https://crawlee.dev/docs/next/guides" is: Guides | Crawlee.
The title of "https://crawlee.dev/docs/3.0/introduction" is: Introduction | Crawlee.
The title of "https://crawlee.dev/docs/3.0/guides" is: Guides | Crawlee.
The title of "https://crawlee.dev/api/playwright-crawler/class/PlaywrightCrawler" is: PlaywrightCrawler | API | Crawlee.
INFO  CheerioCrawler: Earlier, the crawler reached the maxRequestsPerCrawl limit of 20 requests and all requests that were in progress at that time have now finished. In total, the crawler processed 29 requests and will shut down.
```

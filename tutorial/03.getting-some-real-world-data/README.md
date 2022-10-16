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

### `크롤링 대상 데이터 정의`

: 스크랩하려는 데이터와 그 위치를 찾아야 함.

---

03 튜토리얼에서는 다음 데이터를 목표로 함.

1. URL
2. Owner
3. Unique identifier
4. Title
5. Description
6. `Last modification date`
7. `Number of runs`

![data](../../docs/attachments/images/tutorial-03-image-00.jpeg)

: 6(`Last modification date`), 7(`Number of runs`)은 세부 페이지로 한 번 더 이동해야 확인 가능

<br>

### `시작 URL 찾기`

: 추출할 데이터를 가장 쉽게 찾을 수 있는 페이지를 시작 URL로 설정해야 함

---

03 튜토리얼에서는 다음 페이지를 `시작 URL`로 함 -> `apify.com/store`

<br>

### `페이지 구성`

: pagination 절차 등을 확인해야 함

   https://apify.com/store?page=2

<br>

### `크롤링 구성`

1. 시작 URL 설정
2. 추가적으로 방문해야 하는 페이지(세부정보) 대기열 추가
3. 다음 페이지 대기열 추가
4. 대기열에서 request 처리 시작 시
   1. 목록페이지면 다음 페이지로 이동
   2. 상세 페이지면 데이터 스크랩
5. 반복

<br>

### `크롤러 사전 테스트`

: 스크래이핑을 시작하기 전, 웹사이트에 대해 동작을 하는지 사전 테스트가 필요함.

아래 예를 통해, 액터 카드의 텍스트 콘텐츠를 뽑는 크롤러를 테스트.

```js
// Instead of CheerioCrawler let's use Playwright
// to be able to render JavaScript.
import { PlaywrightCrawler } from 'crawlee';

const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page }) => {
        // Wait for the actor cards to render.
        await page.waitForSelector('.ActorStoreItem');
        // Execute a function in the browser which targets
        // the actor card elements and allows their manipulation.
        const actorTexts = await page.$$eval('.ActorStoreItem', (els) => {
            // Extract text content from the actor cards
            return els.map((el) => el.textContent);
        });
        actorTexts.forEach((text, i) => {
            console.log(`ACTOR_${i + 1}: ${text}\n`);
        });
    },
});

await crawler.run(['https://apify.com/store']);
```

또는 Cheerio 파싱으로 아래처럼 구성할 수도 있음.

```js
// Instead of CheerioCrawler let's use Playwright
// to be able to render JavaScript.
import { PlaywrightCrawler } from 'crawlee';

const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page, parseWithCheerio }) => {
        // Wait for the actor cards to render.
        await page.waitForSelector('.ActorStoreItem');
        // Extract the page's HTML from browser
        // and parse it with Cheerio.
        const $ = await parseWithCheerio();
        // Use familiar Cheerio syntax to
        // select all the actor cards.
        $('.ActorStoreItem').each((i, el) => {
            const text = $(el).text();
            console.log(`ACTOR_${i + 1}: ${text}\n`);
        });
    },
});

await crawler.run(['https://apify.com/store']);
```

<br>

### 결과

```sh
INFO  PlaywrightCrawler: Starting the crawl
ACTOR_1: Web Scraperapify/web-scraperCrawls arbitrary websites using the Chrome browser and extracts data from pages using a provided JavaScript code. The actor supports both recursive crawling and lists of URLs and automatically manages concurrency for maximum performance. This is Apify's basic tool for web crawling and scraping.FreeApify31,253

ACTOR_2: Google Search Results Scraperapify/google-search-scraperThis Google Scraper enables you to scrape Google Search Engine Results Pages (SERPs) and extract organic and paid results, ads, queries, People Also Ask, prices, reviews, like a Google SERP API. Select country or language and extraction of custom attributes, and download your data, no coding needed.FreeApify22,938

ACTOR_3: Google Maps Scraperdrobnikj/crawler-google-placesExtract data from hundreds of Google Maps businesses and locations in seconds. Get Google Maps data including reviews, images, opening hours, location, popular times & more. Go beyond the limits of the official Google Places API. Download data with Google Maps extractor in JSON, CSV, Excel and more.FreeJakub Drobník22,134

ACTOR_4: Amazon Product Scrapervaclavrut/Amazon-crawlerUse this Amazon scraper to collect data based on URL and country from the Amazon website. Extract product information without using the Amazon API, including reviews, prices, descriptions, and Amazon Standard Identification Numbers (ASINs). Download data in various structured formats.$40/monthFree trialVaclav Rut2,582

ACTOR_5: Instagram Profile Scraperzuzka/instagram-profile-scraperScrape all Instagram profile info. Add one or more Instagram usernames and extract followers & follows count, URLs, bio, posts, likes, counts, channel, duration, highlight reel, and more. Download structured data in JSON, CSV, XML, Excel, and HTML to use in applications, reports, and spreadsheets.FreeZuzka Pelechová7,861

ACTOR_6: TikTok Scrapersauermar/tiktok-scraperPowerful TikTok scraper to extract data from TikTok videos, hashtags, and users. Use it to scrape TikTok profiles, comments, hashtags, posts, URLs, numbers of shares, followers, hearts, names, video, and music-related data. Download TikTok data as a HTML, JSON, CSV, Excel, or XML doc.$45/monthFree trialMarkéta Sauerová2,253

ACTOR_7: YouTube Scraperbernardo/youtube-scraperYouTube crawler and video scraper. Alternative YouTube API with no limits or quotas. Extract and download channel name, likes, number of views, and number of subscribers. Scrape by keyword or URL. Customize your searches with human-friendly date formats. Download data as JSON, CSV, XML, and more.FreeBernard O.3,706

ACTOR_8: Fast Instagram Hashtag Scraperpocesar/fast-instagram-hashtag-scraperQuickly scrape thousands of Instagram posts for the given hashtags.$45/monthFree trialPaulo Cesar495

ACTOR_9: SEO Audit Tooldrobnikj/seo-audit-toolSearch Engine Optimization tool to carry out an SEO audit on any website. Finds broken links, missing images, and provides information about possible page improvements.FreeJakub Drobník1,099

ACTOR_10: Twitter Scrapervdrmota/twitter-scraperScrape tweets from any Twitter user profile. Top Twitter API alternative to scrape Twitter hashtags, threads, replies, followers, images, videos, statistics, and Twitter history. Download your data in any format, including JSON and Excel. Seamless integration with apps, reports, and databases.FreeVojta Drmota6,110

ACTOR_11: API / JSON scraperpocesar/json-downloaderScrape any API / JSON URLs directly to the dataset, and return them in CSV, XML, HTML, or Excel formats. Transform and filter the output. 
Enables you to follow pagination recursively from the payload without the need to visit the HTML page.$25/monthFree trialPaulo Cesar67

ACTOR_12: Contact Details Scrapervdrmota/contact-info-scraperFree contact details scraper to extract and download emails, phone numbers, Facebook, Twitter, LinkedIn, and Instagram profiles from any website. Extract contact information at scale from lists of URLs and download the data as Excel, CSV, JSON, HTML, and XML.FreeVojta Drmota7,041

ACTOR_13: Content Checkerjakubbalada/content-checkerMonitor a website or web page for content changes. Automatically saves before and after screenshots and sends an email notification when content changes are detected.FreeJakub Balada1,371

ACTOR_14: GIF Scroll Animationglenn/gif-scroll-animationFree tool to automatically create an animated GIF of any scrolling web page. Useful for testing UX, showcasing your work, and capturing any website as a GIF, including clickable elements and animations. Includes settings to adjust speed, wait before scrolling, slow down on-page animations, and more.FreeGlenn Goossens2,204

ACTOR_15: Google Trends Scraperemastra/google-trends-scraperGoogle Trends API to scrape data from Google Trends. Extract data for multiple search terms listed in a Google Sheet, define time ranges to get results at a higher frequency, select categories, and specify geographical locations. Download your data as HTML, JSON, CSV, Excel, XML, and more.FreeEmiliano Mastragostino1,300

ACTOR_16: Reddit Scrapertrudax/reddit-scraperUnlimited Reddit web scraper to crawl posts, comments, communities, and users without login. Limit web scraping by number of posts or items and extract all data in a dataset in multiple formats.$45/monthFree trialGustavo Rudiger216

ACTOR_17: Indeed Scraperhynekhruska/indeed-scraperScrape jobs posted on Indeed. Get detailed information from this job portal about saved and sponsored jobs. Specify the search based on location with the output attributes position, location, and description.FreeHynek Hruska1,265

ACTOR_18: Coronavirus stats across the Worldpetrpatek/covid-19-aggregatorAggregates data from all the Apify coronavirus COVID-19 public actors and unifies them in one overview dataset. Uses our API's for your COVID-19 reports and overviews.FreePetr Pátek469

ACTOR_19: Free Reddit Scrapertrudax/free-reddit-scraperFree Reddit web scraper to crawl posts, comments, communities, and users without login. Limit web scraping by number of posts or items and extract all data in a dataset in multiple formats.FreeGustavo Rudiger1,031

ACTOR_20: Weather Scrapervalek.josef/weather-scraperGet data about weather forecasts or analyze conditions in any location in the world. This scraper downloads information about forecasts, humidity, temperature, wind, etc. and delivers it in HTML, JSON, XLSX, and more.FreeJosef Válek113

ACTOR_21: Send Emailapify/send-mailThe actor automatically sends an email to a specific address. This actor is useful for notifications and reporting. With only 3 lines of javascript code, you'll be on top of your scraping actors and never miss important results or issues.FreeApify1,413

ACTOR_22: Transfermarkt Scraperpetr_cermak/transfermarkt⚽ Use this free tool as an API for the Transfermarkt website. Scrape and extract data from competition, club or player pages, or almost any Transfermarkt page. Download your data as HTML table, JSON, CSV, Excel, XML, and RSS feed.FreePetr Cermak1,293

ACTOR_23: Puppeteer Scraperapify/puppeteer-scraperCrawls websites with the headless Chrome and Puppeteer library using a provided server-side Node.js code. This crawler is an alternative to apify/web-scraper that gives you finer control over the process. Supports both recursive crawling and list of URLs. Supports login to website.FreeApify1,593

ACTOR_24: Website Checkerlukaskrivka/website-checkerCheck any website you plan to scrape for expected Compute unit consumption, anti-scraping software, and reliability.FreeLukáš Křivka362

INFO  PlaywrightCrawler: All the requests from request list and/or request queue have been processed, the crawler will shut down.
```

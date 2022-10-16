# [First Crawler](https://crawlee.dev/docs/introduction/first-crawler)

```sh
run.sh tutorial 00
log-last.sh tutorial 00
```

- `CheerioCrawler`
- `PuppeteerCrawler`
- `PlaywrightCrawler`


## 공통 목표

- 웹페이지를 열고, 작업을 수행하고, 결과를 저장하고를 반복.
- 크롤러에게 중요한 것은 `목적지`와 `행동`임.


### 목적지

: `Request` 클래스의 인스턴스를 사용하여 목적지를 결정함.

- 각 `Request` 인스턴스는 최소한 URL 하나를 보유해야 함.
- 크롤링할 때 목표 URL이 수천 개일 수 있고, 동적일 수 있음.

: `RequestQueue` 클래스는 `Request`의 동적 대기열임.

- 시작 `Request`에 대해 크롤링을 수행하는 동안, 더 많은 `Request`를 추가할 수 있음.
- 크롤러가 `Request`의 URL을 작업하는 동안, 동일한 도메인의 다른 페이지들을 대기열에 추가(`queuing`).


### 행동

: `RequestHandler`는 크롤러가 방문한 페이지에서 수행할 사용자 정의 함수를 나타냄.

- 페이지에서 데이터 추출, 데이터 처리, 저장, API 호출, 계산 수행 등을 처리할 수 있음.
- 크롤러가 `RequestQueue`의 각 `Request`마다 자동으로 호출함.
- 항상 `CrawlingContext`라는 하나의 인수를 받고, 크롤러의 클래스에 따라 달라진다.
- 항상 `Request` 의 속성으로 포함되어야 함.


### 결과

```sh
The title of "https://crawlee.dev" is: Crawlee · The scalable web crawling, scraping and automation library for JavaScript/Node.js | Crawlee.
```

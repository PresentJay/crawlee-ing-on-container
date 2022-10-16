# [First Crawler with no initiation of RequestQueue](https://crawlee.dev/docs/introduction/first-crawler#add-requests-faster)

```sh
./crawling.sh job tutorial 01
./log-last.sh job tutorial 01
```

### 모든 Crawler는 암시적으로 RequestQueue 객체를 가지고 있다.

그래서 그냥 `crawler.addRequests()`만 해도 동작한다!


<br>

### 결과

```sh
The title of "https://crawlee.dev" is: Crawlee · The scalable web crawling, scraping and automation library for JavaScript/Node.js | Crawlee.
```

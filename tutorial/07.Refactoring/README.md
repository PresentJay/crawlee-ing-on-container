# [Refactoring](https://crawlee.dev/docs/introduction/refactoring)

```sh
crawling.sh job tutorial 07
log-last.sh tutorial 07
```

## 07 튜토리얼 목표

: `Router`를 활용해, 크롤러 코드 아키텍쳐를 더 좋게 향상시키기!

<br>

### `Routing`

- 코드를 여러 파일로 분할하기
- `console.log`를 `Crawlee logger`로 바꾸기
- `Router`를 추가하기 (if 대신!)

```js
import { PlaywrightCrawler, log } from 'crawlee';
import { router } from './routes.js';

// This is better set with CRAWLEE_LOG_LEVEL env var
// or a configuration option. This is just for show 😈
log.setLevel(log.LEVELS.DEBUG);

log.debug('Setting up crawler.');
const crawler = new PlaywrightCrawler({
    // Instead of the long requestHandler with
    // if clauses we provide a router instance.
    requestHandler: router,
});

log.debug('Adding requests to the queue.');
await crawler.addRequests(['https://apify.com/store']);

// crawler.run has its own logs 🙂
await crawler.run();
```


<br>

### `log` level

- [`log`](https://crawlee.dev/api/core/class/Log)는 더 colorful하고, level별로 관리될 수 있음 (선택적으로 끄기 가능)
- `debug`, `info`, `warning`
- `log.setLevel()`으로 로그 레벨 설정 (`CRAWLEE_LOG_LEVEL` 환경변수)

<br>

### 결과

```sh

```

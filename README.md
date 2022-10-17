# Crawlee-ing on container project!

- NodeJS 기반 컨테이너 + Crawlee 오픈소스 테스트용 레포지토리입니다.

> `Crawlee`는 크롤링 및 스크래이핑을 빠르게 구축하는 데 필요한 npm package입니다.

## Features

- Docker-compose 기반으로 Crawlee 오픈소스 테스트를 수행합니다.

- [x] `Crawlee` Tutorial을 따라 on-boarding
- [ ] `Crawlee` Docs를 따라 지원 기능 구현
- [ ] `.env` 파일로 `Crawlee` 크롤링 구성 도전
- [ ] `postgresql`으로 크롤링 결과 데이터 저장

#### 목표는 진행 과정에서 유동적으로 추가됩니다.

<br>

## Prerequisite

프로젝트를 시작하기 전에 필요한 환경입니다.

| Environment | Tested Version |
| ------ | ------ |
| docker Engine | v20.10.11 |
| Git | 2.35.3 |
| NodeJs (Optional) | >= 16v |


<br>

## Getting Start

1. `Docker Container`로 모든 작업을 처리합니다.
2. 3가지의 `Docker Image`를 사용합니다.
   1. `dev`: v16+의 nodejs 이미지입니다. (presentj94/nodejs)
   2. `job`: puppetear-crawlee 이미지입니다. (presentj94/crawlee-job)
   3. `play`: playwright-crawlee 이미지입니다. (presentj94/crawlee-play)
3. 주요 스크립트는 세 가지로 운영됩니다.
   1. ./`crawling.sh`
      1. 크롤링 코드(`main.mjs`)를 실행하는 docker runner를 생성합니다.
      2. `runner`, `directory`, `index` 순서로 입력합니다.
      3. example) `./crawling.sh job tutorial 02`
   2. ./`log-last.sh`
      1. 가장 최근 특정 `runner`에 의해 실행된 `directory`/`index`의 컨테이너 로그를 보여줍니다.
      2. `runner`, `directory`, `index` 순서로 입력합니다.
      3. example) `./log-last.sh job tutorial 02`
   3. ./`clean.sh`
      1. 가장 최근 특정 `runner`에 의해 실행된 `directory`/`index`의 컨테이너를 삭제하고, 그 컨테이너의 결과 디렉토리도 함께 삭제합니다.
      2. `runner`, `directory`, `index` 순서로 입력합니다.
      3. example) `./clean.sh job tutorial 02`
4. 자세한 사용 방법은 [`USAGES.md`](docs/USAGES.md) 를 확인해주세요.

#### With NodeJS

```sh
npm run init
npm run build
./crawling.sh job tutorial 02
```

<br>

## Git Strategy & commit convention

> Git Branching Strategy: [`git workflow`](https://git-scm.com/docs/gitworkflows)

#### `main` branch
    최종 제품 코드. develop branch로부터 PR을 통해 전달함.

#### `develop` branch
    실제 코드 관련 개발. main branch 이전 모든 브랜치 코드를 병합함.

#### `document` branch
    readme, docs 등 문서를 작성함.

---

> Commit convention: [`Udacity Commit Message Convention`](https://udacity.github.io/git-styleguide/)

<br>

## License

Apache 2.0 License


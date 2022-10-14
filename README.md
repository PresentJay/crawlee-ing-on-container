# Crawlee-ing on container project!

- NodeJS 기반 컨테이너 + Crawlee 오픈소스 테스트용 레포지토리입니다.

## Features

- Docker-compose 기반으로 Crawlee 오픈소스 테스트를 수행합니다.


> 목표 1. Crawlee Doc을 따라 on-boarding
> 목표 2. .env 파일로 Crawlee 크롤링 결과를 저장하도록 구성

목표는 진행 과정에서 유동적으로 추가됩니다.

<br>

## Prerequisite

프로젝트를 시작하기 전에 필요한 환경입니다.

| Environment | Tested Version |
| ------ | ------ |
| docker Engine | v20.10.11 |
| Git | 2.35.3 |
| NodeJs | >= 16v |


<br>

## Getting Start

#### Installation
작업 예정!

```sh
docker-compose -f ./docker/docker-compose.yml up
```

#### Project Init

```sh
npm run init
```

<br>

## Git Strategy & commit convention

> Git Branching Strategy: [`git workflow`](https://git-scm.com/docs/gitworkflows)

<br>

#### `develop` branch
    실제 코드 관련 개발

#### `document` branch
    readme, docs 등 문서 관련 작성

#### `container` branch
    dockerfile, docker-compose 등 컨테이너 관리 코드 개발


> Commit convention: [`Udacity Commit Message Convention`](https://udacity.github.io/git-styleguide/)

<br>

## License

Apache 2.0 License


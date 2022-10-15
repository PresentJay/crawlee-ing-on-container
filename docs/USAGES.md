## USAGES

#### build (nodejs를 설치하지 않은 경우)

: `nodejs`를 설치하지 않은 경우, `docker/dev`의 이미지를 활용해, 컨테이너 안에서 작업합니다.

```sh
npm run build
```

<br>

#### build (nodejs를 설치한 경우)

```sh
npm run build-job
```

<br>

#### build에 실패한 이미지가 있는 경우

: `<None/None>` docker image가 쌓이면, 상당히 많은 용량을 차지할 수 있음.

```sh
npm run prune-image
```

##### expected result

```sh
> crawlee-ing-on-container@1.0.0 prune-image /$SOMEDIR/crawlee-ing-on-container
> docker rmi $(docker images -f "dangling=true" -q)

Deleted: sha256:3c7dca9ad47f1e1d534808ad6077661a2f81c1d97df590f85e53805405ade000
```

<br>

#### RUN docs/tutorials
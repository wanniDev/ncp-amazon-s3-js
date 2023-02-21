# NCP fileStorage 실습

## 실습 환경

- Node.js v18.13.0
- ncp, Object Storage

> ncp 계정이 없으신 분은 먼저 가입을 하신 후에, https://guide.ncloud-docs.com/docs/objectstorage-start 를 참고하여, Object Storage에 대해 간략하게 파악해보시고 수동으로 버킷 생성 및 파일 추가/삭제 등의 실습을 해보시는 걸 추천드립니다.
>
> 코드를 실행하기 전에 꼭 본인의 access_key와 secret_key를 발급받고 해당 키를 코드에 반영해주십시오.
>
> 코드를 읽어보면서 실습하게 하기 위해 js 마다 object_name 등 ncp object 식별자 이름을 조금씩 다르게 작성하였습니다.
>
> 소스코드는 https://guide.ncloud-docs.com/docs/storage-storage-8-4 에 있는 코드를 참고하였습니다.

## 실습 방법

### SDK 설치

```javascript
npm install --save aws-sdk@2.348.0
```

### ncp amazon s3 api test

> 1. 버킷 생성

```shell
$ node createBucket.js
```

> 2. 버킷 삭제

```shell
$ node deleteBucket.js
```

> 3. 버킷 목록 조회

```shell
$ node findBucketList.js
```

> 4. 파일 업로드

```shell
$ node fileUpload.js
```

> 5. 특정 버킷의 파일 목록 조회

```shell
$ node fileList.js
```

그 밖에 기능은 전체적인 문맥 흐름이 동일해서 생략하였습니다. 더 실습을 원하시는 분은 https://guide.ncloud-docs.com/docs/storage-storage-8-4 의 **파일 삭제** 항목부터 살펴봐주세요.
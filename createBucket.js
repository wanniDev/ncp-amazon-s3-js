// https://guide.ncloud-docs.com/docs/storage-storage-8-4
const AWS = require('aws-sdk')

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';

/** 콘솔 -> 계정 관리 -> 인증키 관리 탭에서 확인 */
const access_key = 'ACCESS_KEY';
const secret_key = 'SECRET_KEY';

const S3 = new AWS.S3({
    endpoint,
    region,
    credentials: {
        accessKeyId : access_key,
        secretAccessKey: secret_key
    }
});

const bucket_name = 'hello-sample';

(async () => {
    await S3.createBucket({
        Bucket: bucket_name,
        CreateBucketConfiguration: {}
    }).promise()
})();
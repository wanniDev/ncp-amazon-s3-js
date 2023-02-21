// https://guide.ncloud-docs.com/docs/storage-storage-8-4
const AWS = require('aws-sdk');
const fs = require('fs');

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';

/** 콘솔 -> 계정 관리 -> 인증키 관리 탭에서 확인 */
const access_key = 'ACCESS_KEY';
const secret_key = 'SECRET_KEY';

const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId : access_key,
        secretAccessKey: secret_key
    }
});

const bucket_name = 'hello-object-storage';
const local_file_path = './hello-world.jpg';

(async () => {

    let object_name = 'sample-folder/';
    // create folder
    await S3.putObject({
        Bucket: bucket_name,
        Key: object_name
    }).promise();

    object_name = 'sample-folder/sample-image.jpg';

    // upload file
    await S3.putObject({
        Bucket: bucket_name,
        Key: object_name,
        ACL: 'public-read',
        // ACL을 지우면 전체 공개되지 않습니다.
        Body: fs.createReadStream(local_file_path)
    }).promise();

})();
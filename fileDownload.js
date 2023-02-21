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
const object_name = 'sample-folder/sample-image.jpg';
const local_file_path = './tmp/test.jpg';


(() => {
    /** 자동으로 디렉토리를 만들어주는 기능은 없습니다. 따라서, 'local_file_path'에 작성한 디렉토리는 꼭 미리 만들어두셔야 합니다. */
    let outStream = fs.createWriteStream(local_file_path);
    let inStream = S3.getObject({
        Bucket: bucket_name,
        Key: object_name
    }).createReadStream();

    inStream.pipe(outStream);
    inStream.on('end', () => {
        console.log("Download Done");
    });

})();
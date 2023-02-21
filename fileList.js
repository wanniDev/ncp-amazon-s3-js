const AWS = require('aws-sdk');

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
const MAX_KEYS = 300;

var params = {
    Bucket: bucket_name,
    MaxKeys: MAX_KEYS,
    FetchOwner: true
};

(async () => {

    // List All Objects
    console.log("List All In The Bucket");
    console.log("==========================");

    while (true) {
    
        let response = await S3.listObjectsV2(params).promise();

        console.log(`IsTruncated = ${response.IsTruncated}`);
        console.log(
            `ContinuationToken = ${response.ContinuationToken ? response.ContinuationToken : null}`
        );
        console.log(
            `NextContinuationToken = ${
                response.NextContinuationToken ? response.NextContinuationToken : null
            }`
        );
        console.log(`  Object Lists`);
        for (let content of response.Contents) {
            console.log(
                `    Name = ${content.Key}, Size = ${content.Size}, Owner = ${content.Owner.ID}`
            );
        }

        if (response.IsTruncated) {
            params.ContinuationToken = response.NextContinuationToken;
        } else {
            break;
        }
        
    }

    // List Top Level Folder And Files
    params.Delimiter = "/";
    console.log("Top Level Folders And Files In The Bucket");
    console.log("==========================");

    while (true) {
    
        let response = await S3.listObjectsV2(params).promise();

        console.log(`IsTruncated = ${response.IsTruncated}`);
        console.log(
            `ContinuationToken = ${response.ContinuationToken ? response.ContinuationToken : null}`
        );
        console.log(
            `NextContinuationToken = ${
                response.NextContinuationToken ? response.NextContinuationToken : null
            }`
        );

        console.log(`  Folder Lists`);
        for (let folder of response.CommonPrefixes) {
            console.log(`    Name = ${folder.Prefix}`);
        }

        console.log(`  File Lists`);
        for (let content of response.Contents) {
            console.log(
                `    Name = ${content.Key}, Size = ${content.Size}, Owner = ${content.Owner.ID}`
            );
        }

        if (response.IsTruncated) {
            params.ContinuationToken = response.NextContinuationToken;
        } else {
            break;
        }
    }
    
})();
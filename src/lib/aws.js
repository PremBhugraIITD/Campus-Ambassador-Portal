import AWS from 'aws-sdk'; // Import the entire CommonJS module

// Destructure what you need from the imported AWS object
const { config, S3: _S3 } = AWS;

config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION // e.g. 'us-east-1'
});

const S3 = new _S3();

const uploadFileBufferToS3 = (fileBuffer, bucketName, folderName, fileName, mimeType) => {
    return new Promise((resolve, reject) => {
        const key = `${folderName}/${fileName}`; // Folder path + file name

        const params = {
            Bucket: bucketName,
            Key: key,                  // S3 object key (folder + filename)
            Body: fileBuffer,          // File buffer
            ContentType: mimeType      // Set content type based on file MIME type
        };

        S3.upload(params, (err, data) => {
            if (err) {
                console.error("Error uploading file:", err);
                reject(err); // Reject the Promise if there is an error
            } else {
                console.log(`File uploaded successfully to ${data.Location}`);
                resolve(data.Location); // Resolve the Promise with the file URL
            }
        });
    });
};

export { uploadFileBufferToS3 };

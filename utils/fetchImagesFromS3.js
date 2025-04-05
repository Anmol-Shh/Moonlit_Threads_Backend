import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import { s3Client } from '../config/aws.js'; 

const fetchImagesFromS3 = async () => {
    try {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: 'MensCollection/',
        };

        const command = new ListObjectsV2Command(params);
        const response = await s3Client.send(command);

        const images = [];
        if (response.Contents) {
            response.Contents.forEach((item) => {
                const key = item.Key;
                const folderMatch = key.match(/MensCollection\/([^/]+)\//);

                if (folderMatch) {
                    const folder = folderMatch[1];
                    images.push({
                        folder,
                        url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
                    });
                }
            });
        }

        return images;
    } catch (error) {
        console.error('Error fetching images from S3:', error);
        throw error;
    }
};

export default fetchImagesFromS3;

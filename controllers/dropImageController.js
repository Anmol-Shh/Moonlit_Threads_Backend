import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
    region: process.env.AWS_REGION
});

export const fetchDropImages = async (req, res) => {
    try {
        const listParams = {
            Bucket: process.env.AWS_DROP_BUCKET_NAME,
            Prefix: 'LatestDropPictures/' // Fetch all objects directly inside this folder
        };

        const command = new ListObjectsV2Command(listParams);
        const response = await s3Client.send(command);

        const allImages = [];

        if (response.Contents) {
            response.Contents.forEach(item => {
                const key = item.Key; // Full object key

                // Ensure we're not adding the folder itself (sometimes S3 returns the folder as an object)
                if (key !== 'LatestDropPictures/') {
                    allImages.push(`https://${process.env.AWS_DROP_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`);
                }
            });
        }

        res.json({ images: allImages });
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Error fetching images', details: error.message });
    }
};

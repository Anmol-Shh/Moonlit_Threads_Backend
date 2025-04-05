// controllers/imageController.js

import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

// Remove explicit credentials if you're using environment variables or the default AWS credential provider chain
const s3Client = new S3Client({
    region: process.env.AWS_REGION // Only specify region here
});

export const fetchMenImages = async (req, res) => {
    try {
        const listParams = {
            Bucket: process.env.AWS_MEN_BUCKET_NAME,
            Prefix: 'MensCollection/' // Root folder
        };

        const command = new ListObjectsV2Command(listParams);
        const response = await s3Client.send(command);

        const allImages = {};

        if (response.Contents) {
            response.Contents.forEach(item => {
                const key = item.Key; // Full path, e.g., MensCollection/BlueTrench_Coat/image1.jpg

                const folderMatch = key.match(/MensCollection\/([^/]+)\//);
                if (folderMatch) {
                    const folder = folderMatch[1]; // e.g., "BlueTrench_Coat"

                    if (!allImages[folder]) {
                        allImages[folder] = [];
                    }

                    // Add the full image URL
                    allImages[folder].push(`https://${process.env.AWS_MEN_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`);
                }
            });
        }

        res.json(allImages);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Error fetching images', details: error.message });
    }
};

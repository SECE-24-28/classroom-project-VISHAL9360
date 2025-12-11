const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed'));
    }
});

// Upload product image
router.post('/product-image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const blobServiceClient = req.app.locals.blobServiceClient;

        if (blobServiceClient) {
            // Upload to Azure Blob Storage
            const containerClient = blobServiceClient.getContainerClient('product-images');
            const blobName = `${uuidv4()}-${req.file.originalname}`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            await blockBlobClient.uploadData(req.file.buffer, {
                blobHTTPHeaders: { blobContentType: req.file.mimetype }
            });

            const imageUrl = blockBlobClient.url;

            res.json({
                message: 'Image uploaded successfully',
                url: imageUrl,
                filename: blobName
            });
        } else {
            // Mock response for development
            res.json({
                message: 'Image uploaded successfully (mock)',
                url: `https://via.placeholder.com/400?text=${req.file.originalname}`,
                filename: req.file.originalname,
                mock: true
            });
        }

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

// Upload review images
router.post('/review-images', upload.array('images', 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const blobServiceClient = req.app.locals.blobServiceClient;
        const uploadedUrls = [];

        if (blobServiceClient) {
            const containerClient = blobServiceClient.getContainerClient('review-images');

            for (const file of req.files) {
                const blobName = `${uuidv4()}-${file.originalname}`;
                const blockBlobClient = containerClient.getBlockBlobClient(blobName);

                await blockBlobClient.uploadData(file.buffer, {
                    blobHTTPHeaders: { blobContentType: file.mimetype }
                });

                uploadedUrls.push(blockBlobClient.url);
            }
        } else {
            // Mock response
            uploadedUrls.push(...req.files.map(f => `https://via.placeholder.com/400?text=${f.originalname}`));
        }

        res.json({
            message: 'Images uploaded successfully',
            urls: uploadedUrls,
            count: uploadedUrls.length
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to upload images' });
    }
});

module.exports = router;

import fileSchema from '../models/Schema.js';

export const uploadImage = async (request, response) => {
    if (!request.file) {
        return response.status(400).json({ error: 'No file uploaded' });
    }

    const fileObj = {
        path: request.file.path,
        name: request.file.originalname,
        downloadCount: 0
    };
    
    try {
        const file = await fileSchema.create(fileObj);
        response.status(200).json({ path: `http://localhost:3000/file/${file._id}` });
    } catch (error) {
        console.error('Upload error:', error.message);
        response.status(500).json({ error: 'File upload failed. Please try again later.' });
    }
};

export const getImage = async (request, response) => {
    try {   
        const file = await fileSchema.findById(request.params.fileId);
        if (!file) {
            return response.status(404).json({ msg: 'File not found' });
        }

        file.downloadCount++;
        await file.save();

        response.download(file.path, file.name, (err) => {
            if (err) {
                console.error('File download error:', err.message);
                response.status(500).json({ msg: 'Failed to download file.' });
            }
        });
    } catch (error) {
        console.error('Get image error:', error.message);
        response.status(500).json({ msg: 'An error occurred while retrieving the file.' });
    }
};

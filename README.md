# FileUpload Project

This project provides functionality to upload various types of media files (images, videos) locally and to Cloudinary, along with reducing image size. It also sends emails to users who upload media files, providing them with a link to access their uploaded files.

## Features

- **Local File Upload**: Upload media files (images, videos) locally using Express.js and `express-fileupload`.
- **Cloudinary Integration**: Upload images and videos to Cloudinary using the Cloudinary API.
- **Image Size Reduction**: Reduce the size of uploaded images using Cloudinary transformations.
- **Email Notifications**: Send email notifications to users upon successful media file upload, providing them with a link to access their uploaded files.
- **MongoDB Integration**: Store metadata of uploaded files in a MongoDB database using Mongoose.
- **Testing**: Test the endpoints using Postman.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js and npm
- MongoDB
- Postman (for testing)

## Setup

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Install dependencies:

    ```bash
    cd FileUpload
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```plaintext
    PORT=3000
    MONGODB_URI=<mongodb_connection_string>
    MAIL_HOST=<smtp_host>
    MAIL_USER=<email_address>
    MAIL_PASS=<email_password>
    CLOUDINARY_CLOUD_NAME=<cloudinary_cloud_name>
    CLOUDINARY_API_KEY=<cloudinary_api_key>
    CLOUDINARY_API_SECRET=<cloudinary_api_secret>
    ```

4. Start the server:

    ```bash
    npm start
    ```

## Endpoints

### 1. Local File Upload

- **POST** `/api/localFileUpload`

  Upload a media file (image or video) locally.

### 2. Image Upload to Cloudinary

- **POST** `/api/imageUpload`

  Upload an image to Cloudinary.

### 3. Video Upload to Cloudinary

- **POST** `/api/videoUpload`

  Upload a video to Cloudinary.

### 4. Image Size Reduction

- **POST** `/api/imageSizeReducer`

  Reduce the size of an uploaded image using Cloudinary transformations.

## Testing

You can test the endpoints using Postman. Import the provided Postman collection (`FileUpload.postman_collection.json`) and use the collection to test the endpoints.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

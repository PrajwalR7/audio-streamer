## Audio streamer

### How to use

#### Setting up frontend

1. Go into `frontend` directory
2. Run the command `npm run dev` - frontend page will be visible in the (url)[http://localhost:5173]

#### Setting up backend

1. Go back to the root folder if you are not already in it
2. Run the following command:
 - `docker build -t <IMAGE_NAME> .`
 This will build the image
3. Once the image is built run the following command
 - `docker run -p 8000:8000 <IMAGE_NAME>`
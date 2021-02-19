# pi-pro
API Server for a Raspberry PI to start a RTMP streaming


## Start server
### Configuration file
Add a `.env` file to the root of the project. A `sample-env` file is provided as example.

```
PORT="8000"

STREAM_WIDTH="640"
STREAM_HEIGHT="480"
STREAM_FPS="10"
STREAM_BITRATE="638000"
```

Build and start the server.

```
npm i
npm run build
npm start
```

## Start streaming
To start streaming from your PI, access the server via GET (use any browser) to the `/start?url=URL` path.
```
http://localhost:8000/start?url=rtmp://a.rtmp.youtube.com/live2/2381064704308020376
```

Use the RTMP url provided by your streaming platform. The previous is an example from Youtube.

## Stop streaming
To stop the streaming, access the server via GET (use any browser) to the `/stop` path.
```
http://localhost:8000/stop
```

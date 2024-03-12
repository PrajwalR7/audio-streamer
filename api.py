from fastapi import FastAPI, WebSocket
from const import subtitles
import uvicorn
import json

app = FastAPI()

async def stream_audio_and_subtitles(websocket: WebSocket):
    audio_file_path = "audio.wav"

    with open(audio_file_path, "rb") as audio_file:
        while True:
            data = audio_file.read(65536)
            if not data:
                break
            await websocket.send_bytes(data)
    subtitle_json = json.dumps(subtitles)
    await websocket.send_text(subtitle_json)
    await websocket.close()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    await stream_audio_and_subtitles(websocket)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
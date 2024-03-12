FROM ubuntu:latest

RUN apt-get update

RUN apt-get install -y ffmpeg

RUN apt-get install -y python3 python3-pip
RUN pip3 install https://github.com/yt-dlp/yt-dlp/archive/master.tar.gz
RUN ffmpeg_path=$(which ffmpeg)\
    && yt-dlp --extract-audio https://www.youtube.com/watch?v=OoQLoKHhohg --audio-format wav --ffmpeg $ffmpeg_path --output audio.wav
RUN pip3 install fastapi \
    && pip3 install uvicorn

WORKDIR /app
COPY . .

CMD [ "python3", "api.py" ]

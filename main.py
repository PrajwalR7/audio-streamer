import subprocess
# from pytube import YouTube
# from youtube_transcript_api import YouTubeTranscriptApi

command = ["yt-dlp", "--extract-audio", "https://www.youtube.com/watch?v=OoQLoKHhohg", "--audio-format", "wav", "--ffmpeg", "C:/Users/prajw/Downloads/ffmpeg-master-latest-win64-gpl/ffmpeg-master-latest-win64-gpl/bin"]
subprocess.run(command)

# transcript = YouTubeTranscriptApi.get_transcript("OoQLoKHhohg")
# print(transcript)
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { BACKEND_SERVER_URL } from './const';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [audioData, setAudioData] = useState([]);
  const [transcript, setTranscript] = useState([])
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null);

  useEffect(() => {
    const wsConnection = new WebSocket(BACKEND_SERVER_URL)

    wsConnection.onopen = () => {
      console.log('WebSocket connection opened');
      setIsLoading(true);
    };

    wsConnection.onmessage = (event) => {
      if (typeof event.data !== "string") {
        const chunk = event.data;
        setAudioData((prevData) => [...prevData, chunk]);
      } else {
        console.log(JSON.parse(event.data))
        setTranscript(JSON.parse(event.data.toString()))
      }
    };

    wsConnection.onclose = () => {
      console.log('WebSocket connection closed')
      setIsLoading(false);
    };

    return () => {
      wsConnection.close()
    };
  }, []);


  useEffect(() => {
    if (transcript.length > 0 && playing) {
      if (index === transcript.length-1) {
        setTimeout(() => {
          setIndex(index+1)
        }, (transcript[index+1]["duration"]*1000))
      } else {
        setTimeout(() => {
          setIndex(index+1)
        }, (transcript[index+1]["start"]-transcript[index]["start"])*1000)
      }
    }
  }, [transcript, index, playing])

  const handlePlay = () => {
    if (audioData.length > 0) {
      const combinedAudio = new Blob(audioData, { type: 'audio/wav' });
      const audioURL = URL.createObjectURL(combinedAudio);
      audioRef.current.src = audioURL;
      audioRef.current.play();
      setPlaying(true)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isLoading ? (
        <div className="flex items-center justify-center space-x-4">
          <div className="w-6 h-6 bg-gray-200 animate-ping rounded-full"></div>
          <p className="text-gray-700">Loading audio...</p>
        </div>
      ) : (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlePlay}
          >
            {playing ? 'Playing....' : 'Play audio'} 
          </button>
          <audio ref={audioRef} controls style={{ display: 'none' }} />
          <div className="caption-container">
          {transcript.length > 0 && playing && transcript[index]["text"]}
        </div>
        </>
      )}
    </div>
  );
};

export default App;

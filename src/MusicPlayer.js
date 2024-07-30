import React, { useState, useRef, useEffect } from 'react';
import screenfull from 'screenfull';
import './MusicPlayer.css';

const songs = [
  { id: 1, title: 'Song One', url: ' https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3.' },
  { id: 2, title: 'Song Two', url: '/songs/song2.mp3' },
  { id: 3, title: 'Song Three', url: '/songs/song3.mp3' },
];

const MusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const audioRef = useRef(null);
  const playerRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(playerRef.current);
      setIsFullscreen(!isFullscreen);
    }
  };

  const changeSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true); // Set to play new song
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false); // Fallback if play fails
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  return (
    <div ref={playerRef} className={`music-player ${isFullscreen ? 'fullscreen' : ''}`}>
      <h1>Music Player</h1>
      <div className="controls">
        <button onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={toggleFullscreen}>
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>
      <div className="current-song">
        <h2>{currentSong.title}</h2>
        <audio
          ref={audioRef}
          src={currentSong.url}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls
          className="audio-element"
        />
      </div>
      <div className="song-list">
        <h3>Song List</h3>
        <ul>
          {songs.map((song) => (
            <li key={song.id} onClick={() => changeSong(song)}>
              {song.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MusicPlayer;

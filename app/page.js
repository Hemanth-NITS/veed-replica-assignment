"use client";
import { useState, useRef } from 'react';
import { AppShell } from '@mantine/core';
import LeftMenu from '../components/LeftMenu';
import Canvas from '../components/Canvas';

export default function Home() {
  const [media, setMedia] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackMode, setPlaybackMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef(null);

  const handlePlay = () => {
    if (!media) return;
    setPlaybackMode(true);
    setIsPlaying(true);
    setCurrentTime(media.startTime);
    intervalRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev < media.endTime) return prev + 1;
        clearInterval(intervalRef.current);
        setIsPlaying(false);
        return prev;
      });
    }, 1000);
  };

  const updateMediaProps = (props) => {
    setMedia((prev) => ({ ...prev, ...props }));
  };

  return (
    <AppShell style={{ height: '100vh' }} header={{ height: 60 }}>
      <AppShell.Header
        style={{
          backgroundColor: '#216DFF',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        <h2 style={{ margin: 0 }}>Veed Replica</h2>
      </AppShell.Header>

      {/* Custom flex container for splitting the layout */}
      <div style={{ display: 'flex', height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <div style={{ width: 300, flexShrink: 0, backgroundColor: '#eeeeee' }}>
          <LeftMenu
            media={media}
            updateMediaProps={updateMediaProps}
            handlePlay={handlePlay}
          />
        </div>

        {/* Main Canvas Area */}
        <div style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
          <Canvas
            media={media}
            setMedia={setMedia}
            isPlaying={isPlaying}
            currentTime={currentTime}
            playbackMode={playbackMode}
          />
        </div>
      </div>
    </AppShell>
  );
}

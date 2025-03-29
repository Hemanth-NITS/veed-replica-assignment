"use client";
import { Rnd } from 'react-rnd';

export default function Canvas({ media, setMedia, isPlaying, currentTime, playbackMode }) {
  const isMediaVisible = playbackMode
    ? (isPlaying && currentTime >= media.startTime && currentTime <= media.endTime)
    : true;

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: 'calc(100vh - 60px)', 
        border: '2px dashed #ddd', 
        backgroundColor: '#f8f9fa', 
        overflow: 'hidden'
      }}
    >
      {!media && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          fontSize: 16,
          color: '#999'
        }}>
          Please upload an image or video from the left menu.
        </div>
      )}
      {media && isMediaVisible && (
        <Rnd
          size={{ width: media.width, height: media.height }}
          position={{ x: media.x, y: media.y }}
          onDragStop={(e, d) => {
            setMedia((prev) => ({ ...prev, x: d.x, y: d.y }));
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            setMedia((prev) => ({ 
              ...prev, 
              width: ref.offsetWidth, 
              height: ref.offsetHeight, 
              ...position 
            }));
          }}
          bounds="parent"
        >
          {media.type === 'video' ? (
            <video 
              src={media.url} 
              width="100%" 
              height="100%" 
              controls 
              style={{ objectFit: 'cover' }}
              draggable={false}
            />
          ) : (
            <img 
              src={media.url} 
              alt="uploaded" 
              width="100%" 
              height="100%" 
              style={{ 
                objectFit: 'cover', 
                userSelect: 'none',
                WebkitUserDrag: 'none'
              }}
              draggable={false}
            />
          )}
        </Rnd>
      )}
    </div>
  );
}
import React, { useRef, useEffect, useState } from 'react';

const ZoomableIframe = ({ url, idealWidth = 1024, idealHeight = 768 }) => {
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.1, 3)); // Limit zoom in to 3x
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.1, minZoom)); // Limit zoom out to minZoom
  };

  useEffect(() => {
    const adjustZoom = () => {
      if (containerRef.current && iframeRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const scaleX = containerWidth / idealWidth;
        const scaleY = containerHeight / idealHeight;
        const scale = Math.min(scaleX, scaleY);
        setZoom(scale);
        setMinZoom(scale);
      }
    };

    adjustZoom();
    window.addEventListener('resize', adjustZoom);

    return () => {
      window.removeEventListener('resize', adjustZoom);
    };
  }, [idealWidth, idealHeight]);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.style.transform = `scale(${zoom})`;
      iframeRef.current.style.transformOrigin = 'top left';
      iframeRef.current.style.width = `${idealWidth}px`;
      iframeRef.current.style.height = `${idealHeight}px`;
    }
  }, [zoom, idealWidth, idealHeight]);

  return (
    <div ref={containerRef} className="relative w-full h-full border rounded shadow-lg overflow-auto">
      <iframe
        ref={iframeRef}
        src={url}
        className="absolute top-0 left-0"
        frameBorder="0"
        title="Zoomable and Scrollable HTML Page"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-white bg-opacity-75 flex justify-center space-x-2">
        <button
          onClick={handleZoomOut}
          className="px-2 py-1 bg-gray-300 rounded shadow hover:bg-gray-400"
        >
          -
        </button>
        <button
          onClick={handleZoomIn}
          className="px-2 py-1 bg-gray-300 rounded shadow hover:bg-gray-400"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ZoomableIframe;

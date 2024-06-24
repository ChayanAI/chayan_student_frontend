import React, { useState } from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfViewer = ({ pdfUrl }) => {
    const [scale, setScale] = useState(1);

    const zoomIn = () => {
        setScale(scale + 0.5);
    };

    const zoomOut = () => {
        setScale(scale - 0.5);
    };

    const resetZoom = () => {
        setScale(1);
    };

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', border: '1px solid #ddd' }}>
            <div style={{ marginBottom: '8px' }}>
                {/* <button onClick={zoomIn} style={{ marginRight: '8px' }}>Zoom In</button>
                <button onClick={zoomOut} style={{ marginRight: '8px' }}>Zoom Out</button>
                <button onClick={resetZoom}>Reset Zoom</button> */}
            </div>
            <div style={{ width: '100%', height: 'calc(100% - 40px)', overflow: 'auto' }}>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={pdfUrl}>
                        {({ error }) => ( // Handle error state
                            error ? <div>Failed to load PDF: {error.message}</div> : null
                        )}
                    </Viewer>
                </Worker>
            </div>
        </div>
    );
};

export default PdfViewer;

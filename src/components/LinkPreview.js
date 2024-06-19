import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LinkPreview = ({ url, customStyle = {} }) => {
    const [metadata, setMetadata] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching metadata for:', url);
                const response = await fetch(`https://link-preview-library.vercel.app/api/preview?url=${encodeURIComponent(url)}`);
                const data = await response.json();
                console.log('Data returned:', data);
                setMetadata(data);
            } catch (error) {
                setError('Failed to fetch metadata: ' + error.message);
            }
        };
        if (!url) {
            console.log('URL is required');
            return;
        }
        fetchData();
    }, [url]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!metadata) {
        return <div>
            <div className="animate-pulse bg-gray-200 w-full h-64 rounded-t"></div>
            <div className="p-4">
                <div className="animate-pulse bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
                <div className="animate-pulse bg-gray-200 h-4 w-1/2 mb-2 rounded"></div>
                <div className="animate-pulse bg-gray-200 h-4 w-1/3 mb-2 rounded"></div>
            </div>
        </div>;
    }

    return (
        <a href={metadata.url} target="_blank" rel="noopener noreferrer">
        <div style={customStyle} className="p-1 rounded shadow bg-white">
            {metadata.image && <img src={metadata.image} alt={metadata.title} className="w-full h-64 object-cover rounded-t" />}
            <div className="p-4">
                <h2 className="text-xl font-bold">{metadata.title}</h2>
                <p className="text-gray-700">{metadata.description}</p>
                <a href={metadata.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">Read more</a>
            </div>
        </div>
        </a>
    );
};

LinkPreview.propTypes = {
    url: PropTypes.string.isRequired,
    customStyle: PropTypes.object,
};

export default LinkPreview;
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LinkPreview = ({ url, customStyle }) => {
    const [metadata, setMetadata] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/preview?url=${encodeURIComponent(url)}`);
                const data = await response.json();
                setMetadata(data);
            } catch (error) {
                setError('Failed to fetch the URL');
            }
        };
        fetchData();
    }, [url]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!metadata) {
        return <div>Loading...</div>;
    }

    return (
        <div style={customStyle} className="p-4 rounded shadow bg-white">
            {metadata.image && <img src={metadata.image} alt={metadata.title} className="w-full h-64 object-cover rounded-t" />}
            <div className="p-4">
                <h2 className="text-xl font-bold">{metadata.title}</h2>
                <p className="text-gray-700">{metadata.description}</p>
                <a href={metadata.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">Read more</a>
            </div>
        </div>
    );
};

LinkPreview.propTypes = {
    url: PropTypes.string.isRequired,
    customStyle: PropTypes.object,
};

LinkPreview.defaultProps = {
    customStyle: {},
};

export default LinkPreview;

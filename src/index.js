import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import LinkPreview from './components/LinkPreview';
import './styles/tailwind.css';

const App = () => {
    const [inputValue, setInputValue] = useState('');
    const [usersUrl, setUsersUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with:', inputValue);
        setUsersUrl(inputValue);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Link Preview Example</h1>
            <form className="mb-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">Submit</button>
            </form>
            {usersUrl && <LinkPreview url={usersUrl} customStyle={{ maxWidth: '400px' }} />}
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);


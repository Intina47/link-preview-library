import React from 'react';
import ReactDOM from 'react-dom';
import LinkPreview from './components/LinkPreview';
import './styles/tailwind.css';

const App = () => (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Link Preview Example</h1>
        <LinkPreview url="https://www.youtube.com/watch?v=OAoJVyoTi78" />
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

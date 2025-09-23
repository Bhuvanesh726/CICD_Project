import React from 'react';
import ReactDOM from 'react-dom/client';
// IMPORT BrowserRouter
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* ADD THE ROUTER WRAPPER HERE WITH THE BASENAME */}
        <BrowserRouter basename="/eventapp">
            <App />
        </BrowserRouter>
    </React.StrictMode>,
);
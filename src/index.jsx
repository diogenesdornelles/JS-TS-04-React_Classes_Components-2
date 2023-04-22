import React from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
import Home from './pages/Home/Home';
import '@fontsource/public-sans';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<Home />);

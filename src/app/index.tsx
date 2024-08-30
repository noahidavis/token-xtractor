import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { Provider } from 'jotai';
import myStore from '../jotai/store';
import '../app/styles/radix.css';
import '../app/styles/index.css'
import { Theme } from '@radix-ui/themes'


document.addEventListener('DOMContentLoaded', () => {
    const entryPoint = document.getElementById('react-entry-point');
    if (entryPoint) {
        const root = createRoot(entryPoint);
        root.render(
        <Provider store={myStore}>
            <Theme accentColor='lime' grayColor='slate'>
                <App />
            </Theme>
        </Provider> 
    );
    }
});

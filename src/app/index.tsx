import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css'

function App() {
    React.useEffect(() => {
        // Listener for messages from controller plugin
        window.onmessage = (msg) => {
            console.log(msg);
        };
    }, []);

    return (
        <div>
            <h2 className="plugin-title">Figma Plugin w/ React</h2>
        </div>
    )
}

document.addEventListener('DOMContentLoaded', function() {
    const entryPoint = document.getElementById('react-entry-point')!;
    const root = createRoot(entryPoint);
    console.log("Entry point found and root created")
    if (root) {
        root.render(<App />)
        console.log("React component mounted")
    } else {
        console.error("Unable to create root and mount React component")
    }
});

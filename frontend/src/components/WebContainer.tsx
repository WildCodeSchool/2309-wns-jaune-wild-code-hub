import React, { useEffect, useState } from 'react';
import { WebContainer } from '@webcontainer/api';

const WebContainerComponent: React.FC = () => {
    const [output, setOutput] = useState<string>('');

    useEffect(() => {
        (async () => {
            // Initialiser WebContainer
            const webcontainer = await WebContainer.boot();

            // Créer un fichier simple
            await webcontainer.fs.writeFile('index.js', 'console.log("Hello, WebContainer!");');

            // Exécuter le fichier
            const process = await webcontainer.spawn('node', ['index.js']);

            // Récupérer la sortie
            process.output.pipeTo(
                new WritableStream({
                    write(data) {
                        setOutput(prev => prev + data);
                    }
                })
            );

            // Attendre la fin du processus
            await process.exit;
        })();
    }, []);

    return (
        <div>
            <h1>WebContainer Output</h1>
            <pre>{output}</pre>
        </div>
    );
};

export default WebContainerComponent;
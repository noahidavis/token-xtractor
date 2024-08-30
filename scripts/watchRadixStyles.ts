
// * NOTE: The purpose of this node script is to automate the process of copying the styles.css from @radix-ui/themes
// * in the node_modules. The recommended approach from Radix is to import the css file at the root of your application
// * (e.g. index.tsx or app.tsx), but I have had significant troubles getting static files to load from the node modules. 
// * I believe the culprit to be the manner in which figma plugins run, in which there is a separate browser and iframe thread,
// * resulting in a weird separation of concerns. After finding finding success copying the file into the src/app/styles directory
// * based on the proposed solution from @maciWils in this github issue (https://github.com/radix-ui/themes/issues/59), this 
// * script was born.

import * as fs from 'fs';
import * as path from 'path';

const source: string = path.resolve(__dirname, '../node_modules/@radix-ui/themes/styles.css');
const destination: string = path.resolve(__dirname, '../src/app/styles/radix.css');

// Copy radix-ui styles.css file
const copyFile = (): void => {
    fs.copyFile(source, destination, (err) => {
        if (err) {
            console.error("Error copying file:", err);
        } else {
            console.log("Radix UI styles.css successfully copied to src/app/styles/radix.css!");
        }
    })
};

// Initial call to copy file
copyFile();

// Watch for changes
fs.watch(source, (eventType) => {
    if (eventType === 'change') {
        console.log('Changes detected in Radix UI styles.css, updating src/app/styles/radix.css');
        copyFile();
    }
});

console.log(`Watching ${source} for changes`);
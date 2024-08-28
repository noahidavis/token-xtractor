# TokenXTractor Figma Plugin

By [Noah I. Davis](https://www.noahidavis.com)

#### About
***tokenXtractor*** is a Figma plugin designed to streamline the creation of design token files from Figma variable collections. This tool enables designers and developers to easily export Figma variables to JSON or CSS variable files, supporting various case styles such as kebab case, camel case, and snake case. Its UI is built using React.js and TypeScript.

### Done
- [x] Basic UI layout ported over from old project
- [x] Fixed variable collection names not populating on plugin start (added delay)
- [x] Fixed CollectionSelector select multiple functionality
- [x] All variable collections appearing in preview pane on plugin run
- [x] Integrated jotai + logic for updating preview based on settings
- [x] Zip folder created + download dialog
- [x] "Remove" 'token-x-tractor/' from tabs

### Need to Do
1. Help modal (content + layout) + Fix help modal button positioning + Jotai state
2. Refresh button functionality + jotai state
3. Overall styling / layout
   - Apply Figma / techworks styling
   - Buttons spacing btw + spacing btw other settings elements
4. Debugging + removing console.logs()
   - Consider removing Select All / Deselect all now that all collections are pulled on plugin run
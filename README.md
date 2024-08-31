# TokenXTractor Figma Plugin

By [Noah I. Davis](https://www.noahidavis.com)

#### About
***tokenXtractor*** is a Figma plugin designed to streamline the creation of design token files from Figma variable collections. This tool enables designers and developers to easily export Figma variables to JSON or CSS variable files, supporting various case styles such as kebab case, camel case, and snake case. Its UI is built using React.js, RadixUI, and 
TypeScript.

### Development
#### To start hot-reloading in Figma:


```bash
npm build:watch
```
*Alternatively:*
1. Enter:  `CMD + Shift + B`
2. Select 'npm build: watch' / 'webpack --mode=development --watch'  

#### To start `watchRadixStyles` script:
```bash
ts-node scripts/watchRadixStyles.ts
```


### To-Do
*The following need to be completed prior to v0.5.0 / beta release:*
- [x] Basic UI layout ported over from old project
- [x] Fixed variable collection names not populating on plugin start (added delay)
- [x] Fixed CollectionSelector select multiple functionality
- [x] All variable collections appearing in preview pane on plugin run
- [x] Integrated jotai + logic for updating preview based on settings
- [x] Zip folder created + download dialog
- [x] "Remove" 'token-x-tractor/' from tabs
- [ ] Help Modal (content + layout) + Fix help button positioning + Jotai state
- [x] Refresh button functionality
  - [x] Move to Collection Selector
- [ ] Overall styling / layout:
  - [x] Integrate RadixUI component library
    - [x] Create automation script to monitor `@radix-ui/themes/styles.css` + update `./src/app/styles/radix.css`
  - [x] Review spacing and layout (specifically buttons)
  - [ ] Apply techworks studio styling
- [ ] Debugging + removing extraneous logging / code
  - [x] *Consider removing Select All / Deselect all now that all collections are pulled by default / on plugin run*
  - [ ] Clean up styling (CSS file vs CSS in JS)
  


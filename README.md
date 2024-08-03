# Figma Plugin React Template (2024)

A lightweight template for creating custom UI Figma plugins using React for the UI component library. This repo was inspired by the [Figma Plugin React Template GitHub Repo](https://github.com/nirsky/figma-plugin-react-template) from @nirsky and the [Building Figma plugins with React](https://blog.logrocket.com/building-figma-plugins-with-react/) article from LogRocket. The goal of this repo is to serve as a streamlined, modern (as of Aug. 2024) starting point for React Figma plugins that leverages dependencies that Figma provides to you out-of-the-box (OOTB).

That having been said, this is a *lightweight* template that does not contain any additional functionality beyond a type declaration for SVGs and some *basic* CSS. The logic for listening to UI messages and creating rectangles, which ships with new Custom UI Figma plugins by default, can be found in [```src/plugin/controller.ts```](./src/plugin/controller.ts), but the corresponding UI code has been removed from ```index.html``` (known as ***ui.html*** for stock/OOTB plugins).


## Prerequisites 
Before getting up and running with this template, please make sure you have the following installed & configured on your machine:
- Node.js
- NPM 

## Installation
1. Clone the repo 
```
git clone https://github.com/inoah01/figma-plugin-react-2024.git  

``` 
2. Open/navigate to the repo directory
```
cd figma-plugin-react-2024

``` 
3. Install dependencies
```
npm install

``` 

## Development
To start development server and watch for changes:  
```npm run build:watch```

## Building
To create a production build (default behavior):
```npm run build```

## Contributing
Feel free to fork this repo + submit pull requests. Contributions are welcome.

## Acknowledgements
Special thanks to:
- [@nirsky](https://github.com/nirsky) for the original [figma-plugin-react-template](https://github.com/nirsky/figma-plugin-react-template)
- LogRocket for the article on [Building Figma plugins using React](https://blog.logrocket.com/building-figma-plugins-with-react/)

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.


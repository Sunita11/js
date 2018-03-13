* Approach: Test Driven Development

* Library: React JS

* Tools: gulp, SASS, uglify, babel compiler
* Testing frameworks : Jasmine + Karma + Sinon

Goal
	* find the nearest ATM using google's geolocation API


Project structure: 
 src:
	|-> images : all images 
 	|-> scripts : all script files (will be compiled)
 	|-> sass :
 		|-> global : all global styling files (reset.scss,variable.scss,normalize.scss etc)
 		|-> modules : all module level style 
 		|-> app.scss : squentially called all files
 	|-> .gitignore : files to be ignored while pushing code to git repository
 	|-> glupfile.js : contains task-running configuration code
 	|-> package.json : contains project's dependencies

 	Running commands:
 	- npx webpack --config webpack.config.js
 	- npm run build
 	- npm run start
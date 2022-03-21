# Basic NodeJS API Without any Framework
This is a basic example to API server builded without any Framework, just JS functions built-ins.
To build this project i used a database based on JSON file, located at /database folder.

## Resume

### Files
We have the structure of this project, next to:
````
	+-- /src
	|	+-- /entities
	|	+-- /factories
	|	+-- /repositories
	|	+-- /services
	|	+-- index.js
	+-- ..
	+-- package.json
	+-- scripts.sh
````
### Instructions
1. To only run this project, use:
	- `npm start`
2. Dev mode:
	- Install dependencies using npm: `npm i`
	- Run `npm run dev`
3. Run tests:
	- Just run `npm test` to use the scripts.sh to test the API.
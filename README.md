# Google Publisher Tag - Pro

## ROAD MAP

- [ ] - Optional size mapping.
- [ ] - Publish project via CI/CD
- [ ] - Unit tests.

## Managing NPM

- Update the project minor version with a prefix:
	```
	$ npm version preminor --preid alpha
	```

- Update the project prerelease version with a prefix:
	```
	$ npm version prerelease --preid=alpha
	```

- Update directly the patch version (for hotfixes):
	```
	$ npm version patch
	```

- Publish the project in NPM
	```
	$ npm publish --access public
	```

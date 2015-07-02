---
layout: doc
title: Setup
---

Setting up to use the ecma402-angular facade can be installed in basically two different forms.

The first is in ["consumer" mode](#consumer) where only the `ibmjs-angular-i18n.js` file is installed.

The second method is ["developer" mode](#developer) and is mainly intended for developers that want to modify ecma402-angular
and/or run the demo program. In this mode not only is the `ibmjs-angular-i18n.js` file is installed but also all the files
needed to run the demo app, the documentation files, and the unit tests.

<a name="consumer"></a>
## Consumer installation

_Bower_ release installation:

    $ bower install ecma402-angularjs

That's it, the `bower.json` will ensure that any prerequisites are satisfied and download the correct js file.



<a name="developer"></a>
## Developer installation

As a developer, the install is more manual and is a simple git repository clone.

git installation:

    $ git clone git://github.com/ibm-js/ecma402-angularjs.git

Then install dependencies with bower (or manually from github if you prefer to):

	$ cd ecma402-angularjs
	$ bower install


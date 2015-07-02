# ecma402-angularjs


## AngularJS facade for ECMA402

This project provides support for AngularJS developers to utilize [ECMA402](https://github.com/ibm-js/ecma402)
functionality but with familiar AngularJS constructs.


## Licensing

This project is licensed under the ["New" BSD License](./LICENSE.md).


## Installation

_Bower_ release installation:

    $ bower install ecma402-angularjs

_Manual_ master installation:

    $ git clone git://github.com/ibm-js/ecma402-angularjs.git

Then install dependencies with bower (or manually from github if you prefer to):

	$ cd ecma402-angularjs
	$ bower install

## Documentation

See [here](docs/index.md) for more complete usage documentation.

### Overview
This facade over the ECMA402 layer is designed to be invoked either by a directive or as filter. Both the directives
and the filters utilize the [AngularJS best practice](https://docs.angularjs.org/guide/directive) of employing a naming
prefix to prevent naming collisions. This prefix is `a9n` (**a**ngular-i18**n**).

The names for the directives & filters were chosen to be intuitive bridging the gap between **AngularJS**
itself and the **ECMA402 api**. Directives follow the form `a9n_{type}Format`. Filters follow the form `a9n_{type}Format`.

The following format types are available:
* date
* number
* currency
* percent


Directive example:
```html
    <span a9n-currency-format="price"></span>
```

Filter example:
```html
    <span ng-bind="amount | a9n_numberFormat"></span>
```

    or

```html
    <td>{{price | a9n_currencyFormat}}</td>
```

Each invocation of a filter or directive can supply optional parameters to control that particular formatting. The first
parameter is an options object that is passed down to the ECMA402 api implementation and may contain a variety of
different formatting options. For further documentation on the ECMA-402 standard `Intl` API and what parameters are
available, see [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)

In addition to the parameters supported by the various ECMA-402 methods, this facade supports including a locale
 parameter in with the other options. This has the benefit of simplifying the calls by not having to always supply a
 separate parameter for the locale. To facilitate a *temporary* override, an additional parameter locale parameter is
 available. This locale parameter overrides any locale in the options parameter. This is meant to permit easy reuse of
 sets of options where only the locale may differ.

```javascript
    var options = {
        locale: 'en',
        year:"numeric",
        month:"numeric",
        day:"numeric"
    }
```
```html
    .
    .
    .
    <td>{{date | a9n_dateFormat:options}}</td>
    <td>{{date | a9n_dateFormat:options:"es"}}</td>
```


## Configuration

The localization service contains the implementation of the calls down to the ECMA402 layer. This service can be
configured to simplify normal usage so that user specific options do not have to be passed on each filter or directive.
Configurations are available for setting a default locale as well as default options for **Date**, **Number**, **Currency** and
**Percent** formatting.

Example of configuration
```javascript
		app.config(['LocalizationServiceProvider', function(LocalizationServiceProvider){
		    LocalizationServiceProvider.setLocale(locale);
			LocalizationServiceProvider.setDefaultDateFormatterOptions({month: "narrow"});
		}]);
```

The demo program utilizes application specific configuration and can be seen in [app.js](./js/app.js)


**For configuring the underlying ECMA402 library** see the [documentation section](https://github.com/ibm-js/ecma402/blob/master/README.md#documentation)
on the ECMA402 page.

## Credits

* Damien Garbarino (IBM)
* Scott Russell (IBM)

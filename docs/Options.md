---
layout: doc
title: Application Options
---

##### Table of Contents
* [Options Description](#description)
* [Options usage](#usage)
* [Options example](#example)

<a name="description"></a>
# Options description

<p>
Application default locale and options can be set via AngularJS app config. This is useful if the application has
many instances that share the same locale and/or options and removes the need to specify the same set of options on
multiple filter/directive instances.
</p>

---

<a name="usage"></a>
# Options usage

<p>Default options available:</p>
 * [setLocale](#setLocale)
 * [setDefaultDateFormatterOptions](#setDateFormat)
 * [setDefaultDecimalFormatterOptions](#setDecimalFormat)
 * [setDefaultCurrencyFormatterOptions](#setCurrencyFormat)
 * [setDefaultPercentFormatterOptions](#setPercentFormat)

<a name="setLocale"></a>
##setLocale
<p>Sets the application default locale if none is specified.</p>
<p>aLocale: the locale to use.</p>

		setLocale(aLocale);

---

<a name="setDateFormat"></a>
##setDateFormat
<p>Sets the default options of the date formatter if none are specified.</p>
<p>options: the date formatter options</p>

		setDefaultDateFormatterOptions(options);

---

<a name="setDecimalFormat"></a>
##setDecimalFormat
<p>Sets the default options of the decimal number formatter if none are specified.</p>
<p>options: the decimal number formatter options</p>

		setDefaultDecimalFormatterOptions(options);

---

<a name="setCurrencyFormat"></a>
##setCurrencyFormat
<p>Sets the default options of the currency formatter if none are specified.</p>
<p>options: the currency formatter options</p>

		setDefaultCurrencyFormatterOptions(options);

---

<a name="setPercentFormat"></a>
##setPercentFormat
<p>Sets the default options of the percent number formatter if none are specified.</p>
<p>options: the percent number formatter options</p>


		setDefaultPercentFormatterOptions(options);


---

---

<a name="example"></a>
# Example

<p>
This is example is taken directly from the demo app.
</p>

```js
    app.config(['LocalizationServiceProvider', function(LocalizationServiceProvider){
        LocalizationServiceProvider.setLocale("en");
        // Example of configuration the default format of dates
        //
        LocalizationServiceProvider.setDefaultDateFormatterOptions({
        	year: "numeric",
	        month: "long",
        	day: "numeric",
	        hour: "numeric",
    	    minute: "numeric",
    	    second: "numeric"
        });
        LocalizationServiceProvider.setDefaultCurrencyFormatterOptions({
        	currency: "USD"
        })
    }]);
```



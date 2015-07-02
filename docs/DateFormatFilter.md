---
layout: doc
title: DateFormatFilter
---

# DateFormatFilter
The DateFormat filter provides formatting of a date object based on the ECMA-402 Internationalization API as
implemented by ibm-js/ecma402.

##### Table of Contents
* [Filter options](#options)
* [Filter usage](#usage)

<a name="options"></a>

## Format options

<p>By supplying options you control how a number is formatted. Options are defined as per the ECMA-402 DateFormat API</p>

---

For details on the specific options available from the ECMA-402 standard DateFormat API , see
[Mozilla Developer Network: Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat)


---

---


<a name="usage"></a>
## Filter usage
<p>The `a9n_dateFormat` filter provides the means to format a javascript date object correctly for a
specific locale. Honoring that locales language and formatting style.</p>

<p>Formatting options are derived either from the
default application values or supplied on the individual command.</p>

<p>Typical use case is to use the filter inside a span tag as in the following examples.</p>

<p>This example shows using the application default values for formatting a variable `myDate`</p>
```html
    <span ng-bind="date | a9n_dateFormat"></span>
```
<p>produces a result, *assuming the default application values were not modified*, such as:</p>
```html
    July 9, 1979 at 12:30:00 AM
```
---

<p>This example shows using an empty options argument which causes the underlying implementation defaults to be applied
for formatting a variable `date`</p>
```html
    <span ng-bind="date | a9n_dateFormat:{}"></span>
```
<p>produces a result such as:</p>
```html
    7/9/1979
```
---

<p>This example shows using a custom options argument which specifies numeric values for day & year but a short version
of the month that are applied for formatting a variable `date`</p>
```html
    <span ng-bind="date | a9n_dateFormat:{year: 'numeric', month: 'short', day: 'numeric'}"></span>
```
<p>produces a result such as:</p>
```html
    Jul 9, 1979
```
---

<p>This example shows using a specific locale to format the output of the variable `date` in German.</p>
```html
    <span ng-bind="date | a9n_dateFormat:{locale:'de'}"></span>
```
<p>produces a result such as:</p>
```html
    9. Juli 1979 um 00:30:00
```



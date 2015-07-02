---
layout: doc
title: NumberFormatDirective
---

# NumberFormatDirective
The NumberFormat directive provides formatting of a number based on the ECMA-402 Internationalization API as
implemented by ibm-js/ecma402.

##### Table of Contents
* [Directive attributes](#attributes)
* [Directive usage](#usage)

<a name="attributes"></a>
## Directive attributes
<p>This directive supports two attributes. The `formatLocale` and the `formatOptions` attributes. These
attributes allow for modifying the behavior of the format and control the look of various elements matched to a
particular locale.</p>

### formatLocale
<p>Specifying a locale attribute overrides the default locale and the number formats vary to match the localized
form.</p>

---


### formatOptions
<p>By supplying options you control how a number is formatted.</p>

---

For details on the specific options available from the ECMA-402 standard NumberFormat API , see
[Mozilla Developer Network: Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)


---

---


<a name="usage"></a>
## Directive usage
<p>The `a9n-number-format` directive provides the means to format a javascript number correctly for a
specific locale. Honoring that locales language and formatting style.</p>

<p>Formatting options are derived either from the
default application values or supplied on the individual command.</p>

<p>Typical use case is to use the directive inside a span tag as in the following examples.</p>

<p>This example shows using the application default values for formatting a variable `amount`</p>
```html
    <span a9n-number-format="amount"></span>
```
<p>produces a result, *assuming the default application values were not modified*, such as:</p>
```html
    2,560.235
```
---


<p>This example shows using a specific locale to format the output of the variable `amount` in German format.</p>
```html
    <span a9n-number-format="amount" format-locale="de"></span>
```
<p>produces a result such as:</p>
```html
    2.560,235
```

---

<p>This example shows using a custom options argument which specifies a limit on the number of decimal places.</p>
```html
    <span a9n-number-format="amount" format-options="{maximumFractionDigits:2}"></span>
```
<p>produces a result such as:</p>
```html
    2,560.23
```

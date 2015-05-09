---
layout: [doc](index.md)
title: [DateFormatDirective](DateFormatDirective.md)
---

# DateFormatDirective
The DateFormat directive provides formatting of a date object based on the ECMA-402 Internationalization API as
implemented by ibm-js/ecma402.

##### Table of Contents
[Directive attributes](#attributes)
[Directive usage](#usage)

<a name="attributes"></a>
## Directive attributes
<p>This directive supports two attributes. The <pre>formatLocale</pre> and the <pre>formatOptions</pre> attributes. These
attributes allow for modifying the behavior of the format and control the look of various elements matched to a
particular locale.</p>

### formatLocale
<p>Specifying a locale attribute overrides the default locale and the date and time formats vary to match the localized
form.</p>

<p>This example shows using a specific locale to format the output of the variable <pre>date</pre> in German.</p>
```html
    <span a9n-date-format="date" format-locale="de"></span>
```
<p>produces a result such as:</p>
```html
    9. Juli 1979 um 00:30:00
```
---


### formatOptions
<p>By supplying options you control what parts are displayed and how the ones that do get displayed are formatted.</p>

<p>This example shows using a custom options argument which specifies numeric values for day & year but a short version
of the month that are applied for formatting a variable <pre>date</pre></p>
```html
    <span a9n-date-format="date" format-options="{year: 'numeric', month: 'short', day: 'numeric'}"></span>
```
<p>produces a result such as:</p>
```html
    Jul 9, 1979
```
---

For details on the specific options available from the ECMA-402 standard DateFormat API , see
[Mozilla Developer Network: Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat)


---

---


<a name="usage"></a>
## Directive usage
<p>The <pre>a9n-date-format</pre> directive provides the means to format a javascript date object correctly for a
specific locale. Honoring that locales language and formatting style.</p>

<p>Formatting options are derived either from the
default application values or supplied on the individual command.</p>

<p>Typical use case is to use the directive inside a span tag as in the following examples.</p>

<p>This example shows using the application default values for formatting a variable <pre>myDate</pre></p>
```html
    <span a9n-date-format="myDate"></span>
```
<p>produces a result, *assuming the default application values were not modified*, such as:</p>
```html
    July 9, 1979 at 12:30:00 AM
```
---

<p>This example shows using an empty options argument which causes the underlying implementation defaults to be applied
for formatting a variable <pre>date</pre></p>
```html
    <span a9n-date-format="date" format-options="{}"></span>
```
<p>produces a result such as:</p>
```html
    7/9/1979
```
---

<p>This example shows using a custom options argument which specifies numeric values for day & year but a short version
of the month that are applied for formatting a variable <pre>date</pre></p>
```html
    <span a9n-date-format="date" format-options="{year: 'numeric', month: 'short', day: 'numeric'}"></span>
```
<p>produces a result such as:</p>
```html
    Jul 9, 1979
```
---

<p>This example shows using a specific locale to format the output of the variable <pre>date</pre> in German.</p>
```html
    <span a9n-date-format="date" format-locale="de"></span>
```
<p>produces a result such as:</p>
```html
    9. Juli 1979 um 00:30:00
```



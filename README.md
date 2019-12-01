[![Build Status](https://travis-ci.org/katlasik/mime-matcher.svg?branch=master)](https://travis-ci.org/katlasik/mime-matcher)

### Motivation

MimeMatcher is very simple library for checking if mime type string is in allowed range.
You can also match mime types agains wildcards, like `*/*` or `'application/*'`

### Instalation

You can install it from npm:

``npm install mime-matcher --save``

Or you can download `mime-matcher.min.js` from the dist folder and then include it in html file:

```html
<script src="mime-matcher.min.js"></script>
```

### Usage
````javascript
import MimeMatcher from 'mime-matcher'

const matcher = new MimeMatcher('image/gif')

matcher.match('image/gif') //true
matcher.match('image/jpeg') //false
````

You can also use wildcards:

````javascript
import MimeMatcher from 'mime-matcher'

new MimeMatcher('image/*').match('image/gif') //true
new MimeMatcher('*/*').match('text/xml') //true

````

You can also use multiple mime types to match agains:

````javascript
import MimeMatcher from 'mime-matcher'

const matcher = new MimeMatcher('image/*', 'text/*')

matcher.match('text/xml') //true
matcher.match('image/gif') //true
matcher.match('audio/mpeg') //false

````

Optional mime type parameter is ignored:

````javascript
import MimeMatcher from 'mime-matcher'

const matcher = new MimeMatcher('text/xml')

matcher.match('text/xml; encoding=utf-8') //true
````

There is also function `parse` returning object containing data

````javascript
import { parse as parseMimeType } from 'mime-matcher'

parseMimeType('application/json') 
/*
{
    valid: true
    type: "application",
    subType: "json"
}
*/

parseMimeType('text/xml; encoding=utf-8') 
/*
{
    valid: true
    type: "text",
    subType: "xml",
    parameter: "encoding=utf-8"
}
*/


parseMimeType('invalid') 
/*
{
    valid: false
}
*/

````

You can also import function `isValid` as shorthand for checking validity:

````javascript
import { isValid as isValidMimeType } from 'mime-matcher'

isValidMimeType('text/xml') //true

````



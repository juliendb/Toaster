# Plugin Toaster

Plugin for create toasters (alerts) with message.

Use jquery and jquery.transit.

## Overview
- [Features](#features)
- [Working Example](#working-example)
- [Quick Start](#quick-start)
- [Customization](#customization)
- [Options](#options)
- [Methods](#methods)
- [Changelog](#changelog)


## Features

* 100% Free to use and open source
* Use jquery.transit for fluid animation
* Css to modify toaster
* Add classe and id
* Restart to show after hide toaster


## Working Example

* [Exemple Demo](http://www.juliendb.fr/Toaster/)


## Quick Start

```css
<link rel="stylesheet" href="toaster.css">
```

```javascript
<!--latest jquery-->
<script src="jquery.min.js"></script>

<script src="jquery.transit.min.js"></script>
<script src="toaster.js"></script>
<script>
	var toaster = new Toaster(options);

	toaster.build();
</script>
```


## Customization

You can to modify the file ```toaster.css``` to change style of toaster or add class on options.
You can also modify the file ```toaster.js``` to add or change the methods animations and positions options.


## Options

**container**
Type: `String` Default: `body`
Specify the container of toaster.

**title**
Type: `String` Default: ``
Specify the title of toaster.

**content**
Type: `String` Default: ``
Specify the content of toaster.

**classe**
Type: `String` Default: ``
Specify the classe of toaster.

**id**
Type: `String` Default: ``
Specify the id of toaster.

**showMethod**
Type: `String` Default: `fade` authorized: `fade|scale|slideLeft|slideRight|slideUp|slideDown`
Specify the showMethod of toaster.

**hideMethod**
Type: `String` Default: `fade` authorized: `fade|scale|slideLeft|slideRight|slideUp|slideDown`
Specify the showMethod of toaster.

**position**
Type: `String` Default: `bottom-left` authorized: `top-left|top-right|bottom-left|bottom-right`
Specify the position of toaster.

**timeShow**
Type: `Integer` Default: 600
Specify the time to show.

**timeHide**
Type: `Integer` Default: 600
Specify the time to hide.

**timeBegin**
Type: `Integer` Default: 2000
Specify the time to show after build (if option begin is true).

**timeLeave**
Type: `Integer` Default: 20000
Specify the time that a toaster remains before disappearing

**timeRestart**
Type: `Integer` Default: 5000
Specify the time of toaster after disappearing (if option restart is true).

**close**
Type: `Boolean` Default: true
Add button close to hide.

**begin**
Type: `Boolean` Default: true
Set begin to show just after build.

**restart**
Type: `Boolean` Default: true
Set restart after disappear.


## Methods

**options** 
Set the options for toaster
```js
toaster.options = yourOptions;
```

**build**
Build or rebuild the toaster with options
```js
toaster.build();
```

**show**
Show animation, work only if is build
```js
toaster.show();
```

**hide**
Hide animation, work only if is build
```js
toaster.hide();
```

**clear**
Clear toaster with animation and without remove and restart, work only if is build
```js
toaster.clear();
```

**remove**
Remove toaster without animation
```js
toaster.remove();
```


## Changelog

+ 1.0 : Initial commit
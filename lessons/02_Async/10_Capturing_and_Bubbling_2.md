# JS230 > Event-Driven and Asynchronous Programming > 10. Capturing and Bubbling (2)

## Problem 1

1. `click` event listener of the `div#elem1` element listening on the bubbling phase. It outputs the `tagName` of the `target`` `"MAIN"` as an alert.
2. `click` event listener of the `div#elem1` element listening on the bubbling phase. It outputs the `tagName` of the `currentTarget` `"MAIN"` as an alert.

## Problem 2

1. `click` event listener of the `div#elem1` element listening on the capture phase. It outputs `"capturing"` as an alert.
2. `click` event listener of the `div#elem1` element listening on the bubbling phase. It outputs `"bubbling"` as an alert.

## Problem 3

1. `click` event listener of the `div#elem1` element listening on the default bubbling phase. It outputs the `tagName` of the clicked `target` element (`"DIV"`) as an alert after an asynchronously scheduled timeout of 7 seconds.
2. `keypress` event listener of the `document` element listening on the default bubbling phase. It outputs keycode `event.code` (`"KeyQ"`) as an alert after an asynchronously scheduled timeout of 7 seconds.
3. `keypress` event listener of the `document` element listening on the default bubbling phase. It outputs keycode `event.code` (`"KeyW"`) as an alert after an asynchronously scheduled timeout of 7 seconds.
4. `click` event listener of the `div#elem1` element listening on the default bubbling phase. It outputs the `tagName` of the clicked `target` element (`"MAIN"`) as an alert after an asynchronously scheduled timeout of 7 seconds.

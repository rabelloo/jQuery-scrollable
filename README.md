# jQuery-scrollable

jQuery extension for lean scrollable areas

## Usage
```html
<div class="scrollable"></div>
```

Elements with the `scrollable` class are automatically initialized. Its `max-height` attribute will be used as height if defined.

OR

```javascript
$().scrollable(height);
```

Height is a valid `max-height` value and will be used to define the element's max scrollable height.

If `height` is a falsey value, it will be ignored and the element's `max-height` css attribute will be used instead.

Default value is `inherit`.

**Recommended use with slimScroll.js for very clean scroll bars**

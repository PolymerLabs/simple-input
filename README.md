# simple-input

Super-duper experimental minimalistic remake of the [paper-input](http://github.com/polymerelements/paper-input) element.

### Highlights
* small: builds on top of a small base class called SimpleElement which
itself uses Polymer's PropertyAccessors mixin.
* uses decorator pattern to keep input and label in element light dom, making
them easily configurable.
* basic Material Design look and feel
* support for error indicator and customizable message

### Known Issues
* works only in Safari/Canary due to usage of modules
* styling currently not x-browser compatible

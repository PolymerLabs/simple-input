# simple-input

This element was discussed in the
[Evolving the Next Generation of Polymer Elements](https://www.youtube.com/watch?v=rvpJ5O0W_6A) given at
the [Polymer Summit 2017](https://summit.polymer-project.org/).

It is a super-duper experimental minimalistic remake of the [paper-input](http://github.com/polymerelements/paper-input) element.

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

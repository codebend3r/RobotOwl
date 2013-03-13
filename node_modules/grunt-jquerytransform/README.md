# jQuery Transform

grunt-jquerytransform is a grunt task for transforming HTML files with jQuery, based on [Mickael Daniel](http://github.com/mklabs)'s original work in [h5bp/node-build-script](//github.com/h5bp/node-build-script).

## Installation

	npm install grunt-jquerytransform

### Grunt v0.3 Compatability
Version 0.0.2 was the last version of grunt-jquerytransform that was compatible with grunt 0.3. 0.1.0 and higher are for grunt 0.4.

## Use

### Simple Case

```
grunt.initConfig({
  jquerytransform: {
    files: ['**/*.html'], // All HTML files
    transform: function($) {
      // For styling bullet separate from text
      $('.post li').wrapInner('<span />');
    }
  }
});

grunt.loadNpmTasks('grunt-jquerytransform');

```

### Async Transform

If your transform depends on an asynchronous task you can call `this.async()` to get a callback to indicate the transform's completion.
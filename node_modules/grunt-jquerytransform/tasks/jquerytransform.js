var fs = require('fs'),
  path = require('path'),
 jsdom = require('jsdom'),
jquery = fs.readFileSync(path.join(__dirname, '../support/jquery-1.8.3.min.js'), 'utf8');

module.exports = function(grunt) {
  var task = grunt.task,
    file = grunt.file,
    log = grunt.log;

  grunt.registerTask('jquerytransform', 'Transform HTML files with jQuery', function() {
    grunt.config.requires('jquerytransform');

    var conf = grunt.config('jquerytransform'),
      files = file.expand({ filter: fs.isFile }, conf.files),
      transform = conf.transform,
      cb = this.async();

    (function run(files) {
      var f = files.shift();

      if(!f) return cb();

      executeTransform(f, transform, function(err, body) {
        if(err) return grunt.fail.warn(err);

        // Write the new content, and keep the doctype safe (innerHTML returns
        // the whole document without doctype).
        fs.writeFileSync(f, '<!doctype html>' + body);

        log.ok(f);

        run(files);
      });
    }(files));
  });

  function processFile(file, cb) {
    fs.readFile(file, 'utf8', function(err, body) {
      if(err) return cb(err);

      jsdom.env({
        html: body,
        src: [jquery],
        done: cb
      });
    });
  }

  function executeTransform(f, transform, cb) {
    log.subhead('About to transform ' + f);

    processFile(f, function(err, window) {
      if(err) return cb(err);

      var $ = window.$,
        isAsync = false,
        doneProcessing = function() {
          cb(null, window.document.innerHTML, window);
        },
        context = {
          async: function() {
            isAsync = true;

            return doneProcessing;
          }
        };

      transform.call(context, $);

      if(!isAsync) doneProcessing();
    });
  };
};
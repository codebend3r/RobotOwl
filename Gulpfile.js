/**
 * Updated by crivas on 9/3/2014.
 */

'use strict';

var gulp = require('gulp'),
  pkg = require('./package.json'),
  config = {
    app: 'app',
    target: 'target',
    dev: 'target/builds/dev',
    prod: 'target/builds/prod',
    release: 'target/builds/release',
    assets: 'target/builds/assets'
  },
  env = 'dev',
  connect = require('gulp-connect-multi'),
  gulpif = require('gulp-if'),
  unzip = require('gulp-unzip'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  templateCache = require('gulp-angular-templatecache'),
  $ = require('gulp-load-plugins')();

//=============================================
// TASKS
//=============================================

gulp.task('set-to-dev', function () {
  env = 'dev';
});

gulp.task('set-to-prod', function () {
  env = 'prod';
});

gulp.task('set-to-release', function () {
  env = 'release';
});

// Zip
gulp.task('zip-up-dev', function () {
  return gulp.src(config.dev + '/**/*')
    .pipe($.zip(pkg.name + '.zip'))
    .pipe(gulp.dest(config.target + '/'));
});

gulp.task('zip-up-prod', function () {
  return gulp.src(config.prod + '/**/*')
    .pipe($.zip(pkg.name + '.zip'))
    .pipe(gulp.dest(config.target + '/'));
});

gulp.task('zip-up-release', function () {
  return gulp.src(config.release + '/**/*')
    .pipe($.zip(pkg.name + '.zip'))
    .pipe(gulp.dest(config.target + '/'));
});

// HTML

gulp.task('html', function () {
  return gulp.src([ config.app + '/index.html' ])
    // RELEASE
    .pipe(gulpif(env === 'release',
      $.usemin({
        css: [
          $.csso(),
          $.rev()
        ],
        js: [
          $.ngmin(),
          $.uglify(),
          $.rev()
        ]
      })
    ))
    .pipe(gulpif(env === 'release',
      gulp.dest(config.release)
    ))
    // PROD
    .pipe(gulpif(env === 'prod',
      $.usemin({
        css: [$.rev()],
        js: [$.rev()]
      })
    ))
    .pipe(gulpif(env === 'prod',
      gulp.dest(config.prod)
    ))
    // DEV
    .pipe(gulpif(env === 'dev',
      gulp.dest(config.dev)
    ))
    .pipe($.size());
});

gulp.task('partials', function () {
  return gulp.src([ config.app + '/views/**/*.html' ])
    .pipe(gulpif(env === 'release',
      gulp.dest(config.release)
    ))
    .pipe(gulpif(env === 'prod',
      gulp.dest(config.prod)
    ))
    .pipe(gulpif(env === 'dev',
      gulp.dest(config.dev + '/views')
    ))
    .pipe($.size());
});

// HTML ASSETS

gulp.task('html-assets', function () {
  return gulp.src([ config.app + '/views/directives/assets/*.html' ])
    .pipe(gulp.dest(config.assets + '/views/directives/assets'))
    .pipe($.size());
});

gulp.task('html-route-page', function () {
  return gulp.src([ config.app + '/views/assets.html' ])
    .pipe(gulp.dest(config.assets + '/views/'))
    .pipe($.size());
});

gulp.task('html-rename', [ 'html-assets', 'html-route-page' ], function () {
  return gulp.src([ config.app + '/assets.html' ])
    .pipe($.rename(config.assets + '/index.html'))
    .pipe($.clean({force: false}))
    .pipe(reload({stream: true}))
    .pipe(gulp.dest('./'))
    .pipe($.size());
});

gulp.task('template', function () {
  gulp.src([config.app + '/views/**/*.html', '!' + config.app + '/views/directives/assets/*.html', '!' + config.app + '/views/assets.html'])
    .pipe(templateCache('./', {
      module: 'uptimeApp',
      standalone: false,
      root: './views/'
    }))
    .pipe(gulp.dest(config.app + '/js/templates/templatescache.js'));
});

// SASS
gulp.task('sass', function () {
  return gulp.src([config.app + '/sass/*.scss'])
    .pipe($.sass({
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest(config.app + '/css/'))
    .pipe($.size());
});

// CSS
gulp.task('css', [ 'sass' ], function () {
  return gulp.src([config.app + '/css/*.css'])
    .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(config.dev + '/css/'))
    .pipe($.size());
});

gulp.task('uncss', function () {
  return gulp.src([config.app + '/css/**/*.css'])
    .pipe($.uncss({
      html: [ config.app + '/index.html', config.app + '/views/**/*.html' ]
    }))
    .pipe(gulp.dest(config.dev + '/css/'))
    .pipe($.size());
});

// JS
gulp.task('scripts', function () {
  return gulp.src([ config.app + '/js/**/*.js' ])
    .pipe(gulp.dest(config.dev + '/js/'))
    .pipe($.size());
});

// Bower
gulp.task('bower-all', function () {
  return gulp.src([ config.app + '/bower_components/**/*.{js,css}' ])
    .pipe(gulp.dest(config.dev + '/bower_components/'))
    .pipe($.size());
});

// Images
gulp.task('images', function () {
  return gulp.src(config.app + '/images/**/*.{png,jpg,gif,svg}')
    .pipe(gulpif(env === 'dev',
      gulp.dest(config.dev + '/images/')
    ))
    .pipe(gulpif(env === 'prod',
      $.imagemin({
        optimizationLevel: 1,
        progressive: true,
        interlaced: true
      })
    ))
    .pipe(gulpif(env === 'prod',
      gulp.dest(config.prod + '/images/')
    ))
    .pipe(gulpif(env === 'release',
      $.imagemin({
        optimizationLevel: 1,
        progressive: true,
        interlaced: true
      })
    ))
    .pipe(gulpif(env === 'release',
      gulp.dest(config.release + '/images/')
    ))
    .pipe($.size());
});

// Fonts
gulp.task('fonts', function () {
  return gulp.src(config.app + '/fonts/**/*')
    .pipe(gulpif(env === 'dev',
      gulp.dest(config.dev + '/fonts/')
    ))
    .pipe(gulpif(env === 'prod',
      gulp.dest(config.prod + '/fonts/')
    ))
    .pipe(gulpif(env === 'release',
      gulp.dest(config.release + '/fonts/')
    ))
    .pipe($.size());
});

// JS HINT
gulp.task('jshint', function () {
  gulp.src([config.app + '/js/**/*.js', '!' + config.app + '/js/vendor/**/*.js', '!' + config.app + '/js/directives/assets/**/*.js'])
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'));
});

// Clean

gulp.task('clean-all', function () {
  return gulp.src(['./target/'], { read: false }).pipe($.clean({force: false}));
});


gulp.task('clean-dev', function () {
  return gulp.src([config.dev, config.app + '/css/*.css'], { read: false }).pipe($.clean({force: false}));
});

gulp.task('clean-prod', function () {
  return gulp.src([config.prod, config.app + '/css/*.css'], { read: false }).pipe($.clean({force: false}));
});

gulp.task('clean-release', function () {
  return gulp.src([config.release, config.app + '/css/*.css'], { read: false }).pipe($.clean({force: false}));
});

// Build
gulp.task('build', [
    'css',
    //'partials',
    'template',
    'html',
    'scripts',
    'bower-all',
    'images',
    'fonts'
  ]
);


gulp.task('build-prod', [
  'css',
  'html',
  'images',
  'fonts',
  'static'
]);

gulp.task('build-release', [
  'css',
  'html',
  'images',
  'fonts',
  'static'
]);

// Karma - Unit
gulp.task('karma', function () {
  gulp.src(['test/unit/**/*.js'])
    .pipe($.karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));

});


// Watch
//gulp.task('watch', [ 'browser-sync' ], function () {
gulp.task('watch', [ 'move-GUI' ], function () {

  // Watch all .html files
  gulp.watch([config.app + '/views/**/*.html', config.app + '/index.html', '!' + config.app + '/views/directives/assets/*.html', '!' + config.app + '/views/assets.html'], [ 'set-to-dev', 'build' ]);

  // Watch .scss files
  gulp.watch(config.app + '/sass/**/*.scss', [ 'set-to-dev', 'move-GUI-css' ]);

  // Watch .js files
  gulp.watch([config.app + '/js/**/*.js', config.app + '/js/*.js', '!' + config.app + '/js/templates/templatescache.js'], [ 'set-to-dev', 'build' ]);

  // Watch image files
  gulp.watch(config.app + '/images/**/*.{png,jpg,gif}', [ 'set-to-dev', 'build' ]);

});

gulp.task('watch-assets', [ 'clean-assets', 'build-assets' ], function () {

  // Watch all .html files
  gulp.watch([config.app + '/views/directives/assets/*.html', config.app + '/views/assets.html' ], [ 'html-rename' ]);

  // Watch .scss files
  gulp.watch(config.app + '/sass/**/*.scss', [ 'css-assets' ]);

  // Watch .js files
  gulp.watch([config.app + '/js/**/*.js', config.app + '/js/*.js'], [ 'scripts-assets' ]);

});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

// browser-sync task for starting the server.
gulp.task('browser-sync', [ 'watch' ], function () {
  browserSync({
    open: false,
    proxy: 'http://localhost:9999/'
  });
});

gulp.task('default', [ 'set-to-dev', 'watch' ]);
gulp.task('watch-prod', [ 'set-to-prod', 'watch' ]);
gulp.task('watch-release', [ 'set-to-release', 'watch' ]);
gulp.task('quick-build', [ 'build', 'move-GUI' ]);

module.exports = gulp; // for chrome gulp dev-tools
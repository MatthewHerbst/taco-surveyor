// NOTE: This file is written in ES5 so as to be backwards compatible with older versions on npm.

'use strict';

var babelify   = require('babelify');
var browserify = require('browserify');
var del        = require('del');
var gulp       = require('gulp');
var eslint     = require('gulp-eslint');
var minifyCSS  = require('gulp-minify-css');
var removeCode = require('gulp-remove-code');
var rename     = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var gutil      = require('gulp-util');
var source     = require('vinyl-source-stream');
var watchify   = require('watchify');

// Make Gulp complete after async tasks. https://github.com/gulpjs/gulp/issues/167
var isWatching = true;
gulp.on('stop', function() {
  if(!isWatching) {
    process.nextTick(function() {
      process.exit(0);
    });
  }
});

/*********************************** Tasks ************************************/
// Default
gulp.task('default', ['build:dev']);

// Used by all build tasks
gulp.task('clean', clean);
gulp.task('clean:core', cleanCore);
gulp.task('clean:css', cleanCss);
gulp.task('clean:fonts:vendor', cleanVendorFonts);
gulp.task('clean:js:vendor', cleanVendorJs);
gulp.task('clean:styles:vendor', cleanVendorStyles);
gulp.task('lint:js', lintJS);
gulp.task('move:all', ['move:core', 'move:fonts:vendor', 'move:js:vendor', 'move:styles:vendor'], function(cb){cb();});
gulp.task('move:core', ['clean:core'], moveCore);
gulp.task('move:fonts:vendor', ['clean:fonts:vendor'], moveVendorFonts);
gulp.task('move:js:vendor', ['clean:js:vendor'], moveVendorJs);
gulp.task('move:styles:vendor', ['clean:styles:vendor'], moveVendorStyles);
gulp.task('styles', ['clean:css'], css);

// Used by all dev build tasks
gulp.task('build:dev', ['lint:js', 'move:all', 'css'], buildDev);
gulp.task('watch:core', watchCore);
gulp.task('watch:css', watchCss);

// Prod build tasks
gulp.task('build:prod', ['lint:js', 'move:all', 'css'], buildProd);

/******************************* Task functions *******************************/

function buildDev(callback) {
  var bundler = getBundler(['src/client/js/main.js']);
  var watcher = getWatcher(bundler, rebundle);

  function rebundle() {
    lintJS(callback);

    return watcher.bundle()
      .pipe(source('bundle.min.js'))
      .pipe(gulp.dest('dist/js'));
  }

  rebundle();
  watchCss(callback);
  watchCore(callback);
  return callback();
}

/**
 * Builds a production version of the website.
 * TODO: I think the removeCode is going to mess-up the sourcemaps. Check this.
 */
function buildProd() {
  isWatching = false;

  var bundler = getBundler(['src/client/js/main.js']);
  bundler.transform('stripify');
  bundler.plugin('minifyify', { map: 'bundle.min.js.map', output: 'dist/js/bundle.min.js.map' } );

  return bundler.bundle()
    .pipe(source('bundle.min.js'))
    .pipe(removeCode( { production: true } ))
    .pipe(gulp.dest('dist/js'));
}

// Cleans dist/
function clean() {
  return del(['dist']);
}

// Cleans core files
function cleanCore() {
  return del(['dist/*.*', 'dist/js/plugins.js', '!dist/**/*.php']);
}

// Cleans dist/styles
function cleanCss() {
  return del(['dist/styles/**/*.css']);
}

// Cleans dist/styles/fonts
function cleanVendorFonts() {
  return del(['dist/styles/fonts/**/*.*']);
}

// Cleans dist/js/vendor
function cleanVendorJs() {
  return del(['dist/js/vendor/**/*.*']);
}

// Cleans dist/styles/vendor dist/styles/fonts/vendor
function cleanVendorStyles() {
  return del(['dist/styles/vendor/**/*.*', 'dist/styles/fonts/**/*.*']);
}

// Move and minify CSS
function css() {
  return gulp.src(['src/client/styles/**/*.css'], {base: 'src/client/styles'})
      .pipe(rename(function(path) {
        path.extname = ".min" + path.extname;
      }))
      .pipe(sourcemaps.init())
      .pipe(minifyCSS)
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/styles'));
}

function lintJS() {
  return gulp.src(['src/client/components/**/*.*', 'src/client/js/main.js', 'src/client/stores/**/*.*', 'src/client/actions/**/*.*'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
}

// Moves root files that need no processing into dist
function moveCore() {
  return gulp.src(['src/client/*.*', 'src/client/js/plugins.js'], { base: 'src/client' } )
      .pipe(gulp.dest('dist'));
}

// Moves vendor JavaScript files that need no processing into dist
function moveVendorJs() {
  return gulp.src(['src/client/js/vendor/**/*.*'], { base: 'src/client/js/vendor' } )
      .pipe(gulp.dest('dist/js/vendor'));
}

function moveVendorFonts() {
  return gulp.src(['src/client/styles/fonts/**/*.*'], { base: 'src/client/styles/fonts' } )
      .pipe(gulp.dest('dist/styles/fonts'));
}

// Moves vendor style files (including fonts) that need no processing into dist
function moveVendorStyles() {
  return gulp.src(['src/client/styles/vendor/**/*.*'], { base: 'src/client/styles/vendor' } )
      .pipe(gulp.dest('dist/styles/vendor'));
}

// Watch for changes to core
function watchCore() {
  gulp.watch(['src/client/*.*'], ['move:core']);
}

// Watch for changes to CSS
function watchCss() {
  gulp.watch(['src/client/styles/**/*.*'], ['css']);
}

/****************************** Helper functions ******************************/

/**
 * Gets the default bundler used by all builds. By default, the bundler will
 * perform JSX and ES6 transforms.
 *
 * @param path An array of string representing the application roots
 * @return A basically configured Browserify bundler
 */
function getBundler(paths) {
  var bundler = browserify({
    entries: paths,
    debug: true,
    extensions: ['.jsx'],
    cache: {},
    packageCache: {}
  });

  bundler.transform(babelify, {presets: ["es2015", "react"]});

  bundler.on('log', gutil.log);
  bundler.on('error', gutil.log.bind(gutil.colors.red, 'Browserify Error'));

  return bundler;
}

/**
 * Gets the default Watchify watcher used by dev builds. By default, the watcher
 * will rebundle the Browserify package when an update occurs.
 *
 * @param bundler The Browserify bundler object
 * @param rebundle A function to perform when Watchify detects a code update
 * @return A basically configured Watchify watcher
 */
function getWatcher(bundler, rebundle) {
  bundler.plugin(watchify);
  bundler.on('update', rebundle);

  return bundler;
}

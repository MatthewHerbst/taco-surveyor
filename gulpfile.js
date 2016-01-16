'use strict';

var babelify   = require('babelify');
var browserify = require('browserify');
var del        = require('del');
var gulp       = require('gulp');
var eslint     = require('gulp-eslint');
var less       = require('gulp-less');
var minifyCSS  = require('gulp-minify-css');
var removeCode = require('gulp-remove-code');
var rename     = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var gutil      = require('gulp-util');
var source     = require('vinyl-source-stream');
var watchify   = require('watchify');

// To make Gulp complete after async tasks. https://github.com/gulpjs/gulp/issues/167
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
gulp.task('clean:server', cleanServer);
gulp.task('lint:js', lintJS);
gulp.task('move:all', ['move:core', 'move:server'], function(cb){cb();});
gulp.task('move:core', ['clean:core'], moveCore);
gulp.task('move:server', ['clean:server', 'lint:php'], moveServer);
gulp.task('less', ['clean:less'], lessCSS);

// Used by all dev build tasks
gulp.task('build:dev', ['lint:js', 'move:all', 'less'], buildDev);
gulp.task('watch:core', watchCore);
gulp.task('watch:less', watchLess);

// Prod build tasks
gulp.task('build:prod', ['lint:js', 'move:all', 'less'], buildProd);

/*********************************** Paths ************************************/
// TODO: implement

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
  watchLess(callback);
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

// Cleans .php files
function cleanServer() {
  return del(['dist/**/*.php']);
}

// Move and minify Less
function lessCSS() {
  return gulp.src(['src/client/styles/**/*.css'], {base: 'src/client/styles'})
      .pipe(rename(function(path) {
        path.extname = ".min" + path.extname;
      }))
      .pipe(sourcemaps.init())
      .pipe(less())
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

// Moves php files that need no processing into dist
function moveServer() {
  return gulp.src(['src/server/**/*.php'], { base: 'src/server' } )
      .pipe(gulp.dest('dist'));
}

// Watch for changes to core
function watchCore() {
  gulp.watch(['src/client/*.*'], ['move:core']);
}

// Watch for changes to CSS
function watchLess() {
  gulp.watch(['src/client/styles/**/*.*'], ['less']);
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

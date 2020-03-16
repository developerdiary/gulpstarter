'use strict';

const browserSync   = require('browser-sync');
const reload        = browserSync.reload;
const concat        = require('gulp-concat');
const gulp          = require('gulp');
const connect       = require('gulp-connect-php');
const newer         = require('gulp-newer');
const plumber       = require('gulp-plumber');     // Prevent gulp stopping when error is found
const revision      = require('gulp-rev');         // appending content hash to filenames
const sourcemaps    = require('gulp-sourcemaps');
const stripComments = require('gulp-strip-comments');
const watch         = require('gulp-watch');

// Images
const imagemin      = require('gulp-imagemin');  // Optimize Images

// CSS
const autoprefixer  = require('gulp-autoprefixer');  // Vendor CSS Prefixes
const csso          = require('gulp-csso');          // Minify CSS
const sass          = require('gulp-sass');          // Concatenate CSS

// JS
const uglify        = require('gulp-uglify');  // Minify JS

// Icon Fonts
const consolidate   = require('gulp-consolidate');
const iconfont      = require('gulp-iconfont');    // Convert SVG icons into font
const runTimestamp  = Math.round(Date.now()/1000);
const underscore = require('underscore');

///////////////////////////////////////////
//       VARIABLE CONFIGURATION START
///////////////////////////////////////////

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
  'last 99 version',
  'ie_mob >= 10',
  'bb >= 10'
];

// Resource Paths
const paths = {
  // main.css can be the core/common css file. Add page specific files to the array as need be.
  // For a single file, set the parameter as - ['single_file_name.scss']
  sassSrc      : [
                  './src/sass/main.scss',
                  './src/sass/homepage.scss'
                ],
  cssDest      : './dist/css',
  jsSrc        : [  // File order is very important. If you have dependancie, list them first.
                  './src/js/jquery.min.js',
                  './src/js/bootstrap.min.js',
                  './src/js/file1.js',
                  './src/js/file2.js'
                ],
  jsDest       : './dist/js', 
  imgSrc       : './src/images/**/*',
  imgDest      : './dist/images',
  fontSrc      : './src/fonts/**/*.{ttf,woff,woff2,eof,eot,svg}',
  fontDest     : './dist/fonts',
  iconFontSrc  : './src/icons/**/*.svg',
  iconFontDest : './dist/icons',
  iconFontHTML : './src/iconfont/index.html',
  iconFontCSS  : './src/iconfont/iconfonts.css',
};


///////////////////////////////////////////
//       VARIABLE CONFIGURATION END
///////////////////////////////////////////


// Gulp task to minify CSS files
gulp.task('styles', () => {
  return gulp.src(paths.sassSrc)
    // Don't stop gulp if error 
    .pipe(plumber())    
    // Start generating sourcemaps for partials
    .pipe(sourcemaps.init({largeFile: true}))
    // Compile SASS/SCSS files
    .pipe(sass({
      outputStyle: 'compressed',
      precision: 10,
      includePaths: ['./src/sass/'],
      onError: console.error.bind(console, 'SASS Error:')
    }))
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    // Minify the file with CSSO
    .pipe(csso({
      sourceMap: true,
      debug: true
    }))
    // Create file content hash to append to file name for cache-busting
    .pipe(revision())
    // Write generated sourcemaps to file
    .pipe(sourcemaps.write('.', {
      destPath: './dist/css/',
      sourceRoot: './src/sass/'
    }))
    // Write compiled & prefixed CSS to file
    .pipe(gulp.dest(paths.cssDest))
    .pipe(revision.manifest({ path: 'manifest.json', base: ' ', merge: true}))
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream:true}))
});


// Gulp task to minify JavaScript files
gulp.task('scripts', () => {
  return gulp.src(paths.jsSrc)
    // Don't stop gulp if error 
    .pipe(plumber())    
    // Remove comments from source files
    .pipe(stripComments())
    // Start generating sourcemaps
        .pipe(sourcemaps.init({largeFile: true}))
    // Minify the file
    .pipe(uglify())
    // Merge all JS files
    .pipe(concat('main.min.js'))
    // Create file content hash to append to file name for cache-busting
    .pipe(revision())
    // Write generated sourcemaps to file
    .pipe(sourcemaps.write('.', {
      destPath: './dist/js/',
      sourceRoot: './src/js/'
    }))
    // Write combined & minified to file
    .pipe(gulp.dest(paths.jsDest))
    .pipe(revision.manifest({ path: 'manifest.json', base: ' ', merge: true}))
    .pipe(gulp.dest('dist'));
});


// Optimize Images
gulp.task('images', () =>
  gulp.src(paths.imgSrc)
    // Don't stop gulp if error 
    .pipe(plumber())    
    // Only process new files that don't exist in destination
    .pipe(newer(paths.imgDest))
    // Compress images
    .pipe(imagemin([
        imagemin.jpegtran({progressive: true}),
        imagemin.gifsicle({interlaced: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({plugins: [
          {removeUnknownsAndDefaults: false},
          {cleanupIDs: false}
        ]})
    ]))
    // Write images to destination folder
        .pipe(gulp.dest(paths.imgDest))
);


// Create Icon Fonts
gulp.task('iconfont', function () {
  return gulp.src(paths.iconFontSrc)
    // Don't stop gulp if error 
    .pipe(plumber())    
    .pipe(iconfont({
      fontName: 'myfont',
      formats: ['ttf', 'eof', 'eot', 'woff', 'woff2'],
      appendCodepoints: true,
      appendUnicode: false,
      normalize: true,
      fontHeight: 1000,
      centerHorizontally: true,
    }))
    .on('glyphs', function (glyphs, options) {
      gulp.src(paths.iconFontCSS)
        .pipe(consolidate('underscore', {
          glyphs: glyphs,
          fontName: options.fontName,
          fontDate: new Date().getTime()
        }))
        .pipe(gulp.dest(paths.iconFontDest));

            gulp.src(paths.iconFontHTML)
                .pipe(consolidate('underscore', {
                    glyphs: glyphs,
                    fontName: options.fontName
                }))
                .pipe(gulp.dest(paths.iconFontDest));
        })
        .pipe(gulp.dest(paths.iconFontDest));
});


// Move Fonts
gulp.task('fonts', () => {
  return gulp.src(paths.fontSrc)
    // Only process new files that don't exist in destination
    .pipe(newer(paths.fontDest))
    // Move fonts to destination folder
    .pipe(gulp.dest(paths.fontDest))
});


gulp.task ('watch', () => {
  gulp.watch("./src/sass/*.scss", ['styles']);
  gulp.watch("./src/js/*.js", ['scripts']);
  gulp.watch(paths.imgSrc, ['images']);
  gulp.watch(paths.iconFontSrc, ['iconfont']);
  gulp.watch(paths.fontSrc, ['fonts']);
  gulp.watch("./*.html").on('change', reload);
  gulp.watch("./**/*.php").on('change', reload);
});

// Static Server + watching scss/html/php/js files
gulp.task('default', ['styles', 'scripts', 'images', 'iconfont', 'fonts'], function() {
  connect.server({
    base: './'
  }, function (){
    browserSync({
      injectChanges: true,
      proxy: '127.0.0.1:8000'
    });
  });
  gulp.start('watch')
});
const gulp = require('gulp'); 
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create(); 
const postcss = require('gulp-postcss');
const mediaquery = require('postcss-combine-media-query'); 
const cssnano = require('cssnano');
// const htmlMinify = require('html-minifier'); 
const gulpPug = require('gulp-pug'); 
const sass = require('gulp-sass')(require('sass')); 

function html() {
    const options = {
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortClassName: true,
        useShortDoctype: true,
        collapseWhitespace: true,
          minifyCSS: true,
          keepClosingSlash: true
      };
    return gulp.src('src/**/*.html')
                .pipe(plumber())
                .pipe(gulp.dest('dist/'))
                .pipe(browserSync.reload({stream: true}));
  }
  
function css() {
    const plugins = [mediaquery(),
                     cssnano()]
    return gulp.src('src/**/*.css')
               .pipe(plumber())
            //    .pipe(concat('bundle.css'))
              //  .pipe(postcss(plugins))
                .pipe(sass())
               .pipe(gulp.dest('dist/'))
               .pipe(browserSync.reload({stream: true}));
  }
  
function images() {
    return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
               .pipe(gulp.dest('dist/images'))
               .pipe(browserSync.reload({stream: true}));
  }
  
function clean() {
    return del('dist');
  }

  function watchFiles() {
    gulp.watch(['src/**/*.html'], html);
    gulp.watch(['src/**/*.css'], css);
    gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
    gulp.watch(['src/**/*.sass'], sassysass); 
  } 

  const build = gulp.series(clean, gulp.parallel(html, css, images));
  const watchapp = gulp.parallel(build, watchFiles, serve);

  function serve() {
    browserSync.init({
      server: {
        baseDir: './dist'
      }
    });
  } 

  function pug() {
    return gulp.src('src/pages/**/*.pug')
          .pipe(gulpPug({
            pretty: true
          }))
          .pipe(gulp.dest('dist/'))
          .pipe(browserSync.reload({stream: true}));
  } 

  function sassysass() {
    const plugins = [mediaquery(),
                     cssnano()
                    ]
    return gulp.src('src/**/*.sass')
          .pipe(sass())
          // .pipe(postcss(plugins))
          .pipe(gulp.dest('dist/'))
          .pipe(browserSync.reload({stream: true}));
  } 

  exports.html = html 
  exports.css = css; 
  exports.images = images; 
  exports.clean = clean; 
  exports.watchapp = watchapp; 
  exports.build = build; 
  exports.default = watchapp; 
  exports.pug = pug; 
  exports.sass = sass; 
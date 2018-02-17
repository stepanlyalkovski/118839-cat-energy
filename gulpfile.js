"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require('del');
var csso = require('gulp-csso');
var runSequence = require('run-sequence');
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require('posthtml-include');

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["html"]);
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("fonts", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(
      imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
        imagemin.svgo()
      ])
    )
    .pipe(gulp.dest("build/img"));
});

gulp.task('js', function() {
  return gulp.src('source/js/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest("build/js"))
    .pipe(uglify())
    .pipe(rename("bundle.min.js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

gulp.task("sprite", function () {
  return gulp.src(["source/img/icon-*.svg", "source/img/logo-htmlacademy.svg"])
    .pipe(
      imagemin([
        imagemin.svgo()
      ])
    )
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("build", function (done) {
  runSequence(
  "clean",
  ["fonts","images", "style", "js"],
  "sprite",
  "html",
  done
  );
});

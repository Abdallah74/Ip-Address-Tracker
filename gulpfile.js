import gulp from "gulp";
import concat from "gulp-concat";

import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import autoprefixer from "gulp-autoprefixer";

import pug from "gulp-pug";

import sourcemaps from "gulp-sourcemaps";
import livereload from "gulp-livereload";
import minify from "gulp-minify";
import notify from "gulp-notify";

gulp.task("html", () => {
  return gulp
    .src("stage/html/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dist"))
    .pipe(livereload())
    .pipe(notify("HTML File Compiled."));
});

gulp.task("css", () => {
  return gulp
    .src(["stage/css/**/*.css", "stage/css/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload())
    .pipe(
      notify("CSS File compiled with Sass, Autoprefixed & Sourcemap generated!")
    );
});

gulp.task("js", () => {
  return gulp
    .src(["stage/js/*.js", "stage/js/**/libs/*.js"])
    .pipe(concat("main.js"))
    .pipe(minify())
    .pipe(gulp.dest("dist/js"))
    .pipe(livereload())
    .pipe(notify("JS Files Concatenated and Minified."));
});

import { server } from "./server.js";
gulp.task("watch", () => {
  server;
  livereload.listen();
  gulp.watch(["stage/html/**/*.pug"], gulp.parallel("html"));
  gulp.watch(
    ["stage/css/**/*.css", "stage/css/**/*.scss"],
    gulp.parallel("css")
  );
  gulp.watch(["stage/js/*.js"], gulp.parallel("js"));
});

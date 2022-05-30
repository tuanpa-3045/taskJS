const { src, dest, parallel, watch, series } = require("gulp"),
  concat = require("gulp-concat"),
  scss = require("gulp-sass")(require("sass")),
  pug = require("gulp-pug"),
  browserSync = require("browser-sync").create();

const FilesPath = {
  scssFiles: "src/sass/**/*.scss",
  htmlFiles: "src/pug/pages/*.pug",
  assetsFile: "assets/**/*",
  jsFiles: "src/js/*.js",
};

const { scssFiles, htmlFiles, assetsFile, jsFiles } = FilesPath;

function scssTask() {
  return src(scssFiles)
    .pipe(scss())
    .pipe(concat("style.css"))
    .pipe(dest("./dist/css"))
    .pipe(browserSync.stream());
}

function htmlTask() {
  return src(htmlFiles)
    .pipe(pug({ pretty: true }))
    .pipe(dest("./dist"))
    .pipe(browserSync.stream());
}

function assetsTask() {
  return src(assetsFile).pipe(dest("./dist/assets"));
}

function jsTask() {
  return src(jsFiles).pipe(dest("dist/js")).pipe(browserSync.stream());
}

function serve() {
  browserSync.init({ server: { baseDir: "./dist" } });
  watch(scssFiles, scssTask);
  watch("src/pug/**/*.pug", htmlTask);
  watch(assetsFile, assetsTask);
  watch(jsFiles, jsTask);
}

exports.scss = scssTask;
exports.html = htmlTask;
exports.assets = assetsTask;
exports.js = jsTask;
exports.default = series(parallel(htmlTask, scssTask, assetsTask, jsTask));
exports.serve = series(serve, parallel(htmlTask, scssTask, assetsTask, jsTask));

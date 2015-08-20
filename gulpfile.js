var gulp         = require("gulp");
var sass         = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var minifyCss    = require("gulp-minify-css");
var uglify       = require("gulp-uglify");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");

gulp.task("server", function() {
    browser({
        server: {
            baseDir: "release"
        }
    });
});

gulp.task("css", function() {
    gulp.src("devel/sass/*scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(gulp.dest("release"))
        .pipe(browser.reload({stream:true}))
});

gulp.task("js", function() {
    gulp.src("devel/es6/*js")
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("release"))
        .pipe(browser.reload({stream:true}))
});


gulp.task("default", ["server"], function() {
    // gulp.watch(["devel/es6/*.js"],["js"]);
    gulp.watch(["devel/sass/*scss"],["css"]);
});

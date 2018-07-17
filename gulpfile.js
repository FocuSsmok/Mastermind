const gulp = require("gulp");
const sass = require("gulp-sass");
const bs = require("browser-sync");
const wait = require("gulp-wait");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const minify = require('gulp-babel-minify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

gulp.task("serve", function(){
    bs.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./src/sass/**/*.scss", ["sass"]);
    gulp.watch("./*.html").on('change', bs.reload);
    gulp.watch(['src/js/**/*.js'], ['es5']);
});

gulp.task("sass", function() {
    return gulp.src("./src/sass/**/*.scss")
        .pipe(wait(500))
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(concat('style.css'))
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(gulp.dest("./dist/css/"))
        .pipe(bs.stream());
});

gulp.task('es5', () => {
    gulp.src('src/js/*')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(minify({
            mangle: {
                keepClassName: true
            }
        }))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(bs.stream());
});

gulp.task('imageMin', () => {
    gulp.src('src/img-raw/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest('dist/img/'));
});

gulp.task("default", ["serve"]);
'use strict'; // Başlangıçta zorunlu diyebiliriz

var gulp = require("gulp");
var concat = require("gulp-concat");

gulp.task("concatJScripts", function() {
    gulp.src([
        'js/jquery.js',
        'js/sticky/jquery.sticky.js',
        'js/main.js'])
    .pipe(concat("app.js"))
    .pipe(gulp.dest("js"));
});

gulp.task("default", ["concatJScripts"], function() {
    console.log("Bu standart oldu"); // Fonksiyon tanımlamazsak eğer, sadece hello yu çalıştırıp geçer
});


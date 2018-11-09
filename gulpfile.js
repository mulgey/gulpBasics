'use strict'; // Başlangıçta zorunlu diyebiliriz

var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var maps = require("gulp-sourcemaps");

gulp.task("concatJScripts", function() {
    gulp.src([ // dönüştürülecek dosyaları sırala
        'js/jquery.js',
        'js/sticky/jquery.sticky.js',
        'js/main.js'])
    .pipe(maps.init()) // source maps niyeti için tetikle
    .pipe(concat("app.js")) // birleştir
    .pipe(maps.write('./')) // haritayı şuraya
    .pipe(gulp.dest("js")); // sıkıştırdığın dosyayı da şuraya depola
});

gulp.task("minifyScripts", function (){
    gulp.src('js/app.js') // şu dosyayı sıkıştıracağız
        .pipe(uglify()) // hadi kompress
        .pipe(rename("app.min.js")) // ismi farklı olsun
        .pipe(gulp.dest('js')); // şurada dursun
}); 

gulp.task("compileSass", function () {
    gulp.src('scss/application.scss') // Bu dosya scss klasörü içerisinde en içten dışarıya @import 'file'; yönetmiyle düzenlenmiş zirve dosya
        .pipe(maps.init()) // source map oluşturmak için başlangıç kod girdisi
        .pipe(sass()) // sass la
        .pipe(maps.write('./')) // aynı klasöre source map i oluştur
        .pipe(gulp.dest('css')); // sass ı da buraya pasla
});

gulp.task("default", ["concatJScripts"], function() {
    console.log("Bu standart oldu"); // Fonksiyon tanımlamazsak eğer, sadece concatJScripts i çalıştırıp geçer
});


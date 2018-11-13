'use strict'; // Başlangıçta zorunlu diyebiliriz

var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var maps = require("gulp-sourcemaps");
var del = require("del");

gulp.task("concatJScripts", function() {
    return gulp.src([ // dönüştürülecek dosyaları sırala. Return = Node un asenkronize yapısını bozmak için gerekli
        'js/jquery.js',
        'js/sticky/jquery.sticky.js',
        'js/main.js'])
    .pipe(maps.init()) // source maps niyeti için tetikle
    .pipe(concat("app.js")) // birleştir
    .pipe(maps.write('./')) // haritayı şuraya
    .pipe(gulp.dest("js")); // sıkıştırdığın dosyayı da şuraya depola
});

gulp.task("minifyScripts", ["concatJScripts"], function (){ // ["concatJScripts"]'e bağımlı hale geldi, o görev yapılmadan bu görev başlamaz. (2) Her görevin önüne return eklemeyi unutma
    return gulp.src('js/app.js') // şu dosyayı sıkıştıracağız
        .pipe(uglify()) // hadi kompress
        .pipe(rename("app.min.js")) // ismi farklı olsun
        .pipe(gulp.dest('js')); // şurada dursun
}); 

gulp.task("compileSass", function () {
    return gulp.src('scss/application.scss') // Bu dosya scss klasörü içerisinde en içten dışarıya @import 'file'; yönetmiyle düzenlenmiş zirve dosya
        .pipe(maps.init()) // source map oluşturmak için başlangıç kod girdisi
        .pipe(sass()) // sass la
        .pipe(maps.write('./')) // aynı klasöre source map i oluştur
        .pipe(gulp.dest('css')); // sass ı da buraya pasla
});

gulp.task('watchFiles', function () {
    gulp.watch('scss/**/*.scss', ["compileSass"]); // " scss --> tüm klasörler --> uzantısı .scss olanlar " ı takip edip compileSass görevini uygula
    gulp.watch('js/main.js', ['concatJscripts']) // 2 ayrı watch komutu, sadece gerekli olanı çalıştırır
});

gulp.task('clean', function () {
    del(['dist', 'css/application.css*', 'js/app*.js*']);
});

gulp.task("build", ["concatJScripts", "minifyScripts", "compileSass"], function() { // toplu olarak bu işlemleri uygula
    return gulp.src(["css/application.css", "js/app.min.js", "index.html", "img/**", "fonts/**"], { base: "./"}) // işlem esnasında bu dosyaları al // dizin yapısını koru
    .pipe(gulp.dest('dist')); // şu klasöre kaydet
});


gulp.task("serve", ['watchFiles']);

gulp.task("default", ["clean"], function () { // önce bir temizle eskileri
    gulp.start('build'); // sonra yukarıdaki toplu işlemi gerçekleştir
});

'use strict'; // Başlangıçta zorunlu diyebiliriz

var gulp = require("gulp");

gulp.task("hello", function() {
    console.log("Selam dostum");
});

gulp.task("default", ["hello"], function() {
    console.log("Bu standart oldu"); // Fonksiyon tanımlamazsak eğer, sadece hello yu çalıştırıp geçer
});


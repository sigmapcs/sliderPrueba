const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    htmlmin = require('gulp-htmlmin'),
    plumber = require('gulp-plumber'),
    sitemap = require('gulp-sitemap'),
    compress = require('gulp-yuicompressor');

const postcss = require('gulp-postcss'),
    cssnano = require('cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

const babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    uglify = require('gulp-uglify'),
    webp = require('gulp-webp'),
    svgmin = require('gulp-svgmin'),
    tinypng = require('gulp-tinypng-compress');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const postcssPlugin = [
    cssnano({
        autoprefixer:{
            add: true
        },
        core: true
    })
];

const
    dir ={
        dev: 'dev',
        dist: 'dist',
        nm: 'node_modules',
    },
    files ={
        fonts:[
            `${dir.dev}/assets/css/fonts/**/*.*`,
            `${dir.nm}/font-awesome/fonts/*.*`
        ],
        css:[
            `${dir.nm}/normalize.css/normalize.css`,
            // `${dir.nm}/font-awesome/css/font-awesome.css`,
            // `${dir.nm}/animate.css/animate.min.css`,
            // `${dir.dev}/assets/css/fonts.css`
            // `${dir.dev}/assets/css/owl.carousel.css`,
            // `${dir.dev}/assets/css/owl.theme.css`,
            // `${dir.dev}/assets/css/owl.transitionscss`,
            // `${dir.nm}/nivo-slider/nivo-slider.css`,
            // `${dir.dev}/assets/css/nivo/default.css`,
            `${dir.dev}/assets/css/jquery.fancybox.css`
        ],
        mCSS: 'styles.min.css',
        mJS: 'scripts.min.js',
        JS:[
            // `${dir.dev}/assets/js/blank.js`
            // `${dir.nm}/jquery/dist/jquery.js`,
            // `${dir.dev}/assets/js/jquery.slides.js`,
            // `${dir.nm}/shufflejs/dist/shuffle.min.js`,
            `${dir.dev}/assets/js/ed-grid.js`,
            // `${dir.nm}/nivo-slider/jquery.nivo.slider.pack.js`
            // `${dir.dev}/assets/js/jquery.slides.js`,
            // `${dir.dev}/assets/js/owl.carousel.js`,
            // `${dir.dev}/assets/js/jquery.fancybox.js`
            // `${dir.nm}/wowjs/dist/wow.min.js`
        ]
    },
    opts ={
        pug:{
            pretty : true
        },
        sass:{
            outputStyle: 'nested'
        },
        es6:{
            presets : ['es2015']
        },
        imagemin : {
            progressive : true,
            use : [ pngquant() ]
        },
        svgmin : {
            plugins : [
                { convertColors : false },
                { removeAttrs : { attrs : ['fill'] } }
            ]
        },
        tinypng:{
            key: '0PqPOBC2SstCfn-4sczVUHL6xX4HlHXO',
            // key: 'u5tpRXXm1Fl1oWwZNx6FUqm22u8Y_8H2',
            // key: 'B56RIXdUtQkHzyL7a1JZVYv_ORoJfkG0',
            // key: 'KwgaLkV7lv5GKdcRu_AsiQ3LVbyIAW7I,
            // key:'3-CvmMkbWS83EjCYe1nl806wssAHtaEu',
            // key: 'ETWKxYIFUiknIFOsICwLX79VRnCCoa6e',
            sigFile: 'images/.tinypng-sigs',
            log: true
        },
        htmlmin : {collapseWhitespace: true},
        autoprefixer: {
            browsers: ['last 5 versions'],
            cascade: false
        }
    };


gulp.task('styles', ()=>{
    gulp.src('./dev/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(opts.sass).on('error', sass.logError))
    .pipe(postcss(postcssPlugin))
    // .pipe(autoprefixer(opts.autoprefixer))
    .pipe(sourcemaps.write())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css'))
    // .pipe(gulp.dest('./dev/assets/css/'))
    .pipe(browserSync.stream());
});

gulp.task('pug', ()=> {
    gulp.src('./dev/pug/*.pug')
    .pipe(plumber())
    .pipe(pug(opts.pug))
    // .pipe(htmlmin(opts.htmlmin))
    .pipe(gulp.dest('./dist'))
    .on('end', browserSync.reload);
});

gulp.task('es6',() => {
    return gulp.src('./dev/es6/*.js')
        // .pipe(sourcemaps.init())
        .pipe(babel(opts.es6))
        // .pipe(uglify())
        .pipe(concat('scripts.js'))
        // .pipe(sourcemaps.write())
        // .pipe(compress({
        //   type: 'js'
        // }))
        .pipe(gulp.dest('./dist/js/'))
        // .pipe(gulp.dest('./dev/assets/js/'))
        .on('end', browserSync.reload);
});

gulp.task('default', () => {
    browserSync.init({
    server:  "./dist"
    });
    gulp.watch('./dev/scss/**/*.scss', ['styles']);
    gulp.watch('./dev/pug/**/*.pug', ['pug']);
    gulp.watch('./dev/es6/**/*.js',['es6']);
    gulp.watch('./dev/assets/js/*.js',['cJS']);
});
gulp.task('img', () =>
gulp.src(`${dir.dev}/assets/img/**/*.+(png|jpeg|jpg|gif)`)
    .pipe(imagemin({
        progressive : true
    }))
    // .pipe(tinypng(opts.tinypng))
    .pipe(gulp.dest('dist/img'))
);
gulp.task('webp', () => {
    gulp.src(`${dir.dev}/assets/img/**/*.+(png|jpeg|jpg)`)
    .pipe( webp() )
    .pipe( gulp.dest('dist/img/webp') );
});
gulp.task('svg', () => {
    gulp
    .src( `${dir.dev}/assets/img/**/*.svg` )
    .pipe( svgmin(opts.svgmin) )
    .pipe( gulp.dest(`${dir.dist}/img/svg`) );
});
gulp.task('cCSS', ()=>{
    return gulp.src(files.css)
        .pipe(sourcemaps.init())
        .pipe(concat('styles.min.css'))
        .pipe(postcss(postcssPlugin))
        .pipe(sourcemaps.write())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('fonts', ()=>{
    return gulp.src(files.fonts)
        .pipe(gulp.dest('./dist/fonts'));
});
gulp.task('cJS', ()=>{
    return gulp.src(files.JS)
        .pipe(concat(files.mJS))
        // .pipe( uglify() )
        // .pipe(compress({
        //   type: 'js'
        // }))
        .pipe(gulp.dest('./dist/js'))
        .on('end', browserSync.reload);
});

gulp.task('cALL', ['cCSS','cJS','img']);
gulp.task('finalizar', ['cCSS','cJS','html']);
gulp.task('images',['img','webp','svg']);
gulp.task('statics',['sitemap','robots']);

gulp.task('sitemap', function () {
    gulp.src('dist/**/*.html', {
        read: false
    })
        .pipe(sitemap({
            siteUrl: 'http://corporativolunayasociados.com.mx'
        }))
        .pipe(gulp.dest('./dist'));
});
var robots = require('gulp-robots');

gulp.task('robots', function () {
    gulp.src('dist/index.html')
        .pipe(robots({
            useragent: '*',
            allow: ['/css/*.css','/css/*.css?','/css/*.css$','/js/*.js','/js/*.js?','/js/*.js$','/img/*.jpg','/img/*.png'],
            disallow: ['robots.txt'],
            sitemap: '/sitemap.xml'
        }))
        .pipe(gulp.dest('./dist'));
});

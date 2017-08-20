let gulp = require('gulp');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
const rollup = require('rollup-stream');
const source = require('vinyl-source-stream');
const babel = require('rollup-plugin-babel');
const size = require('gulp-size');

gulp.task('simple-input', () => {

  let sourcePath = '../src/';
  let sourceFile = 'simple-input.js';
  const options = {
    entry: `${sourcePath}${sourceFile}`,
    format: 'iife',
    moduleName: 'webcomponentsjs',
    plugins: [babel({presets: require.resolve('babel-preset-babili')})],
    //treeshake: false
  };

  return rollup(options)
  .pipe(source(sourceFile), sourcePath)
  .pipe(gulp.dest('build'))
  .pipe(size({gzip: true}))
});

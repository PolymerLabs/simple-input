/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let gulp = require('gulp');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
const rollup = require('rollup-stream');
const source = require('vinyl-source-stream');
const babel = require('rollup-plugin-babel');
const size = require('gulp-size');

gulp.task('default', () => {

  let sourcePath = '../src/';
  let sourceFile = 'simple-input.js';
  const options = {
    entry: `${sourcePath}${sourceFile}`,
    format: 'iife',
    moduleName: 'webcomponentsjs',
    plugins: [babel({presets: require.resolve('babel-preset-babili')})]
  };

  return rollup(options)
  .pipe(source(sourceFile), sourcePath)
  .pipe(gulp.dest('build'))
  .pipe(size({gzip: true}))
});

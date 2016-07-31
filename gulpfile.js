const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const zip = require('gulp-zip');

const minimist = require('minimist');

const options = minimist(process.argv.slice(2));

if (!options.directory) {
  throw Error('Specify --directory options. ex --directory test');
}

gulp.task('default', () => {
  var paths = [];
  var parentDir = path.join(process.env.HOME, options.directory);

  var folderNames = fs.readdirSync(parentDir);
  folderNames.forEach(folderName => {
    if (folderName === '.DS_Store' || path.extname(folderName) === '.zip') return;
    paths.push(path.join(parentDir, folderName));
  });

  paths.forEach(p => {
    return gulp.src(path.join(p, '*'))
      .pipe(zip(path.basename(p) + '.zip'))
      .pipe(gulp.dest(path.join(parentDir)))
  });
});

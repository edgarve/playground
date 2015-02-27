module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      sass: {
        dist: {
          options: {
            style: 'nested'
          },
          files: {
            'www/assets/css/styles.css': 'compile/styles/styles.scss'
          }
        }
      },
      concat: {
        dist: {
          src: [
            'compile/scripts/vendor/*.js', // All JS in the libs folder
            'compile/scripts/site.js'  // This specific file
          ],
          dest: 'www/assets/js/site.js',
        }
      },
      uglify: {
        build: {
          src: 'www/assets/js/site.js',
          dest: 'www/assets/js/site.min.js'
        }
      },
      watch: {
        livereload: {
          files: ['www/assets/css/styles.css'],
          options: { livereload: true }
        },
        scripts: {
          files: ['compile/scripts/*.js', 'compile/scripts/vendor/*.js'],
          tasks: ['concat', 'uglify'],
          options: { spawn: false }
        },
        markup: {
          files: ['templates/*.html', 'templates/*/*.html'],
          options: { livereload: true }
        },
        css: {
          files: ['compile/styles/*.sass', 'compile/styles/*.scss', 'compile/styles/*/*.sass', 'compile/styles/*/*.scss'],
          tasks: ['sass'],
          options: { spawn: false }
        },
      }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.

    require('load-grunt-tasks')(grunt);

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass', 'concat', 'uglify']);

    grunt.registerTask('dev', ['connect', 'watch']);

};

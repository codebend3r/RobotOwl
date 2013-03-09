'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["<%= pkg.outputFolder %>", "compiled" ],
        copy: {
            main: {
                files: [
                    {src: ['index.html'], dest: '<%= pkg.outputFolder %>/index.max.html'},
                    {src: ['icons/**'], dest: '<%= pkg.outputFolder %>/'},
                    {src: ['images/**'], dest: '<%= pkg.outputFolder %>/'},
                    {src: ['pages/**'], dest: '<%= pkg.outputFolder %>/'},
                    {src: ['pattern/**'], dest: '<%= pkg.outputFolder %>/'},
                    {src: ['css/'], dest: '<%= pkg.outputFolder %>/css'},
                    {src: ['js/'], dest: '<%= pkg.outputFolder %>/js'}
                ]
            },
            after: {
                files: [
                    {src: ['js/compiled/<%= pkg.outputName %>.min.js'], dest: '<%= pkg.outputFolder %>/js/<%= pkg.outputName %>.min.js'}
                ]
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ''
            },
            dist: {
                // the files to concatenate
                src: ['js/**/*.js'],
                // the location of the resulting JS file
                dest: 'js/compiled/<%= pkg.outputName %>.js'
            },
            cssconcat: {
                src: ['css/**/*.css'],
                dest: 'css/compiled/<%= pkg.outputName %>.css'
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: ''
            },
            dist: {
                files: {
                    'js/compiled/<%= pkg.outputName %>.min.js': ['js/external/*.js','js/internal/*.js']
                }
            }
        },
        jshint: {
            // define the files to lint
            files: ['<%= pkg.outputFolder %>/js/<%= pkg.name %>/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/release/main.css': 'sass/release/main.scss',
                    'css/release/portfolio.css': 'sass/release/portfolio.scss',
                    'css/release/resume.css': 'sass/release/resume.scss',
                    'css/release/contact.css': 'sass/release/contact.scss'
                }
            }
        },
        DSS: {
            options: {
                // Task-specific options go here.
            },
            your_target: {
                // Target-specific file lists and/or options go here.
                option:'sass/portfolio.scss'
            }
        },
        yuidoc: {
            pkg: grunt.file.readJSON('package.json'),
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>'
            },
            options: {
                paths: 'js/',
                outdir: 'docs/'
            }
        },
        cssmin: {
            compress: {
                files: {
                    "<%= pkg.outputFolder %>/css/<%= pkg.outputName %>.min.css": ["css/release/**/*.css"]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    useShortDoctype: true,
                    collapseWhitespace: true
                },
                files: {
                    '<%= pkg.outputFolder %>/index.html': '<%= pkg.outputFolder %>/index.max.html'
                }
            }
        },
        watch: {
            files: ['**/*'],
            tasks: ['sass:dist']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('DSS');

    // Default task(s).
    grunt.registerTask('sassy', ['watch']);
    grunt.registerTask('default', [ 'sass', 'clean', 'copy:main', 'concat', 'uglify', 'sass', 'cssmin', 'copy:after', 'htmlmin']);

};
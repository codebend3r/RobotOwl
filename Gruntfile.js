'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["<%= pkg.outputFolder %>", "compiled" ],
        copy: {
            main: {
                files: [
                    {src: ['index_optimized.html'], dest: '<%= pkg.outputFolder %>/index.max.html'},
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
                    {src: ['js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.js'], dest: '<%= pkg.outputFolder %>/js/<%= pkg.outputName %>-<%= pkg.version %>.min.js'},
                    {src: ['css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.css'], dest: '<%= pkg.outputFolder %>/css/<%= pkg.outputName %>-<%= pkg.version %>.min.css'}
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
                src: [
                    'js/external/jquery-1.9.1.js',
                    'js/external/jquery.imagesloaded.js',
                    'js/external/knockout-2.2.1.js',
                    'js/external/modernizr-2.6.2.js',
                    'js/internal/data.js.js',
                    'js/internal/model.js'
                ],
                // the location of the resulting JS file
                dest: 'js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.js'
            },
            cssconcat: {
                src: ['css/release/*.css'],
                dest: 'css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.css'
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: ''
            },
            dist: {
                files: {
                    'js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.js': [
                        'js/external/jquery-1.9.1.js',
                        'js/external/jquery.imagesloaded.js',
                        'js/external/knockout-2.2.1.js',
                        'js/external/modernizr-2.6.2.js',
                        'js/internal/data.js.js',
                        'js/internal/model.js'
                    ]
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
        jquerytransform: {
            files: ['<%= pkg.outputFolder %>/index.max.html'], // All HTML files
            transform: function($) {
                // For styling bullet separate from text
                $('html').find('script').remove();
            }
        },
        chester: {

        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/release/main.css': 'sass/release/main.scss',
                    'css/release/nav-bar.css': 'sass/release/nav-bar.scss',
                    'css/release/portfolio.css': 'sass/release/portfolio.scss',
                    'css/release/resume.css': 'sass/release/resume.scss',
                    'css/release/contact.css': 'sass/release/contact.scss'
                }
            }
        },
        cssmin: {
            compress: {
                files: {
                    "css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.css": ['css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.css']
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
            files: ['sass/*.scss'],
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
    //grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jquerytransform');
    //grunt.loadNpmTasks('DSS');


    // Default task(s).
    grunt.registerTask('sassy', ['watch']);
    grunt.registerTask('quickbuild', ['clean', 'copy:main', 'jquerytransform']);
    grunt.registerTask('default', [ 'sass', 'clean', 'copy:main', 'concat', 'uglify', 'sass', 'cssmin', 'copy:after', 'htmlmin']);

};
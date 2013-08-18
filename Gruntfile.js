'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["<%= pkg.outputFolder %>", "compiled" ],
        copy: {
            before: {
                files: [
                    {src: ['index-optimized.html'], dest: '<%= pkg.outputFolder %>/index.html'},
                    {src: ['index-release.html'], dest: '<%= pkg.outputFolder %>/index-release.html'},
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
                    {src: ['js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.js'], dest: '<%= pkg.outputFolder %>/js/<%= pkg.outputName %>-<%= pkg.version %>.js'},
                    {src: ['js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.js'], dest: '<%= pkg.outputFolder %>/js/<%= pkg.outputName %>-<%= pkg.version %>.min.js'},
                    {src: ['css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.css'], dest: '<%= pkg.outputFolder %>/css/<%= pkg.outputName %>-<%= pkg.version %>.css'},
                    {src: ['css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.css'], dest: '<%= pkg.outputFolder %>/css/<%= pkg.outputName %>-<%= pkg.version %>.min.css'}
                ]
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: '/* NEW FILE */'
            },
            dist: {
                // the files to concatenate
                src: [
                    'js/external/jquery-1.9.1.js',
                    'js/external/jquery.imagesloaded.js',
                    'js/external/knockout-2.2.1.js',
                    'js/external/modernizr-2.6.2.js',
                    'js/internal/plugin/jquery.crivasgallery-0.1.1.js',
                    'js/internal/Crivas.Data.js',
                    'js/internal/Crivas.Main.js',
                    'js/internal/Crivas.ViewModel.js',
                    'js/internal/Crivas.EmailForm.js'
                ],
                // the location of the resulting JS file
                dest: 'js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.js'
            },
            cssconcat: {
                src: [
                  'css/release/normalize.css',
                  'css/release/main.css',
                  'css/release/headers.css',
                  'css/release/nav-bar.css',
                  'css/release/portfolio.css',
                  'css/release/resume.css',
                  'css/release/contact.css'
                ],
                dest: 'css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.css'
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/* NEW FILE */'
            },
            dist: {
                files: {
                    'js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.js': [
                        'js/external/jquery-1.9.1.js',
                        'js/external/jquery.imagesloaded.js',
                        'js/external/knockout-2.2.1.js',
                        'js/external/modernizr-2.6.2.js',
                        'js/internal/plugin/jquery.crivasgallery-0.1.1.js',
                        'js/internal/Crivas.Data.js',
                        'js/internal/Crivas.Main.js',
                        'js/internal/Crivas.ViewModel.js',
                        'js/internal/Crivas.EmailForm.js'
                    ]
                }
            }
        },

        jquerytransform: {
            files: ['<%= pkg.outputFolder %>/index-optimized.html'], // All HTML files
            transform: function($) {
                // For styling bullet separate from text
                $('html').find('script').remove();
            }
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
                    collapseWhitespace: true
                },
                files: {
                    '<%= pkg.outputFolder %>/index-optimized.min.html': 'index-optimized.html',
                    '<%= pkg.outputFolder %>/index-release.min.html': 'index-release.html'
                }
            }
        },
        watch: {
            files: ['sass/*.scss'],
            tasks: ['sass:dist']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');;
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jquerytransform');
    //grunt.loadNpmTasks('DSS');


    // Default task(s).
    grunt.registerTask('sassy', ['watch']);
    grunt.registerTask('quickbuild', ['clean', 'copy:main', 'jquerytransform']);
    grunt.registerTask('default', [ 'sass', 'clean', 'copy:before', 'concat', 'uglify', 'sass', 'cssmin', 'copy:after', 'htmlmin']);

};
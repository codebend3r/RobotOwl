module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ["<%= pkg.outputFolder %>", "compiled" ],
		copy: {
			dev: {
				files: [
					{src: ['index.html'], dest: '<%= pkg.outputFolder %>/index.html'},
					{src: ['icons/**'], dest: '<%= pkg.outputFolder %>/'},
					{src: ['email/**'], dest: '<%= pkg.outputFolder %>/'},
					{src: ['images/**'], dest: '<%= pkg.outputFolder %>/'},
					{src: ['pages/**'], dest: '<%= pkg.outputFolder %>/'},
					{src: ['pattern/**'], dest: '<%= pkg.outputFolder %>/'},
					{src: ['css/release/**'], dest: '<%= pkg.outputFolder %>/'},
					{src: ['js/vendor/**'], dest: '<%= pkg.outputFolder %>/'},
					{src: ['js/internal/**'], dest: '<%= pkg.outputFolder %>/'}
				]
			},
			prod: {
				files: [
					{src: ['index.html'], dest: '<%= pkg.outputFolder %>/index.html'},
					{src: ['icons/**'], dest: '<%= pkg.outputFolder %>/'},
					{src: ['email/**'], dest: '<%= pkg.outputFolder %>/'},
					{src: ['images/**'], dest: '<%= pkg.outputFolder %>/'},
					{src: ['pages/**'], dest: '<%= pkg.outputFolder %>/'},
					{src: ['pattern/**'], dest: '<%= pkg.outputFolder %>/'},
					{src: ['css/'], dest: '<%= pkg.outputFolder %>/css'},
					{src: ['js/'], dest: '<%= pkg.outputFolder %>/js'},
					{src: ['js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.js'], dest: '<%= pkg.outputFolder %>/js/<%= pkg.outputName %>-<%= pkg.version %>.js'},
					{src: ['css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.css'], dest: '<%= pkg.outputFolder %>/css/<%= pkg.outputName %>-<%= pkg.version %>.css'}
				]
			},
			release: {
				files: [
					{src: ['index.html'], dest: '<%= pkg.outputFolder %>/index.html'},
					{src: ['icons/**'], dest: '<%= pkg.outputFolder %>/'},
					{src: ['email/**'], dest: '<%= pkg.outputFolder %>/'},
					{src: ['images/**'], dest: '<%= pkg.outputFolder %>/'},
					{src: ['pages/**'], dest: '<%= pkg.outputFolder %>/'},
					{src: ['pattern/**'], dest: '<%= pkg.outputFolder %>/'},
					{src: ['css/'], dest: '<%= pkg.outputFolder %>/css'},
					{src: ['js/'], dest: '<%= pkg.outputFolder %>/js'},
					{src: ['js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.js'], dest: '<%= pkg.outputFolder %>/js/<%= pkg.outputName %>-<%= pkg.version %>.min.js'},
					{src: ['css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.css'], dest: '<%= pkg.outputFolder %>/css/<%= pkg.outputName %>-<%= pkg.version %>.min.css'}
				]
			}
		},
		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: '\n\n\n/* ====================== */\n\n\n'
			},
			jsconcat: {
				// the files to concatenate
				src: [
                    'js/vendor/jquery-1.9.1.js',
                    'js/vendor/jquery.imagesloaded.js',
                    'js/vendor/jquery.localscroll-1.2.7.js',
                    'js/vendor/jquery.owlgallery-0.1.5.js',
                    'js/vendor/knockout-2.2.1.js',
                    'js/vendor/modernizr-2.6.2.js',
                    'js/vendor/TweenMax.min.js',
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
				banner: '\n\n\n/* ====================== */\n\n\n'
			},
			dist: {
				files: {
					'js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.js': [
						'js/vendor/jquery-1.9.1.js',
						'js/vendor/jquery.imagesloaded.js',
                        'js/vendor/jquery.localscroll-1.2.7.js',
                        'js/vendor/jquery.owlgallery-1.5.2.js',
                        'js/vendor/knockout-2.2.1.js',
                        'js/vendor/modernizr-2.6.2.js',
                        'js/vendor/TweenMax.min.js',
						'js/internal/Crivas.Data.js',
						'js/internal/Crivas.Main.js',
						'js/internal/Crivas.ViewModel.js',
						'js/internal/Crivas.EmailForm.js'
					]
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
					'css/release/nav-bar.css': 'sass/release/nav-bar.scss',
					'css/release/portfolio.css': 'sass/release/portfolio.scss',
					'css/release/resume.css': 'sass/release/resume.scss',
					'css/release/contact.css': 'sass/release/contact.scss',
					'css/release/headers.css': 'sass/release/headers.scss'
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
					'<%= pkg.outputFolder %>/index.html': 'index.html'
				}
			}
		},
		watch: {
			dev: {
				files: [ 'sass/**/*.scss', 'js/internal/**/*.js', 'js/vendor/**/*.js', 'index.html' ],
				tasks: [ 'dev' ],
				options: {
					livereload: '<%= pkg.port %>'
				}
			},
			prod: {
				files: [ 'sass/**/*.scss', 'js/internal/*.js', 'js/vendor/**/*.js', 'index.html' ],
				tasks: [ 'prod' ],
                options: {
                    livereload: '<%= pkg.port %>'
                }
			},
			release: {
				files: [ 'sass/**/*.scss', 'js/internal/**/*.js', 'js/vendor/**/*.js', 'index.html' ],
				tasks: [ 'release' ],
                options: {
                    livereload: '<%= pkg.port %>'
                }
			}
		},
        connect: {
            server: {
                options: {
                    port: '<%= pkg.port %>',
                    base: '<%= pkg.outputFolder %>',
                    livereload: true
                }
            }
        },
		env: {
			dev: {
				NODE_ENV: 'DEVELOPMENT'
			},
			prod: {
				NODE_ENV: 'PRODUCTION'
			},
			release: {
				NODE_ENV: 'RELEASE'
			},
		    watching: {
		    	LIVE_RELOAD: true
		    }
		},
		preprocess: {
			options: {
				context: {
					name: '<%= pkg.outputName %>',
					version: '<%= pkg.version %>',
					port: '<%= pkg.port %>',
				}
			}
			dev: {
				src: 'index.html',
				dest: '<%= pkg.outputFolder %>/index.html'
			},
			prod: {
				src: 'index.html',
				dest: '<%= pkg.outputFolder %>/index.html'
			},
			release: {
				src: 'index.html',
				dest: '<%= pkg.outputFolder %>/index.html'
			}
		},
		'ftp-deploy': {
			prod: {
				auth: {
					host: 's141590.gridserver.com',
					port: 21,
					authKey: 'key1'
				},
				src: '<%= pkg.outputFolder %>',
				dest: '/domains/crivas.net/html'
			},
			dev: {
				auth: {
					host: 's141590.gridserver.com',
					port: 21,
					authKey: 'key1'
				},
				src: '<%= pkg.outputFolder %>',
				dest: '/domains/crivas.net/html/beta'
			}
		}
	});

	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-env');

	// Default task(s)
	grunt.registerTask('watchdev', [ 'connect', 'watch:dev']);
	grunt.registerTask('watchprod', [ 'connect', 'watch:prod']);
	grunt.registerTask('watchrelease', [ 'connect', 'watch:release']);

	grunt.registerTask('default', [ 'env:dev', 'sass', 'preprocess:dev', 'clean', 'copy:dev' ]);
	grunt.registerTask('dev', [ 'env:dev', 'sass', 'clean', 'copy:dev', 'preprocess:dev' ]);
	grunt.registerTask('prod', [ 'env:prod', 'sass', 'concat', 'clean', 'copy:prod', 'preprocess:prod' ]);
	grunt.registerTask('release', [ 'env:release', 'sass', 'concat', 'uglify', 'cssmin', 'clean', 'copy:release', 'preprocess:release' ]);
	grunt.registerTask('deploydev', [ 'dev', 'ftp-deploy:dev' ]);
	grunt.registerTask('deploy', [ 'release', 'ftp-deploy:prod' ]);


};
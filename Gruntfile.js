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
					{src: ['js/external/**'], dest: '<%= pkg.outputFolder %>/'},
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
				separator: '\n\n\n/* NEW FILE */\n\n\n'
			},
			jsconcat: {
				// the files to concatenate
				src: [
					'js/external/jquery-1.9.1.js',
					'js/external/jquery.imagesloaded.js',
					'js/external/knockout-2.2.1.js',
					'js/external/modernizr-2.6.2.js',
					'js/external/TweenMax.min.js',
					'js/internal/plugin/jquery.owlgallery-0.1.2.js',
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
				banner: '\n\n\n/* NEW FILE */\n\n\n'
			},
			dist: {
				files: {
					'js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.js': [
						'js/external/jquery-1.9.1.js',
						'js/external/jquery.imagesloaded.js',
						'js/external/knockout-2.2.1.js',
						'js/external/modernizr-2.6.2.js',
						'js/external/TweenMax.min.js',
						'js/internal/plugin/jquery.owlgallery-0.1.2.js',
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
				files: [ 'sass/*.scss', 'js/internal/*.js', 'index.html' ],
				tasks: [ 'dev' ]
			},
			prod: {
				files: [ 'sass/*.scss', 'js/internal/*.js', 'index.html' ],
				tasks: [ 'prod' ]
			},
			release: {
				files: [ 'sass/*.scss', 'js/internal/*.js', 'index.html' ],
				tasks: [ 'release' ]
			}
		},
		jslint: {
			server: {
				src: [ // some example files
					'js/internal/*.js'
				],
				options: {
					junit: 'jslint/server-junit.xml', // write the output to a JUnit XML
					log: 'jslint/server-lint.log',
					jslintXml: 'jslint/server-jslint.xml',
					errorsOnly: true, // only display errors
					failOnError: false, // defaults to true
					checkstyle: 'out/server-checkstyle.xml' // write a checkstyle-XML
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
			}

		},
		preprocess: {

			dev: {
				src: 'index.html',
				dest: '<%= pkg.outputFolder %>/index.html'
			},
			prod: {
				src: 'index.html',
				dest: '<%= pkg.outputFolder %>/index.html',
				options: {
					context: {
						name: '<%= pkg.outputName %>',
						version: '<%= pkg.version %>'
					}
				}
			},
			release: {
				src: 'index.html',
				dest: '<%= pkg.outputFolder %>/index.html',
				options: {
					context: {
						name: '<%= pkg.outputName %>',
						version: '<%= pkg.version %>'
					}
				}
			}

		}
	});

	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-jslint');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-env');

	// Default task(s)
	grunt.registerTask('watchdev', ['watch:dev']);
	grunt.registerTask('watchprod', ['watch:prod']);
	grunt.registerTask('watchrelease', ['watch:release']);

	grunt.registerTask('default', [ 'env:dev', 'sass', 'preprocess:dev', 'clean', 'copy:dev' ]);
	grunt.registerTask('dev', [ 'env:dev', 'sass', 'preprocess:dev', 'clean', 'copy:dev' ]);
	grunt.registerTask('prod', [ 'env:prod', 'sass', 'concat', 'clean', 'copy:prod', 'preprocess:prod' ]);
	grunt.registerTask('release', [ 'env:release', 'sass', 'concat', 'uglify', 'cssmin', 'clean', 'copy:release', 'preprocess:release' ]);


};
module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect:{
			server: {
				options:{
					port: 8000,
					hostname: '127.0.0.1',
					keepalive: true
				}
			}
		},

		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					style: 'expanded'
				},
				files: {                        
					'dist/styles/main.css': 'src/sass/import-sass-files.scss'
				}
			}
		},

		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['src/js/*.js'],
				dest: 'dist/scripts/main.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %>*/\n'
			},
			dist: {
				files: {
					'dist/scripts/main.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		jshint: {
			files: ['Gruntfile.js', 'src/js/*.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document:true
				}
			}
		},

		watch: {
			sassWatch: {
				files: ['src/sass/*.scss'],
				tasks:['sass'],
				options: {
					livereload: true,
				}
			},
			jsWatch: {
				files: ['<%= jshint.files %>','src/scripts/*.js'],
				tasks: ['concat','uglify','webpack'],
				options: {
					livereload: true,
				}
			}
		},

		webpack: {
			pwa: {
				//webpack options
				entry : __dirname + '/src/js/main.js',
				output: {
					path: __dirname + '/dist/scripts',
					filename: 'bundle.js'
				},
				module: {
					loaders: [
						{
							test: /\.js$/,
							exclude: /(node_modules | bower_components)/,
							loader: 'babel-loader?presets[]=react'
						},
						{
							test: /\.json$/,
							exclude: /(node_modules | bower_components)/,
							loader: 'json-loader'
						},
						{
							test: /\.css$/,
							exclude: /(node_modules | bower_components)/,
							loader: 'style-loader!css-loader!autoprefixer-loader'
						},
						{
							test: /\.scss$/,
							exclude: /(node_modules | bower_components)/,
							loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
						}
					]
				},
				node: {
					fs: "empty"
				},
				//to resolve "require.extensions" warning
				resolve: {
					alias: {
						handlebars: 'handlebars/dist/handlebars.min.js'
					}
				}
			}
		},


		concurrent: {
			target: ['connect','watch']
		},

		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'src/sass/*.scss',
						'src/js/*.js',
						'*.html'
					]
				},
				options: {
					watchTask : true,
					server: './'
				}
			}
		},

		clean: ['dist/*','build/*']
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('default', ['sass','jshint', 'concat','uglify','connect']);
	grunt.registerTask('wa', ['watch']);
	grunt.registerTask('all', ['clean','sass','webpack','connect','watch:jsWatch']);
	grunt.registerTask('re', ['clean','webpack','browserSync','watch']);
};
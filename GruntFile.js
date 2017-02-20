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
					'css/main.css': 'src/sass/import-sass-files.scss'
				}
			}
		},

		htmlrender: {
			build: {
				options: {
					src: ['*.html']
				},
				files: [{
					expand:true,
					cwd:'src',
					src: ['index.html'],
					dest: 'dist',
					ext: '.html'
				}]
			}
		},

		compass: {
			dist: {
				options: {
					sassDir: 'src/sass',
					cssDir: 'src/css',
					raw: 'preferred_syntax = :sass\n' // Use `raw` since it's not directly available
				}
			}
		},

		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['src/**/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %>*/\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		jshint: {
			files: ['Gruntfile.js', 'src/**/*.js'],
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
				tasks:['compass']
			},
			jsWatch: {
				files: ['<%= jshint.files %>','src/css/*'],
				tasks: ['jshint']
			}
		},
		clean: ['dist/*','css/']
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-htmlrender');

	grunt.registerTask('default', ['sass','jshint', 'concat','uglify']);
	grunt.registerTask('all', ['clean','sass','htmlrender','connect','watch:sassWatch']);
};
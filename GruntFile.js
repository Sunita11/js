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
				tasks:['sass'],
				options: {
					livereload: true,
				}
			},
			jsWatch: {
				files: ['<%= jshint.files %>','src/js/*'],
				tasks: ['jshint']
			}
		},

		concurrent: {
			target: ['connect','watch:sassWatch']
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
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default', ['sass','jshint', 'concat','uglify']);
	grunt.registerTask('all', ['clean','sass','concurrent:target']);
};

module.exports = function (grunt) {
	var pkg;
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	pkg = grunt.file.readJSON("package.json");
	grunt.initConfig({
		pkg: pkg,
        watch: {
          less: {
              files: "../less/**/*.less",
              tasks: ["less"]
          },
          livereload: {
              options: { livereload: true },
              files: ["<%= pkg.options.grails_tomcat_work %>/**/*.js", "<%= pkg.options.grails_tomcat_work %>/**/*.css"],
          }
        },
	    requirejs: {
	      compile: {
	        options: {
			  name: "app",
	          baseUrl: "../js/lib",
		      mainConfigFile: "../js/app.js",
			  include: ['require.js'],
			  preserveLicenseComments: false,
		      out: "../js/app-optimized.js"
	        }
	      }
	    },
		less: {
			dev: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					paths: ["../less"]
				},
				files: {
					"../css/custom-bootstrap.generated.css": "../less/bootstrap.less",
					"../css/theme.generated.css": "../less/theme.less"
				}
			},
			prod: {
				options: {
					strictMath: true,
					sourceMap: false,
					outputSourceFiles: true,
					paths: ["../less"],
					cleancss: true
				},
				files: {
					"../css/custom-bootstrap.generated.min.css": "../less/bootstrap.less",
					"../css/theme.generated.min.css": "../less/theme.less"
				}
			}
		}
	});
	grunt.registerTask("assets", ["requirejs"]);
	
	return grunt.registerTask("default", ["watch"]);
};
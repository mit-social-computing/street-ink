/*jshint laxcomma:true*/
var jsFiles = [
    'js/src/bower_components/lodash/dist/lodash.min.js'
    , 'js/src/bower_components/fabric/dist/fabric.js'
    , 'js/src/main.js'
]

module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            files : ['index.html', 'js/dist/main.concat.js'],
            options : {
                livereload : true
            },
            js : {
                files : jsFiles,
                tasks : ['concat:js']
            }
        },
        concat : {
            js : {
                files : {
                    'js/dist/main.concat.js' : jsFiles
                }
            }
        }

    })

    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.registerTask('default', ['watch'])
}

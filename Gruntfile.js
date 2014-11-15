/*jshint laxcomma:true*/
var jsFiles = [
    'js/src/bower_components/lodash/dist/lodash.min.js'
    , 'js/src/bower_components/fabric/dist/fabric.js'
    , 'js/src/main.js'
]

module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            files : ['index.html'
                , 'js/dist/main.concat.js'
                , 'css/dist/styles.css'
            ],
            options : {
                livereload : true
            },
            js : {
                files : jsFiles,
                tasks : ['concat:js']
            }
        },
        compass : {
            options : {
                sassDir : 'css/src',
                cssDir : 'css/dist',
                require : ['compass-h5bp', 'compass-normalize'],
                output: 'expanded',
            },
            compile :  {
                watch : false
            },
            dist : {
                watch : true
            }
        },
        concurrent : {
            target : {
                tasks : ['watch', 'compass:dist'],
                options : {
                    logConcurrentOutput : true
                }
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
    grunt.loadNpmTasks('grunt-contrib-compass')
    grunt.loadNpmTasks('grunt-concurrent')

    grunt.registerTask('default', ['concurrent:target'])
}

"use strict"
module.exports = (grunt) ->

  watchFiles =
    serverJS: [
      "gruntfile.js"
      "app.js"
      "routes/**/*.js"
      "services/**/*.js"
    ],
    mochaTests: [
      "tests/**/*.js"
    ]

  # Project Configuration
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    watch:
      serverJS:
        files: watchFiles.serverJS
        options:
          livereload: true

    mochaTest:
      src: watchFiles.mochaTests
      options:
        reporter: "spec"

    nodemon:
      dev:
        script: "bin/www"
        options:
          ext: "js,html"
          ignore: ['node_modules/**']
          watch: watchFiles.serverJS

    concurrent:
      tasks: [
        "nodemon"
        "watch"
      ]
      options:
        logConcurrentOutput: true

  # Load NPM tasks
  require("load-grunt-tasks") grunt

  # Default task(s).
  grunt.registerTask "default", [
    "concurrent"
  ]

  grunt.registerTask "test", [
    "mochaTest"
  ]

  return

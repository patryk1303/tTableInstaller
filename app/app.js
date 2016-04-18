// TODO split modules, controllers, services
// info separate files and concat/uglify them

let remote = require('remote')
let fs = require('fs')
let mysql = require('promise-mysql')

let app = angular.module('ttableinstaller', ['ngRoute'])

photon.start(document)

app.config(($routeProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/main.html',
      controller: 'MainController'
    })

    .otherwise({
      redirectTo: '/'
    })
})

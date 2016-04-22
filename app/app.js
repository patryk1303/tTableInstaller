// TODO split modules, controllers, services
// info separate files and concat/uglify them

let remote = require('remote')
let fs = require('fs')
let mysql = require('promise-mysql')
let dialog = require('electron').remote.dialog

let app = angular.module('ttableinstaller', ['ngRoute'])

photon.start(document)

app.config(($routeProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/main.html',
      controller: 'MainController'
    })
    .when('/directory', {
      templateUrl: 'templates/directory.html',
      controller: 'DirectoryController'
    })

    .otherwise({
      redirectTo: '/'
    })
})

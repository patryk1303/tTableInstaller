// TODO split modules, controllers, services
// info separate files and concat/uglify them

let remote = require('remote')
let fs = require('fs')
let knex = require('knex')
let mysql = require('mysql')

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

// controllers

app.controller('MainController', ($scope) => {
  let cnx
  $scope.checking = false
  
  $scope.check = () => {
    $scope.checking = true
    cnx = knex({
      client: 'mysql',
      debug: true,
      connection: {
        host: $scope.host,
        user: $scope.username,
        password: $scope.password,
        database: $scope.base
      }
    })()
    console.log(cnx)
  }
  
})
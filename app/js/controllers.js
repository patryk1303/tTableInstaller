app.controller('MainController', ($scope, $location, Cnx) => {
  let cnx
  $scope.checking = false
  $scope.success = false
  $scope.error = false
  $scope.errorMessage = null

  // debug info
  $scope.host = 'localhost'
  $scope.username = 'root'
  $scope.password = ''
  $scope.base = 'ttable1'

  $scope.check = () => {
    $scope.checking = true
    Cnx.connect($scope.host, $scope.username, $scope.password, $scope.base)
      .then((_cnx) => {
        cnx = _cnx
        $scope.checking = false
        $scope.success = true
        $scope.error = false
        $scope.errorMessage = null
      })
      .catch((err) => {
        console.error(err)
        $scope.checking = false
        $scope.success = false
        $scope.error = true
        $scope.errorMessage = err.code
      })
  }
  
  $scope.nextStep = () => {
    if($scope.success) {
      $location.path('/directory')
    }
  }
})

app.controller('DirectoryController', ($scope, $location, Cnx, Lines) => {
  let cnx = Cnx.getConnection()
  $scope.checking = false
  $scope.success = false
  $scope.error = false
  $scope.errorMessage = null

  $scope.check = () => {
    $scope.checking = true
    console.log($scope.directory)
  }
  
  $scope.nextStep = () => {
    if($scope.success) {
      $location.path('/directory')
    }
  }
})

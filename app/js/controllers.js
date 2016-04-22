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
  $scope.path = null

  let readDir = (err, files) => {
    if(err) {
      $scope.error = true
    } else {
      $scope.checking = false
      for(let file of files) {
        file = fs.openSync(`${$scope.path}/${file}`, 666)
        fs.fstat(file, fileStats)
      }
    }
  }

  let fileStats = (err, stats) => {
    if(err) {
      $scope.error = true
    } else {
      console.log(stats.isDirectory())
    }
  }

  $scope.showOpenDirectory = () => {
    $scope.path = dialog.showOpenDialog({properties: ['openDirectory']})[0]
  }

  $scope.check = () => {
    // $scope.checking = true
    // path = document.getElementById('directory').files[0].path
    if($scope.path)
      fs.readdir($scope.path, readDir)
  }

  $scope.nextStep = () => {
    if($scope.success) {
      $location.path('/directory')
    }
  }
})

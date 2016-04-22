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
  let fileTmp
  $scope.checking = false
  $scope.success = false
  $scope.error = false
  $scope.errorMessage = null
  $scope.path = null
  $scope.files = []

  $scope.requirements = {
    dayTypes: false,
    lines: false
  }

  let readDir = (err, files) => {
    if(err) {
      $scope.error = true
    } else {
      $scope.checking = false
      for(let file of files) {

        if(typeof file === 'string' && file === 'typy_dni') {
          $scope.requirements.dayTypes = true
        }

        fileTmp = {
          path: `${$scope.path}/${file}`,
          isDirectory: false
        }
        let fd = fs.openSync(fileTmp.path, 'r', 666)
        fileTmp.isDirectory = fs.fstatSync(fd).isDirectory()

        $scope.files.push(fileTmp)
      }
    }
  }

  let fileStats = (err, stats) => {
    if(err) {
      $scope.error = true
    } else {
      fileTmp.isDirectory = stats.isDirectory()
    }
  }

  $scope.showOpenDirectory = () => {
    $scope.path = dialog.showOpenDialog({properties: ['openDirectory']})[0]
  }

  $scope.check = () => {
    $scope.checking = true
    $scope.files = []
    $scope.requirements = {
      dayTypes: false,
      lines: false
    }
    if($scope.path)
      fs.readdir($scope.path, readDir)
  }

  $scope.nextStep = () => {
    if($scope.success) {
      $location.path('/directory')
    }
  }
})

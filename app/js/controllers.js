app.controller('MainController', ($scope, Cnx, Lines) => {
  let cnx
  $scope.checking = false

  // debug info
  $scope.host = 'localhost'
  $scope.username = 'root'
  $scope.password = ''
  $scope.base = 'ttable'

  $scope.check = () => {
    $scope.checking = true
    try {
      cnx = Cnx.connect($scope.host, $scope.username, $scope.password, $scope.base, true)
      console.log(cnx)
      $scope.checking = false

      Lines.getLines().then((res) => {
        console.log(res)
      }, (err) => {
        console.error(err)
      })
    } catch(e) {
      console.error('e', e)
      $scope.checking = false
    }
  }
})

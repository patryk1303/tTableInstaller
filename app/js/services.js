app.factory('Cnx', ($q) => {
  let cnx = null
  const connect = (host, username, password, base, debug = false) => {
    let deffered = $q.defer()
    mysql.createConnection({
      host:     host,
      user:     username,
      password: password,
      database: base
    }).then((_cnx) => {
      cnx = _cnx
      deffered.resolve(cnx)
    }).catch((err) => {
      console.error(err)
      deffered.reject(err)
    })
    return deffered.promise
  }
  const getConnection = () => cnx
  const endConnection = () => cnx.end()

  return {
    connect: connect,
    getConnection: getConnection,
    endConnection: endConnection
  }
})

app.factory('Lines', ($q, Cnx) => {
  const getLines = () => {
    let cnx = Cnx.getConnection()
    let deffered = $q.defer()
    let query = 'SELECT * FROM `lines`'
    cnx.query(query).then((rows) => {
      deffered.resolve(rows)
    }).catch((err) => {
      deffered.reject(err)
    })
    return deffered.promise
  }
  const getLineDate = (line) => {
    let cnx = Cnx.getConnection()
    let deffered = $q.defer()
    let query = 'SELECT date FROM `lines` WHERE line = ' + line
    cnx.query(query).then((rows) => {
      deffered.resolve(rows[0].date)
    }).catch((err) => {
      deffered.reject(err)
    })
    return deffered.promise
  }

  return {
    getLines: getLines,
    getLineDate: getLineDate
  }
})

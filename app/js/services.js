app.factory('Cnx', ($q) => {
  let cnx = null
  const connect = (host, username, password, base, debug = false) => {
    let deffered = $q.defer()
    cnx = mysql.createConnection({
      host:     host,
      user:     username,
      password: password,
      database: base
    })
    cnx.connect()
    return cnx
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
    cnx.query(query, (err, rows) => {
      if(err) deffered.reject(err)
      deffered.resolve(rows)
    })
    return deffered.promise
  }

  return {
    getLines: getLines
  }
})

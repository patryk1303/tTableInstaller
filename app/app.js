let remote = require('remote')
let fs = require('fs')
let knex = require('knex')
let mysql = require('mysql')

document.getElementById('close-app').addEventListener('click', () => {
  remote.getCurrentWindow().close()
}) 
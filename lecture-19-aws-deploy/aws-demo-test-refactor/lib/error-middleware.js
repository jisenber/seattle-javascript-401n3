'use strict'

const createError = require('http-errors')
const debug = require('debug')('city:server')

module.exports = function(err, req, res, next){
  debug('error middleware')
  console.error('ERROR:', err.message)
  console.log('Errorrrr.name', err.name)

  if (err.status){
    res.status(err.status).send(err.name)
    next()
    return
  }

  if (err.name === 'ValidationError'){
    err = createError(400, err.message)
    res.status(err.status).send(err.name)
    next()
    return
  }

  if (err.name === 'MongoError' && err.message.startsWith('E11000 duplicate')){
    // 409 means conflict im using it for duplicate errors 
    err = createError(409, err.message)
    res.status(err.status).send(err.name)
    next()
    return
  }

  err = createError(500, err.message)
  res.status(err.status).send(err.name)
  next()
}
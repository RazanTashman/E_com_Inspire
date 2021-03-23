const jwt = require('jsonwebtoken')

module.exports =function  (req, res, next) {
    const authHeader = req.headers['authorization']
    console.log("authHeader:",authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    console.log("authHeader AFTEEEER:",authHeader.split(' ')[1])
      if(!token) return res.sendStatus(401)
  
    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
      console.log("err::::",err)
      if (err) return res.sendStatus(403) /// The token is no longer valid
      req.user = user
      next()
    })
  }


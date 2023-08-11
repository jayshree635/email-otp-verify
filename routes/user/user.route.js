const route = require('express').Router()
const user = require('../../controller/user/user.controller')
const uploadImage = require('../../middelware/uploadimage')

//.........user signUp
route.post('/sign-up',uploadImage.uploadImage('profileImages','profile_image'),user.signUp)

//.....email-verify
route.post('/email-verify',user.emailVerify)

module.exports = route
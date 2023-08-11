const MESSAGES = {
    // user controller
    '1001': 'create account successfully!',
    '1002': 'Login successfully!',
    '1003': 'Logout successfully!',
    '1004': 'Get user profile successfully.',
    '1005': 'Upadate user profile successfully.',
    '1006': 'Email id already exist.',
    '1007': 'User not found.',
    '1008': 'Email or password are not match.',
    '1009': 'Password does not match.',
    '1010': 'User Account deleted successfully.',
    '1011': 'you are not user',
    '1012': 'current password is incorrect',
    '1013': 'email not exist',
    '1014': 'email is verifyed',
    '1015' : 'send again mail',
    '1016' : 'email verify successfully...',
    '1017' : 'otp time expire Send mail again',
    //super admin controller

    '1403': 'Get admin successfully!',
    '1404': 'Update admin successfully!',
    '1405': 'delete admin profile successfully!',
    '1406': 'you are not Admin',

    // Common
    '9000': 'Please Enter valid Details',
    '9999': "Something went wrong!",

}


module.exports.getMessage = function (messageCode) {
    if (isNaN(messageCode)) {
        return messageCode
    }

    return messageCode ? MESSAGES[messageCode] : '';
}
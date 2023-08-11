const Validator = require('validatorjs');
const db = require('../../config/db.config')

//......models
const User = db.User;
const UserSession = db.UserSession;

//...........utils
const mailUtils = require('../../utils/sendMail')


//.........user signup api
const signUp = async (req, res) => {
    let validation = new Validator(req.body, {
        name: 'required|string|max:50',
        email: 'required|max:50',
        Password: 'required|min:6|max:15',
        phone_no: 'required|min:10|max:12',
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }
    try {
        const { name, email, Password, phone_no } = req.body;
        const profile_image = req?.file?.filename;
        const otp = Math.floor(100000 + Math.random() * 9000);

        const existUser = await User.findOne({ where: { email: email } });
        if (existUser) {
            if (existUser.isVerify == 1) {
                return RESPONSE.error(res, "user account exist")
            };
            await existUser.update({ otp });
        } else {
            await User.create({ name, email, phone_no, Password, profile_image, otp })
        }

        const mail = mailUtils.sendMail("otp mail", `verify email otp  : ${otp}`);
        return RESPONSE.success(res, 1001)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


const emailVerify = async (req, res) => {
    let validation = new Validator(req.body, {
        email: 'required',
        otp: 'required'
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    };

    try {
        const { email, otp } = req.body;

        const isExist = await User.findOne({ where: { email: email } })
        if (!isExist) {
            return RESPONSE.success(res, 1013)
        }

        if (isExist.isVerify == 1) {
            return RESPONSE.error(res, 1014)
        }

        if (isExist.otp != otp) {
            return RESPONSE.error(res, 1015)
        }
        await isExist.update({ isVerify: true })

        return RESPONSE.success(res, 1016)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }

}

module.exports = {
    signUp,
    emailVerify
}
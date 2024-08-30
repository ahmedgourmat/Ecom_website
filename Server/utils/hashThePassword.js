const bcrypt = require('bcrypt')


const hashingFun = async(password)=>{
    const salt = await bcrypt.genSalt(10)

    const hashPassword = await bcrypt.hash(password , salt)
    console.log(hashPassword)

    return hashPassword
}

module.exports = hashingFun
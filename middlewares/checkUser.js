const checkUser = (req, res, next) => {
    console.log("User is approved");
    next();
}

module.exports =   {
    checkUser
}
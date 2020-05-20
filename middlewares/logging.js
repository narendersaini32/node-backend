const logging = (req, res, next) => {
    console.log("APi is called on this time ", new Date());
    next();
}

module.exports = {
    logging
}
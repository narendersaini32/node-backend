const homeController = (req, res) => {
    try{
        console.log(A);
        res.send("Home Route")
    }
    catch(error){
        res.send("An error is occurred. Please Try again.")
    }
   
}

module.exports = {
    homeController
}
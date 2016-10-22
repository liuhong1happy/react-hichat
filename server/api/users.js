var userLogin = function(req, res, next) {
	// get body data
	var { username, password} = req.body;
    
    console.log(req);

	// check body data
	if(username=="admin" && password=="123456"){
        res.json({
            status: "success",
            msg: "success",
            data: {
                username: "admin",
                sex: "F",
                age: 24
            }
        })
    }else{
        res.json({
            status: "error",
            msg: "error"
        })
    }
}

module.exports = {
	userLogin:userLogin
}
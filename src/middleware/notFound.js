exports.notFound = function (req,res,next){
	res.status(404).json({ msg: "Error 404: not found" });
};
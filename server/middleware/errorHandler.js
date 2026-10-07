export function notFound(req, res, next) {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

export function errorHandler(err, req, res, next){
    if(err.name === "ValidationError"){
        return res.status(400).json({message: err.message});
    }
    if(err.name === "CastError"){
        return res.status(400).json({message: "Invalid ID format"});
    }
    if(err.code === 11000){
        return res.status(400).json({message: "Duplicate Key Error"});
    }
}
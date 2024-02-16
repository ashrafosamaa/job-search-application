const reqkeys = ['body', 'params', 'headers', 'query']

export const validation = (schema) => {
    return (req, res, next)=> {
        let validateArr = []
        for(const key of reqkeys){
            const validateResult = schema[key]?.validate(req[key], {abortEarly:false})
            if (validateResult?.error){
                validateArr.push(...validateResult.error.details)
            }
        }
        if(validateArr.length){
            return res.status(400).
            json({err_msg: "Validation Error",
            err: validateArr.map(ele => ele.message)})
        }
        next()
    }
}
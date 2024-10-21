const requestTime = (req, _ , next) => {
    console.log({ url: req.url, method: req.method , fechaHora: new Date() })
    next()
}

module.exports =  requestTime
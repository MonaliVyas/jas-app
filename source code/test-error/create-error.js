const unhandledRejectionError = (request, response, next) => {
    try {
        User.find().then(data => {
            if (data) {
                response.status(200).send(data);
            }
            else next(new CustomError('', 404, 'No data found'))
        }).catch(error => {
            next(new CustomError(err, 500, "Some error occurred while retrieving the users"));
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"));
    }
}

const customError = (request, response, next) => {
    try {
        User.fin().then(data => {
            if (data) {
                response.status(200).send(data);
            }
            else next(new CustomError('', 404, 'No data found'))
        }).catch(error => {
            next(new CustomError(err, 500, "Some error occurred while retrieving the users"));
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"));
    }
}

const uncaughtException = (request, response, next) => {
    let errorLogStream = fs.createWriteStream(__dirname + '/logs/error.log', {
        flags: 'a'
      })
}


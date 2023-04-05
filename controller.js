const FileDataDto = require('./FileDataDto');
const {checkFileExists, createFile, readFile, updateFile, deleteFile} = require('./fileMethods');

const METHOD_POST = "POST";

const CODE_FILE_ALREADY_EXISTS = "File already exists";
const CODE_FILE_DOESNT_EXISTS = "File doesnt exists";

const fileError = function (res, error) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end(error);
}

const create = function (createDataDto, res) {
    if (checkFileExists(createDataDto.fullName())) {
        fileError(res, CODE_FILE_ALREADY_EXISTS);
        return;
    }
    createFile(createDataDto, res);
};


const read = function (createDataDto, res) {
    if (!checkFileExists(createDataDto.fullName())) {
        fileError(res, CODE_FILE_DOESNT_EXISTS);
        return;
    }
    readFile(createDataDto, res);

};

const update = function (createDataDto, res) {

    if (!checkFileExists(createDataDto.fullName())) {
        fileError(res, CODE_FILE_DOESNT_EXISTS);
        return;
    }
    updateFile(createDataDto, res);

};

const destroy = function (createDataDto, res) {
    if (!checkFileExists(createDataDto.fullName())) {
        fileError(res, CODE_FILE_DOESNT_EXISTS);
        return;
    }
    deleteFile(createDataDto, res);
};

const urls = new Map();
urls.set('/create', create)
urls.set('/read', read)
urls.set('/update', update)
urls.set('/delete', destroy)

const badRequest = function (res) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Bad Request");
};

const notFound = function (res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Not Found");
};

module.exports.resolveAction = function (req, res) {
    if (!urls.has(req.url)) {
        notFound(res);
        return;
    }
    if (req.method !== METHOD_POST) {
        badRequest(res);
        return;
    }
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        try {
            let {name, content, extension} = JSON.parse(body);
            let createDataDto = new FileDataDto(name, content, extension);
            let fun = urls.get(req.url);
            fun(createDataDto, res);
        } catch (error) {
            badRequest(res)
        }
    });
};
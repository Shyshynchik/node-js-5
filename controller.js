const fs = require('fs');
const path = require('path');

const DEFAULT_PATH = "./uploads/"
const METHOD_POST = "POST";

const CODE_FILE_ALREADY_EXISTS = "Файл уже существует";

const checkFileExists = function (fileName) {
    try {
        fs.accessSync(DEFAULT_PATH + fileName, fs.constants.F_OK);
        return true;
    } catch (e) {
        return false;
    }

};

const createFile = function (res) {
    let isExists = checkFileExists('test.txt')
    if (isExists) {
        return CODE_FILE_ALREADY_EXISTS;
    }
    return "1234";
}



const urls = new Map();
urls.set('/create', createFile)

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
    let fun = urls.get(req.url);
    let answer = fun(req);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end(answer);
};
const fs = require('fs');

const DEFAULT_PATH = "./uploads/";

module.exports.checkFileExists = function (fileName) {
    try {
        fs.accessSync(getFullPath(fileName), fs.constants.F_OK);
        return true;
    } catch (e) {
        return false;
    }

};

module.exports.createFile = function (dto, res) {
    fs.writeFile(getFullPath(dto.fullName()), dto.content, () => {
        response(res, `File ${dto.fullName()} created`);
    })
};

module.exports.readFile = function (dto, res) {
    fs.readFile(getFullPath(dto.fullName()), 'utf8', (err, data) => {
        response(res, `File ${dto.fullName()} content is:\n${data}`);
    });
};

module.exports.updateFile = function (dto, res) {
    fs.writeFile(getFullPath(dto.fullName()), dto.content, () => {
        response(res, `File ${dto.fullName()} was updated`);
    })
};

module.exports.deleteFile = function (dto, res) {
    fs.unlink(getFullPath(dto.fullName()), () => {
        response(res, `File ${dto.fullName()} was deleted`);
    })
};

const response = function (res, text) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(text);
}

const getFullPath = function (name) {
    return DEFAULT_PATH + name;
}

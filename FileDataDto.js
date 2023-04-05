class FileDataDto {
    _name;
    _content;
    _extension;

    constructor(name, content, extension) {
        this._extension = extension;
        this._name = name;
        this._content = content;
    }


    get name() {
        return this._name;
    }

    get content() {
        return this._content;
    }

    get extension() {
        return this._extension;
    }

    fullName() {
        return this._name + this._extension;
    }
}

module.exports = FileDataDto;
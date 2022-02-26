class BaseModel {
  constructor(_data, _message) {
    if (typeof _data === 'string') {
      this.message = _data
      _data = null
      _message = null
    }
    if (_data) {
      this.data = _data
    }
    if (_message) {
      this.message = _message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
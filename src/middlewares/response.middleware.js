export class SuccessResponse {
	constructor({ message, code, data = {} }) {
		this.message = message;
		this.code = code;
		this.data = data;
	}
    send(res, header = {}) {
    const response = {
      message: this.message,
      code: this.code,
    }

    if (this.data && Object.keys(this.data).length > 0) {
      response.data = this.data;
    }
	
	return res.status(this.code).json(response)
}
}
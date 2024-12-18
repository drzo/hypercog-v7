export class RequestBuilder {
    config = {
        method: 'GET',
        headers: {},
        params: {}
    };
    setMethod(method) {
        this.config.method = method;
        return this;
    }
    setHeaders(headers) {
        this.config.headers = { ...this.config.headers, ...headers };
        return this;
    }
    setParams(params) {
        this.config.params = { ...this.config.params, ...params };
        return this;
    }
    setBody(body) {
        this.config.body = body;
        return this;
    }
    build() {
        return { ...this.config };
    }
}
export const createRequest = () => new RequestBuilder();

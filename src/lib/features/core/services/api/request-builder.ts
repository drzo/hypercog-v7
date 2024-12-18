import type { ApiRequestConfig } from '../../types/api';

export class RequestBuilder {
  private config: ApiRequestConfig = {
    method: 'GET',
    headers: {},
    params: {}
  };

  setMethod(method: string): this {
    this.config.method = method;
    return this;
  }

  setHeaders(headers: Record<string, string>): this {
    this.config.headers = { ...this.config.headers, ...headers };
    return this;
  }

  setParams(params: Record<string, string>): this {
    this.config.params = { ...this.config.params, ...params };
    return this;
  }

  setBody(body: unknown): this {
    this.config.body = body;
    return this;
  }

  build(): ApiRequestConfig {
    return { ...this.config };
  }
}

export const createRequest = () => new RequestBuilder();
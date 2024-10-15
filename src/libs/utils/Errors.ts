class BaseError extends Error {
  code: string;
  message: string;
  data: any;

  constructor(code = 'ERR_OTHER', message = 'An error occurred...', data: any = null) {
    super(message);
    this.code = code;
    this.message = message;
    this.data = data;

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;
    // Avoid leaking stack for those errors
    delete this.stack;
  }
}

class DependencyError extends BaseError {
  source: any;
  dependents: any[];

  constructor(source: any, dependents: any[] = []) {
    super('ERR_DEPENDENCY', 'DELETE request not possible');
    this.source = source;
    this.dependents = dependents;
  }
}

class ServerError extends BaseError {
  constructor(module: string, apiCall: string, err: Error, params: object = {}) {
    const data = {
      apiCall, module, params, err,
    };
    const message = `${module} - ${apiCall}\n\n${err?.toString()}`;
    super('ERR_SERVER', message, data);
  }
}

export {
  BaseError,
  DependencyError,
  ServerError,
};

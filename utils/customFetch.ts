import type { AuthTokenGetter } from "@/types/http-client";

type ResponseType =
  | "json"
  | "text"
  | "blob"
  | "arrayBuffer"
  | "formData"
  | "auto";

export interface CustomFetchOptions extends Omit<RequestInit, 'body'> {
  body?: RequestInit['body'] | Record<string, unknown> | unknown[] | any;
  responseType?: ResponseType;
  query?: Record<string, string | number | boolean | undefined>;
  timeout?: number;
  retries?: number;
}

let _baseUrl = "";
let _authTokenGetter: AuthTokenGetter | null = null;
let _usernameGetter: (() => string | null) | null = null;

export function setBaseUrl(url: string | null): void {
  _baseUrl = url ? url.replace(/\/+$/, "") : "";
}

export function setAuthTokenGetter(getter: AuthTokenGetter | null): void {
  _authTokenGetter = getter;
}

export function setUsernameGetter(getter: (() => string | null) | null): void {
  _usernameGetter = getter;
}

export class ApiError<T = unknown> extends Error {
  readonly name = "ApiError";
  readonly status: number;
  readonly statusText: string;
  readonly data: T | null;
  readonly headers: Headers;
  readonly response: Response;
  readonly method: string;
  readonly url: string;

  constructor(
    response: Response,
    data: T | null,
    requestInfo: { method: string; url: string },
  ) {
    super(`HTTP ${response.status} ${response.statusText}`);
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = response.status;
    this.statusText = response.statusText;
    this.data = data;
    this.headers = response.headers;
    this.response = response;
    this.method = requestInfo.method;
    this.url = response.url || requestInfo.url;
  }
}

export async function customFetch<T = unknown>(
  input: RequestInfo | URL,
  options: CustomFetchOptions = {},
): Promise<T> {
  const {
    responseType = "auto",
    headers: headersInit,
    query,
    timeout = 15000,
    retries = 0,
    ...init
  } = options;

  let url =
    typeof input === "string"
      ? input
      : (input as Request).url || input.toString();

  if (_baseUrl && url.startsWith("/")) {
    url = `${_baseUrl}${url}`;
  }

  if (query) {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        params.set(key, String(value));
      }
    }

    url += `?${params.toString()}`;
  }

  const method = (init.method || "GET").toUpperCase();

  const headers = new Headers(headersInit);

  if (_authTokenGetter && !headers.has("authorization")) {
    const token = await _authTokenGetter();

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
  }

  if (_usernameGetter && !headers.has("x-owner-user-name")) {
    const username = _usernameGetter();
    if (username) {
      headers.set("x-owner-user-name", username);
    }
  }

  let body = init.body;

  if (
    body &&
    typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof Blob) &&
    !(body instanceof URLSearchParams)
  ) {
    body = JSON.stringify(body);

    if (!headers.has("content-type")) {
      headers.set("content-type", "application/json");
    }
  } else if (
    body &&
    typeof body === "string" &&
    !headers.has("content-type")
  ) {
    // If the body is a JSON string, ensure the header is set
    if (body.startsWith("{") || body.startsWith("[")) {
      headers.set("content-type", "application/json");
    }
  }

  if (responseType === "json" && !headers.has("accept")) {
    headers.set("accept", "application/json");
  }

  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  async function execute(): Promise<T> {
    const requestInfo = { method, url };

    try {
      const response = await fetch(url, {
        ...init,
        body,
        method,
        headers,
        signal: controller.signal,
      });

      if (!response.ok) {
        let errorData: unknown = null;

        try {
          errorData = await response.clone().json();
        } catch {
          try {
            errorData = await response.text();
          } catch {
            /* empty */
          }
        }

        throw new ApiError(response, errorData as T | null, requestInfo);
      }

      if (
        response.status === 204 ||
        response.headers.get("content-length") === "0"
      ) {
        return null as T;
      }

      switch (responseType) {
        case "text":
          return (await response.text()) as T;

        case "blob":
          return (await response.blob()) as T;

        case "arrayBuffer":
          return (await response.arrayBuffer()) as T;

        case "formData":
          return (await response.formData()) as T;
      }

      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        return (await response.json()) as T;
      }

      return (await response.text()) as T;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await execute();
    } catch (error) {
      lastError = error;

      const shouldRetry =
        error instanceof ApiError ? error.status >= 500 : true;

      if (!shouldRetry || attempt === retries) {
        throw error;
      }
    }
  }

  throw lastError;
}

export interface DataSourceConfig {
  url: string;
  method: "GET" | "POST";
  headers?: any;
  authType?: "none" | "apiKey" | "bearer" | "basic";
  authConfig?: any;
  queryParams?: any;
  body?: string;
  responseDataPath?: string;
}

export type FetchResult =
  | { success: true; status: number; data: any }
  | { success: false; error: string; status?: number; data?: any };

function toStringRecord(input: unknown): Record<string, string> {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};

  return Object.entries(input as Record<string, unknown>).reduce<
    Record<string, string>
  >((acc, [key, value]) => {
    if (typeof value === "string" && key.trim()) {
      acc[key.trim()] = value;
    }
    return acc;
  }, {});
}

function basicAuthToken(username: string, password: string): string {
  const payload = `${username}:${password}`;
  if (typeof btoa === "function") return btoa(payload);
  return Buffer.from(payload).toString("base64");
}

export async function fetchDatasource(
  config: DataSourceConfig
): Promise<FetchResult> {
  const headers = toStringRecord(config.headers);
  const queryParams = toStringRecord(config.queryParams);

  const authConfig =
    config.authConfig && typeof config.authConfig === "object"
      ? (config.authConfig as Record<string, unknown>)
      : {};

  if (config.authType === "bearer") {
    const token =
      typeof authConfig.token === "string" ? authConfig.token.trim() : "";
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  if (config.authType === "basic") {
    const username =
      typeof authConfig.username === "string"
        ? authConfig.username.trim()
        : "";
    const password =
      typeof authConfig.password === "string" ? authConfig.password : "";
    if (username || password) {
      headers.Authorization = `Basic ${basicAuthToken(username, password)}`;
    }
  }

  if (config.authType === "apiKey") {
    const keyName =
      typeof authConfig.keyName === "string" ? authConfig.keyName.trim() : "";
    const keyValue =
      typeof authConfig.keyValue === "string" ? authConfig.keyValue : "";
    const location =
      authConfig.location === "query" ? "query" : "header";

    if (keyName && keyValue) {
      if (location === "query") {
        queryParams[keyName] = keyValue;
      } else {
        headers[keyName] = keyValue;
      }
    }
  }

  const requestUrl = new URL(config.url);
  for (const [key, value] of Object.entries(queryParams)) {
    requestUrl.searchParams.set(key, value);
  }

  const method = config.method;
  const init: RequestInit = { method, headers };

  if (method === "POST" && config.body) {
    init.body = config.body;
    if (!headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }
  }

  try {
    const response = await fetch(requestUrl.toString(), init);
    const contentType = response.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");
    const payload = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      return {
        success: false,
        error: `Request failed with status ${response.status}`,
        status: response.status,
        data: payload,
      };
    }

    return {
      success: true,
      status: response.status,
      data: payload,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Unable to reach the API",
    };
  }
}

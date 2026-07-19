export interface FetchWithTimeoutOptions extends RequestInit {
  timeoutMs?: number;
  timeoutMessage?: string;
  errorMessage?: string;
}

const DEFAULT_TIMEOUT_MS = 15000;
const DEFAULT_TIMEOUT_MESSAGE = "O servidor demorou muito para responder. Tente novamente mais tarde.";
const DEFAULT_ERROR_MESSAGE = "Não foi possível carregar agora. Tente novamente mais tarde.";

export class FetchError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "FetchError";
  }
}

export async function fetchWithTimeout(
  url: string,
  options: FetchWithTimeoutOptions = {},
): Promise<Response> {
  const {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    timeoutMessage = DEFAULT_TIMEOUT_MESSAGE,
    errorMessage = DEFAULT_ERROR_MESSAGE,
    ...fetchOptions
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    return response;
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new FetchError(timeoutMessage);
    }
    throw new FetchError(errorMessage);
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchJson<T>(
  url: string,
  options: FetchWithTimeoutOptions = {},
): Promise<T> {
  const response = await fetchWithTimeout(url, options);
  if (!response.ok) {
    throw new FetchError(
      `Erro do servidor (${response.status})`,
      response.status,
    );
  }
  return response.json() as Promise<T>;
}

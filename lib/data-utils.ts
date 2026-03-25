export function extractDataAtPath(response: unknown, path?: string): unknown {
  if (!path?.trim()) return response;

  const segments = path
    .split(".")
    .map((segment) => segment.trim())
    .filter(Boolean);

  let current: unknown = response;

  for (const segment of segments) {
    if (Array.isArray(current)) {
      const index = Number(segment);
      if (!Number.isInteger(index) || index < 0 || index >= current.length) {
        return undefined;
      }
      current = current[index];
      continue;
    }

    if (current === null || typeof current !== "object") {
      return undefined;
    }

    current = (current as Record<string, unknown>)[segment];
  }

  return current;
}

/** Apply datasource responseDataPath then widget valuePath in sequence. */
export function resolveWidgetData(
  response: unknown,
  responseDataPath?: string,
  valuePath?: string
): unknown {
  let data = extractDataAtPath(response, responseDataPath);
  data = extractDataAtPath(data, valuePath);
  return data;
}

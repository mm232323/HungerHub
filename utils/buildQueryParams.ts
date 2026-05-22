export function buildQueryParams(params?: Record<string, any>): string {
    if (!params) return "";
    const normalizedParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        normalizedParams.append(key, value.toString());
      }
    });
    const stringified = normalizedParams.toString();
    return stringified.length > 0 ? `?${stringified}` : "";
  }
  
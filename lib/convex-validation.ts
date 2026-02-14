export const PROJECT_COLOR_ALLOWLIST = [
  "bg-amber-400",
  "bg-blue-400",
  "bg-emerald-400",
  "bg-purple-400",
  "bg-rose-400",
  "bg-cyan-400",
  "bg-orange-400",
  "bg-pink-400",
] as const;

export const PROJECT_NAME_MAX_LENGTH = 80;
export const PROJECT_DESCRIPTION_MAX_LENGTH = 280;
export const DASHBOARD_TITLE_MAX_LENGTH = 80;
export const DASHBOARD_DESCRIPTION_MAX_LENGTH = 280;
export const DASHBOARD_REFRESH_INTERVAL_MIN = 0;
export const DASHBOARD_REFRESH_INTERVAL_MAX = 86400;
export const DASHBOARD_PUBLIC_SLUG_PATTERN = /^[a-z0-9-]+$/;

export function assertTrimmedNonEmpty(value: string, label: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(`${label} is required`);
  }
  return trimmed;
}

export function assertMaxLength(value: string, maxLength: number, label: string) {
  if (value.length > maxLength) {
    throw new Error(`${label} must be ${maxLength} characters or fewer`);
  }
}

export function normalizeOptionalText(
  value: string | undefined,
  maxLength: number,
  label: string
) {
  if (value === undefined) return undefined;

  const trimmed = value.trim();
  if (!trimmed) return undefined;

  assertMaxLength(trimmed, maxLength, label);
  return trimmed;
}

export function assertAllowedProjectColor(color: string | undefined) {
  if (!color) return;
  if (!PROJECT_COLOR_ALLOWLIST.includes(color as (typeof PROJECT_COLOR_ALLOWLIST)[number])) {
    throw new Error("Invalid project color");
  }
}

export function assertPublicSlug(publicSlug: string | undefined) {
  if (!publicSlug) return;
  if (!DASHBOARD_PUBLIC_SLUG_PATTERN.test(publicSlug)) {
    throw new Error("Invalid public slug format");
  }
}

export function assertRefreshInterval(refreshInterval: number | undefined) {
  if (refreshInterval === undefined) return;
  if (!Number.isFinite(refreshInterval)) {
    throw new Error("Refresh interval must be a finite number");
  }
  if (
    refreshInterval < DASHBOARD_REFRESH_INTERVAL_MIN ||
    refreshInterval > DASHBOARD_REFRESH_INTERVAL_MAX
  ) {
    throw new Error(
      `Refresh interval must be between ${DASHBOARD_REFRESH_INTERVAL_MIN} and ${DASHBOARD_REFRESH_INTERVAL_MAX} seconds`
    );
  }
}

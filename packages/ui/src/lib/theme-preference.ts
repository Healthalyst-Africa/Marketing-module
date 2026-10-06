export interface ThemePreferenceConfiguration {
  cookieName: string;
  defaultIdentifier: string;
  paletteIdentifiers: readonly string[];
}

/** Apply a validated presentation preference before the document paints. */
export function createThemeInitializationScript(
  configuration: ThemePreferenceConfiguration
): string {
  const serializedConfiguration = JSON.stringify(configuration).replace(
    /</g,
    "\\u003c"
  );

  return `(${initializeTheme.toString()})(${serializedConfiguration});`;
}

function initializeTheme(configuration: ThemePreferenceConfiguration) {
  let selectedIdentifier = configuration.defaultIdentifier;
  try {
    const preference = document.cookie
      .split(";")
      .map((entry) => entry.trim())
      .find((entry) => entry.startsWith(`${configuration.cookieName}=`));
    const savedIdentifier = preference
      ? decodeURIComponent(
          preference.slice(configuration.cookieName.length + 1)
        )
      : configuration.defaultIdentifier;
    if (configuration.paletteIdentifiers.includes(savedIdentifier)) {
      selectedIdentifier = savedIdentifier;
    }
  } catch {
    // Cookies may be unavailable; the original palette remains usable.
  }
  document.documentElement.dataset.palette = selectedIdentifier;
}

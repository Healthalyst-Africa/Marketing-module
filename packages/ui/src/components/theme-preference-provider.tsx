"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { ThemePreferenceConfiguration } from "@healthalyst/ui/lib/theme-preference";

interface ThemePreferenceValue {
  selectedIdentifier: string;
  defaultIdentifier: string;
  persistenceAvailable: boolean;
  selectPalette: (identifier: string) => void;
  resetPalette: () => void;
}

const ThemePreferenceContext = createContext<ThemePreferenceValue | null>(null);
const THEME_CHANGE_EVENT = "design-palette-change";

function readSavedPreference(cookieName: string): string | undefined {
  const entry = document.cookie
    .split(";")
    .map((value) => value.trim())
    .find((value) => value.startsWith(`${cookieName}=`));
  return entry
    ? decodeURIComponent(entry.slice(cookieName.length + 1))
    : undefined;
}

export function ThemePreferenceProvider({
  configuration,
  children,
}: {
  configuration: ThemePreferenceConfiguration;
  children: ReactNode;
}) {
  const [persistenceAvailable, setPersistenceAvailable] = useState(true);
  const persistenceAvailableReference = useRef(true);
  const broadcastChannelReference = useRef<BroadcastChannel | null>(null);

  const applyPalette = useCallback((identifier: string) => {
    document.documentElement.dataset.palette = identifier;
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const subscribe = useCallback((notifyChange: () => void) => {
    window.addEventListener(THEME_CHANGE_EVENT, notifyChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, notifyChange);
  }, []);

  const getSnapshot = useCallback(() => {
    const identifier = document.documentElement.dataset.palette;
    return identifier && configuration.paletteIdentifiers.includes(identifier)
      ? identifier
      : configuration.defaultIdentifier;
  }, [configuration]);

  const getServerSnapshot = useCallback(
    () => configuration.defaultIdentifier,
    [configuration]
  );
  const selectedIdentifier = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    const synchronizeCookie = () => {
      if (!persistenceAvailableReference.current) return;
      try {
        const savedIdentifier =
          readSavedPreference(configuration.cookieName) ??
          configuration.defaultIdentifier;
        applyPalette(
          configuration.paletteIdentifiers.includes(savedIdentifier)
            ? savedIdentifier
            : configuration.defaultIdentifier
        );
      } catch {
        // Keep the current session preference if cookie access is blocked.
      }
    };
    const synchronizeVisiblePage = () => {
      if (document.visibilityState === "visible") synchronizeCookie();
    };

    let broadcastChannel: BroadcastChannel | null = null;
    try {
      broadcastChannel = new BroadcastChannel(configuration.cookieName);
      broadcastChannel.onmessage = (messageEvent: MessageEvent<unknown>) => {
        if (
          typeof messageEvent.data === "string" &&
          configuration.paletteIdentifiers.includes(messageEvent.data)
        ) {
          applyPalette(messageEvent.data);
          let preferenceSaved = false;
          try {
            preferenceSaved =
              (readSavedPreference(configuration.cookieName) ??
                configuration.defaultIdentifier) === messageEvent.data;
          } catch {
            // The incoming palette still works when cookies are unavailable.
          }
          persistenceAvailableReference.current = preferenceSaved;
          setPersistenceAvailable(preferenceSaved);
        }
      };
      broadcastChannelReference.current = broadcastChannel;
    } catch {
      // Focus synchronization also works where BroadcastChannel is unavailable.
    }

    window.addEventListener("focus", synchronizeCookie);
    window.addEventListener("pageshow", synchronizeCookie);
    document.addEventListener("visibilitychange", synchronizeVisiblePage);
    return () => {
      broadcastChannel?.close();
      broadcastChannelReference.current = null;
      window.removeEventListener("focus", synchronizeCookie);
      window.removeEventListener("pageshow", synchronizeCookie);
      document.removeEventListener("visibilitychange", synchronizeVisiblePage);
    };
  }, [applyPalette, configuration]);

  const selectPalette = useCallback(
    (identifier: string) => {
      if (!configuration.paletteIdentifiers.includes(identifier)) return;
      applyPalette(identifier);
      let preferenceSaved = false;
      try {
        const secureAttribute =
          window.location.protocol === "https:" ? "; Secure" : "";
        const maximumAge =
          identifier === configuration.defaultIdentifier ? 0 : 31536000;
        document.cookie = `${configuration.cookieName}=${encodeURIComponent(identifier)}; Path=/; Max-Age=${maximumAge}; SameSite=Lax${secureAttribute}`;
        const savedIdentifier = readSavedPreference(configuration.cookieName);
        preferenceSaved =
          identifier === configuration.defaultIdentifier
            ? savedIdentifier === undefined
            : savedIdentifier === identifier;
      } catch {
        // Applying a palette does not depend on persistence being permitted.
      }
      persistenceAvailableReference.current = preferenceSaved;
      setPersistenceAvailable(preferenceSaved);
      try {
        broadcastChannelReference.current?.postMessage(identifier);
      } catch {
        // Closed or restricted channels must not prevent local selection.
      }
    },
    [applyPalette, configuration]
  );

  return (
    <ThemePreferenceContext.Provider
      value={{
        selectedIdentifier,
        defaultIdentifier: configuration.defaultIdentifier,
        persistenceAvailable,
        selectPalette,
        resetPalette: () => selectPalette(configuration.defaultIdentifier),
      }}
    >
      {children}
    </ThemePreferenceContext.Provider>
  );
}

export function useThemePreference(): ThemePreferenceValue {
  const context = useContext(ThemePreferenceContext);
  if (!context) {
    throw new Error("useThemePreference requires a ThemePreferenceProvider.");
  }
  return context;
}

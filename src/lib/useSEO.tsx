import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
  type Dispatch,
} from "react";

const BASE_URL = "https://rad-architecture-showcase.vercel.app";

export interface SEOConfig {
  title: string;
  description?: string;
  ogImage?: string;
  canonicalPath?: string;
  jsonLd?: Record<string, unknown>[];
}

const SEOContext = createContext<Dispatch<SEOConfig | null> | null>(null);

export function SEOProvider({
  children,
  defaultConfig,
}: {
  children: ReactNode;
  defaultConfig?: SEOConfig | null;
}) {
  const [config, setConfig] = useState<SEOConfig | null>(defaultConfig ?? null);
  const hasOverride = useRef(false);

  const setPageConfig: Dispatch<SEOConfig | null> = useCallback(
    (pageConfig) => {
      hasOverride.current = pageConfig !== null;
      setConfig(pageConfig ?? (defaultConfig ?? null));
    },
    [defaultConfig],
  );

  useEffect(() => {
    if (!hasOverride.current) {
      setConfig(defaultConfig ?? null);
    }
  }, [defaultConfig]);

  useEffect(() => {
    if (!config) return;

    const ids: string[] = [];
    const uid = () => Math.random().toString(36).slice(2, 10);

    function addTag<K extends keyof HTMLElementTagNameMap>(
      tag: K,
      attrs: Record<string, string>,
      content?: string,
    ) {
      const id = uid();
      ids.push(id);
      const el = document.createElement(tag);
      el.setAttribute("data-seo", id);
      for (const [k, v] of Object.entries(attrs)) {
        el.setAttribute(k, v);
      }
      if (content !== undefined) {
        el.textContent = content;
      }
      document.head.appendChild(el);
    }

    document.title = config.title;

    if (config.description) {
      addTag("meta", { name: "description", content: config.description });
    }

    addTag("meta", { property: "og:title", content: config.title });
    if (config.description) {
      addTag("meta", { property: "og:description", content: config.description });
    }
    if (config.ogImage) {
      addTag("meta", { property: "og:image", content: config.ogImage });
    }
    const url = config.canonicalPath ? `${BASE_URL}${config.canonicalPath}` : BASE_URL;
    addTag("meta", { property: "og:url", content: url });
    addTag("meta", { property: "og:type", content: "website" });

    addTag("meta", { name: "twitter:card", content: "summary_large_image" });
    addTag("meta", { name: "twitter:title", content: config.title });
    if (config.description) {
      addTag("meta", { name: "twitter:description", content: config.description });
    }
    if (config.ogImage) {
      addTag("meta", { name: "twitter:image", content: config.ogImage });
    }

    addTag("link", { rel: "canonical", href: url });

    if (config.jsonLd) {
      for (const schema of config.jsonLd) {
        addTag("script", { type: "application/ld+json" }, JSON.stringify(schema));
      }
    }

    return () => {
      for (const id of ids) {
        const els = document.querySelectorAll(`[data-seo="${id}"]`);
        for (let i = 0; i < els.length; i++) {
          els[i].remove();
        }
      }
    };
  }, [config]);

  return <SEOContext.Provider value={setPageConfig}>{children}</SEOContext.Provider>;
}

export function useSEO(config: SEOConfig | null) {
  const setConfig = useContext(SEOContext);

  useEffect(() => {
    if (!setConfig) return;
    setConfig(config);
    return () => {
      setConfig(null);
    };
  }, [config, setConfig]);
}

/**
 * Max Wilson Pereira - Web Components
 * Reusable custom elements (vanilla JS, no React)
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components
 */

function getBasePath() {
  return window.location.pathname.includes("/pages/") ? "../" : "";
}

/* ─── max-badge ────────────────────────────────────────────────────────────── */
class MaxBadge extends HTMLElement {
  connectedCallback() {
    const text =
      this.getAttribute("text") || MWP_CONFIG?.badge || "Tenor • Artista";
    this.innerHTML = `<span class="badge">${text}</span>`;
  }
}
customElements.define("max-badge", MaxBadge);

/* ─── max-back-button ─────────────────────────────────────────────────────── */
class MaxBackButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <a class="back-button" href="/">
        <svg class="back-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Voltar
      </a>
    `;
  }
}
customElements.define("max-back-button", MaxBackButton);

/* ─── max-hero-bg ─────────────────────────────────────────────────────────── */
class MaxHeroBg extends HTMLElement {
  connectedCallback() {
    this.outerHTML = '<div class="hero-bg"></div>';
  }
}
customElements.define("max-hero-bg", MaxHeroBg);

/* ─── max-profile-img ─────────────────────────────────────────────────────── */
class MaxProfileImg extends HTMLElement {
  connectedCallback() {
    const base = getBasePath();
    const img = MWP_CONFIG?.profileImage || "max-gigga.jpg";
    const alt = this.getAttribute("alt") || "Max Wilson Pereira";
    this.innerHTML = `
      <img src="${base}assets/${img}" alt="${alt}" class="profile-img" />
    `;
  }
}
customElements.define("max-profile-img", MaxProfileImg);

/* ─── max-link-list ───────────────────────────────────────────────────────── */
class MaxLinkList extends HTMLElement {
  connectedCallback() {
    const links = MWP_CONFIG?.links || [];
    const items = links
      .map(
        (link) => `
        <div class="link-button">
          <a href="${link.href}" ${link.external ? 'target="_blank"' : ""}>${link.text}</a>
        </div>
      `,
      )
      .join("");
    this.innerHTML = `<nav class="link-list">${items}</nav>`;
  }
}
customElements.define("max-link-list", MaxLinkList);

/* ─── max-tagline ─────────────────────────────────────────────────────────── */
class MaxTagline extends HTMLElement {
  connectedCallback() {
    const text = this.getAttribute("text") || MWP_CONFIG?.tagline || "";
    this.innerHTML = `<p class="tagline">${text}</p>`;
  }
}
customElements.define("max-tagline", MaxTagline);

/* ─── max-site-name ───────────────────────────────────────────────────────── */
class MaxSiteName extends HTMLElement {
  connectedCallback() {
    const text =
      this.getAttribute("text") || MWP_CONFIG?.siteName || "Max Wilson Pereira";
    this.textContent = text;
  }
}
customElements.define("max-site-name", MaxSiteName);

/* ─── max-seo-meta ────────────────────────────────────────────────────────── */
class MaxSeoMeta extends HTMLElement {
  connectedCallback() {
    const page = this.getAttribute("page") || "home";
    const config = MWP_CONFIG?.seo?.[page] || MWP_CONFIG?.seo?.home;
    if (!config) return;

    const url = MWP_CONFIG?.siteUrl || "https://maxwilsonpereira.com.br";
    const fullUrl = config.path === "/" ? `${url}/` : `${url}${config.path}`;
    const image = MWP_CONFIG?.ogImage || `${url}/assets/max-gigga.jpg`;
    const siteName = MWP_CONFIG?.siteName || "Max Wilson Pereira";

    const inject = (tag, attrs) => {
      const el = document.createElement(tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
    };

    document.title = config.title;

    inject("meta", { name: "description", content: config.description });
    inject("link", { rel: "canonical", href: fullUrl });

    inject("meta", { property: "og:type", content: "website" });
    inject("meta", { property: "og:url", content: fullUrl });
    inject("meta", { property: "og:title", content: config.title });
    inject("meta", {
      property: "og:description",
      content: config.ogDescription || config.description,
    });
    inject("meta", { property: "og:image", content: image });
    inject("meta", { property: "og:locale", content: "pt_BR" });
    inject("meta", { property: "og:site_name", content: siteName });

    inject("meta", { name: "twitter:card", content: "summary_large_image" });
    inject("meta", { name: "twitter:title", content: config.title });
    inject("meta", {
      name: "twitter:description",
      content: config.ogDescription || config.description,
    });
    inject("meta", { name: "twitter:image", content: image });

    let jsonLd = { "@context": "https://schema.org", ...config.jsonLd };
    if (
      config.jsonLd?.["@type"] === "Person" &&
      MWP_CONFIG?.socialLinks?.length
    ) {
      jsonLd = { ...jsonLd, sameAs: MWP_CONFIG.socialLinks };
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }
}
customElements.define("max-seo-meta", MaxSeoMeta);

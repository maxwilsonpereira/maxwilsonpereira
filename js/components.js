/**
 * Max Wilson Pereira - Web Components
 * Reusable custom elements (vanilla JS, no React)
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components
 */

function getBasePath() {
  const path = window.location.pathname;
  if (path === '/' || path === '/index.html') return '';
  return '../';
}

/* ─── max-badge ────────────────────────────────────────────────────────────── */
class MaxBadge extends HTMLElement {
  connectedCallback() {
    const text =
      this.getAttribute('text') || MWP_CONFIG?.badge || 'Tenor • Artista';
    this.innerHTML = `<span class="badge">${text}</span>`;
  }
}
customElements.define('max-badge', MaxBadge);

/* ─── max-back-button ─────────────────────────────────────────────────────── */
class MaxBackButton extends HTMLElement {
  connectedCallback() {
    const href = this.getAttribute('href') || '/';
    this.innerHTML = `
      <a class="back-button" href="${href}">
        <svg class="back-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Voltar
      </a>
    `;
  }
}
customElements.define('max-back-button', MaxBackButton);

/* ─── max-site-nav ────────────────────────────────────────────────────────── */
class MaxSiteNav extends HTMLElement {
  connectedCallback() {
    const links = MWP_CONFIG?.links || [];
    const siteName = MWP_CONFIG?.siteName || 'Max Wilson Pereira';
    const navId = `site-nav-${Math.random().toString(36).slice(2)}`;
    const items = links
      .map(
        (link) => `
          <a class="site-nav-link" href="${link.href}" ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
            ${link.text}
          </a>
        `,
      )
      .join('');

    this.innerHTML = `
      <header class="site-header">
        <a class="site-brand" href="/" aria-label="${siteName} - Home">
          <span>${siteName}</span>
        </a>

        <button class="site-nav-toggle" type="button" aria-expanded="false" aria-controls="${navId}" aria-label="Abrir menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav class="site-nav" id="${navId}" aria-label="Navegação principal">
          ${items}
        </nav>
      </header>
    `;

    const toggle = this.querySelector('.site-nav-toggle');
    const nav = this.querySelector('.site-nav');

    toggle?.addEventListener('click', () => {
      const isOpen = nav?.classList.toggle('is-open') || false;
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });
  }
}
customElements.define('max-site-nav', MaxSiteNav);

/* ─── max-hero-bg ─────────────────────────────────────────────────────────── */
class MaxHeroBg extends HTMLElement {
  connectedCallback() {
    this.outerHTML = '<div class="hero-bg"></div>';
  }
}
customElements.define('max-hero-bg', MaxHeroBg);

/* ─── max-profile-img ─────────────────────────────────────────────────────── */
class MaxProfileImg extends HTMLElement {
  connectedCallback() {
    const base = getBasePath();
    const img = MWP_CONFIG?.profileImage || 'max-gigga.jpg';
    const alt = this.getAttribute('alt') || 'Max Wilson Pereira';
    this.innerHTML = `
      <img src="${base}assets/${img}" alt="${alt}" class="profile-img" />
    `;
  }
}
customElements.define('max-profile-img', MaxProfileImg);

/* ─── max-link-list ───────────────────────────────────────────────────────── */
class MaxLinkList extends HTMLElement {
  connectedCallback() {
    const links = MWP_CONFIG?.links || [];
    const variant = this.getAttribute('variant');
    const navClass = variant === 'hero' ? 'link-list hero-link-list' : 'link-list';
    const items = links
      .map(
        (link) => `
        <div class="link-button">
          <a href="${link.href}" ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>${link.text}</a>
        </div>
      `,
      )
      .join('');
    this.innerHTML = `<nav class="${navClass}" aria-label="Links principais">${items}</nav>`;
  }
}
customElements.define('max-link-list', MaxLinkList);

/* ─── max-social-follow ───────────────────────────────────────────────────── */
class MaxSocialFollow extends HTMLElement {
  connectedCallback() {
    const socials = [
      {
        name: 'Instagram',
        href: 'https://www.instagram.com/maxwilsonpereira/',
        icon: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/>',
      },
      {
        name: 'YouTube',
        href: 'https://www.youtube.com/user/maxwilsonpereira',
        icon: '<path d="M22 12s0-3.35-.43-4.96a2.8 2.8 0 0 0-1.98-1.98C17.85 4.6 12 4.6 12 4.6s-5.85 0-7.59.46a2.8 2.8 0 0 0-1.98 1.98C2 8.65 2 12 2 12s0 3.35.43 4.96a2.8 2.8 0 0 0 1.98 1.98c1.74.46 7.59.46 7.59.46s5.85 0 7.59-.46a2.8 2.8 0 0 0 1.98-1.98C22 15.35 22 12 22 12Z"/><path d="m10 15.2 5.2-3.2L10 8.8v6.4Z" fill="currentColor" stroke="none"/>',
      },
      {
        name: 'TikTok',
        href: 'https://www.tiktok.com/discover/maxwilsonpereira',
        icon: '<path d="M14.2 3v10.2a4.25 4.25 0 1 1-4.25-4.25c.43 0 .85.06 1.25.18v3.06a1.46 1.46 0 1 0 1 1.39V3h2Z"/><path d="M14.2 3c.52 2.65 2.08 4.35 4.8 4.62v3.02c-1.82-.1-3.45-.72-4.8-1.82V3Z"/>',
      },
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/maxwilsonpereira/',
        icon: '<path d="M14 8.6V7.1c0-.74.36-1.1 1.16-1.1H17V3h-2.62C11.8 3 10.4 4.48 10.4 6.86V8.6H8v3.1h2.4V21H14v-9.3h2.48l.42-3.1H14Z"/>',
      },
    ];

    const items = socials
      .map(
        (social) => `
          <a class="social-link social-link-${social.name.toLowerCase()}" href="${social.href}" target="_blank" rel="noopener noreferrer" aria-label="Seguir Max Wilson Pereira no ${social.name}">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              ${social.icon}
            </svg>
            <span>${social.name}</span>
          </a>
        `,
      )
      .join('');

    this.innerHTML = `
      <section class="social-follow" aria-labelledby="social-follow-title">
        <div class="social-follow-inner">
          <p class="social-follow-kicker">Redes sociais</p>
          <h2 id="social-follow-title">Siga Max Wilson Pereira</h2>
          <nav class="social-links" aria-label="Redes sociais de Max Wilson Pereira">
            ${items}
          </nav>
        </div>
      </section>
    `;
  }
}
customElements.define('max-social-follow', MaxSocialFollow);

/* ─── PIX continue form behavior ──────────────────────────────────────────── */
function initPixContinueForm() {
  const input = document.querySelector('.pix-continue-form .pix-input');
  const button = document.querySelector('.pix-continue-form .primary-button');

  if (!input || !button) return;

  const validate = () => {
    const sanitizedName = input.value.trim();
    button.disabled = sanitizedName.length < 3;
  };

  input.addEventListener('input', validate);

  button.addEventListener('click', () => {
    const sanitizedName = input.value.trim();
    if (sanitizedName.length < 3) return;

    window.location.href = '/pages/albums/so-in-love.html';
  });
}

/* Reusable modal behavior */
function initModals() {
  const modals = [...document.querySelectorAll('.modal')];

  if (!modals.length) return;

  const updateBodyLock = () => {
    const hasOpenModal = modals.some((modal) => modal.open);
    document.body.classList.toggle('modal-open', hasOpenModal);
  };

  modals.forEach((modal) => {
    const closeButtons = modal.querySelectorAll('[data-modal-close]');

    closeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        modal.close();
      });
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.close();
      }
    });

    modal.addEventListener('close', updateBodyLock);

    if (modal.hasAttribute('data-open-on-load')) {
      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.setAttribute('open', '');
      }

      updateBodyLock();
    }
  });
}

/* ─── max-tagline ─────────────────────────────────────────────────────────── */
class MaxTagline extends HTMLElement {
  connectedCallback() {
    const text = this.getAttribute('text') || MWP_CONFIG?.tagline || '';
    this.innerHTML = `<p class="tagline">${text}</p>`;
  }
}
customElements.define('max-tagline', MaxTagline);

/* ─── max-site-name ───────────────────────────────────────────────────────── */
class MaxSiteName extends HTMLElement {
  connectedCallback() {
    const text =
      this.getAttribute('text') || MWP_CONFIG?.siteName || 'Max Wilson Pereira';
    this.textContent = text;
  }
}
customElements.define('max-site-name', MaxSiteName);

/* ─── max-seo-meta ────────────────────────────────────────────────────────── */
class MaxSeoMeta extends HTMLElement {
  connectedCallback() {
    const page = this.getAttribute('page') || 'home';
    const config = MWP_CONFIG?.seo?.[page] || MWP_CONFIG?.seo?.home;
    if (!config) return;

    const url = MWP_CONFIG?.siteUrl || 'https://maxwilsonpereira.com.br';
    const fullUrl = config.path === '/' ? `${url}/` : `${url}${config.path}`;
    const image = MWP_CONFIG?.ogImage || `${url}/assets/max-gigga.jpg`;
    const siteName = MWP_CONFIG?.siteName || 'Max Wilson Pereira';

    const inject = (tag, attrs) => {
      const el = document.createElement(tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
    };

    document.title = config.title;

    inject('meta', { name: 'description', content: config.description });
    inject('link', { rel: 'canonical', href: fullUrl });

    inject('meta', { property: 'og:type', content: 'website' });
    inject('meta', { property: 'og:url', content: fullUrl });
    inject('meta', { property: 'og:title', content: config.title });
    inject('meta', {
      property: 'og:description',
      content: config.ogDescription || config.description,
    });
    inject('meta', { property: 'og:image', content: image });
    inject('meta', { property: 'og:locale', content: 'pt_BR' });
    inject('meta', { property: 'og:site_name', content: siteName });

    inject('meta', { name: 'twitter:card', content: 'summary_large_image' });
    inject('meta', { name: 'twitter:title', content: config.title });
    inject('meta', {
      name: 'twitter:description',
      content: config.ogDescription || config.description,
    });
    inject('meta', { name: 'twitter:image', content: image });

    let jsonLd = { '@context': 'https://schema.org', ...config.jsonLd };
    if (
      config.jsonLd?.['@type'] === 'Person' &&
      MWP_CONFIG?.socialLinks?.length
    ) {
      jsonLd = { ...jsonLd, sameAs: MWP_CONFIG.socialLinks };
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }
}
customElements.define('max-seo-meta', MaxSeoMeta);

initPixContinueForm();
initModals();

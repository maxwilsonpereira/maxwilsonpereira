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

const ALBUM_DOWNLOAD_URL = 'https://limewire.com/d/HUpNX#ftFcLUcvby';

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
customElements.define('max-back-button', MaxBackButton);

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
    const items = links
      .map(
        (link) => `
        <div class="link-button">
          <a href="${link.href}" ${link.external ? 'target="_blank"' : ''}>${link.text}</a>
        </div>
      `,
      )
      .join('');
    this.innerHTML = `<nav class="link-list">${items}</nav>`;
  }
}
customElements.define('max-link-list', MaxLinkList);

/* ─── max-pix-continue-form ───────────────────────────────────────────────── */
class MaxPixContinueForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="pix-continue-form">
        <label class="input-label" for="pix-nome">
          Digite aqui o nome usado no PIX
        </label>
        <input
          id="pix-nome"
          class="pix-input"
          type="text"
          placeholder="Digite aqui o nome usado no PIX"
          autocomplete="name"
        />
        <button class="primary-button" type="button" disabled>
          CONTINUAR
        </button>
      </div>
    `;

    const input = this.querySelector('.pix-input');
    const button = this.querySelector('.primary-button');

    if (!input || !button) return;

    const validate = () => {
      const sanitizedName = input.value.trim();
      button.disabled = sanitizedName.length < 3;
    };

    input.addEventListener('input', validate);

    button.addEventListener('click', () => {
      const sanitizedName = input.value.trim();
      if (sanitizedName.length < 3) return;

      const params = new URLSearchParams({ nome: sanitizedName });
      window.location.href = `/pages/so-in-love-download.html?${params.toString()}`;
    });
  }
}
customElements.define('max-pix-continue-form', MaxPixContinueForm);

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

/* ─── download-page ───────────────────────────────────────────────────────── */
class DownloadPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <p>
        Se você efetuou o PIX, muito obrigado, do fundo do meu coração.<br /><br />
        Você está apoiando minha jornada como criador digital e isso significa
        muito para mim.
      </p>
      <p>
        Quero te dizer algo com toda sinceridade: eu não vou conferir se você
        realmente fez o PIX.
      </p>
      <p>
        Eu escolho confiar em você, que me acompanha e apoia minha jornada com
        carinho. Se ainda não fez o pagamento, peço com carinho que só faça o
        download depois de ter efetuado o pagamento.
      </p>
      <a
        class="primary-button download-button"
        href="${ALBUM_DOWNLOAD_URL}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Baixar o álbum
      </a>
      <p>
        Se você quiser me ajudar ainda mais, vou ficar muito feliz se escolher
        uma das músicas e compartilhar um story no Instagram me marcando.
      </p>
      <p>Você pode escrever algo simples como:</p>
      <p>
        "Comprei o álbum SO IN LOVE do @maxwilsonpereira e estou adorando! 🎶"
      </p>
      <p>Isso ajuda muito mais pessoas a descobrirem minha música.</p>
      <p>
        Se você tiver qualquer problema com o download, envie um e-mail para:
      </p>
      <p><strong>maxwilsonpereira@gmail.com</strong></p>
      <p>Assunto do e-mail (em letras maiúsculas):</p>
      <p><strong>PROBLEMA BAIXANDO ALBUM</strong></p>
      <p>
        Assim consigo encontrar sua mensagem mais rapidamente e ajudar você.
      </p>
      <p>
        Muito obrigado pelo apoio!<br />
        Cada compra ajuda diretamente na minha jornada artística.
      </p>
    `;
  }
}
customElements.define('download-page', DownloadPage);

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

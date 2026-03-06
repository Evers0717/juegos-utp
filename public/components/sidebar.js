class AppSidebar extends HTMLElement {
  connectedCallback() {
    // Detectamos en qué página estamos para poner el botón "active"
    const currentPath = window.location.pathname;
    const isInsidePages = currentPath.includes("/pages/");
    const isInseideGamesPages =
      currentPath.includes("/pages/sistemas/") ||
      currentPath.includes("/pages/industrial/") ||
      currentPath.includes("/pages/mecanica/") ||
      currentPath.includes("/pages/civil/") ||
      currentPath.includes("/pages/electrica/");
    const pathPrefix = isInsidePages ? "" : "pages/";
    const rootPrefix = isInsidePages ? "../" : "";

    this.innerHTML = `
      <aside class="sidebar glass">
        <h2 class="logo" style="cursor:pointer" onclick="location.href='${rootPrefix}index.html'">UTP GAMES</h2>
        <nav>
          ${this.createBtn("sistemas", "Facultad de Sistemas", currentPath)}
          ${this.createBtn("industrial", "Facultad de Industrial", currentPath)}
          ${this.createBtn("mecanica", "Facultad de Mecánica", currentPath)}
          ${this.createBtn("civil", "Facultad de Civil", currentPath)}
          ${this.createBtn("electrica", "Facultad de Eléctrica", currentPath)}
        </nav>
      </aside>
    `;
  }

  createBtn(slug, name, currentPath) {
    const isActive = currentPath.includes(slug) ? "active" : "";
    // Si estamos en una página de juego (/pages/<facultad>/...), hay que subir un nivel.
    const isInsideGamesPages =
      currentPath.includes("/pages/sistemas/") ||
      currentPath.includes("/pages/industrial/") ||
      currentPath.includes("/pages/mecanica/") ||
      currentPath.includes("/pages/civil/") ||
      currentPath.includes("/pages/electrica/");

    // Si estamos en /pages/, los hermanos están ahí mismo. Si estamos en raíz, están en pages/
    const isInsidePages = currentPath.includes("/pages/");
    const target = isInsideGamesPages
      ? `../${slug}.html`
      : isInsidePages
        ? `${slug}.html`
        : `pages/${slug}.html`;

    return `
      <button class="nav-btn ${slug} ${isActive}" onclick="location.href='${target}'">
        ${name}
      </button>
    `;
  }
}

customElements.define("app-sidebar", AppSidebar);

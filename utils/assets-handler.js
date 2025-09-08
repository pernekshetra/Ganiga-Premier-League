(function setBaseHref() {
  const { origin, pathname } = location;
  const cut = pathname.indexOf('/teams/');
  const siteRoot = cut >= 0 ? pathname.slice(0, cut + 1) : '/'; // e.g. "/project/" or "/"
  const base = document.createElement('base');
  base.href = origin + siteRoot;
  document.head.prepend(base);
})();

// A direct request for a directory's index file also uses its public URL.
if (location.pathname.endsWith('/index.html')) {
  location.replace(location.pathname.slice(0, -'index.html'.length) + location.search + location.hash);
}

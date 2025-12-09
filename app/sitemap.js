// app/sitemap.js

const SITE_URL = "https://team-pinna-corse.vercel.app";

export default function sitemap() {
  const lastModified = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified },
    { url: `${SITE_URL}/team`, lastModified },
    { url: `${SITE_URL}/gallery`, lastModified },
    { url: `${SITE_URL}/news`, lastModified },
    { url: `${SITE_URL}/partners`, lastModified },
    { url: `${SITE_URL}/contatti`, lastModified },
    { url: `${SITE_URL}/privacy-policy`, lastModified },
    { url: `${SITE_URL}/cookie-policy`, lastModified },
    { url: `${SITE_URL}/Auto`, lastModified },
    { url: `${SITE_URL}/gate`, lastModified },
  ];
}

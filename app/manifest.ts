// PWA manifest definition
export default function manifest() {
  return {
    name: "Travelus",
    short_name: "Travelus",
    description: "Seamless travel, powered by people",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/assets/logo-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/assets/logo-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/assets/screenshots/og-desktopHero.png",
        sizes: "1280x620",
        type: "image/png",
        platform: "wide",
      },
      {
        src: "/assets/screenshots/og-mobileHero.png",
        sizes: "193x420",
        type: "image/png",
        platform: "narrow",
      },
    ],
    categories: [
      "travel",
      "transportation",
      "journey",
      "vehicle booking",
      "traveling",
    ],
    lang: "en",
    dir: "ltr",
  };
}

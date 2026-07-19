"use client";

import { useEffect } from "react";

export default function SearchWidget() {
  useEffect(() => {
    const container = document.getElementById("travelpayouts-search-widget");
    if (!container) return;
    container.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://tp.media/content?marker=550897&shmarker=550897&promo_id=2088&width=100%25&primary=%230a122c&color_button=%23ffc107&color_text=%23ffffff&color_button_text=%230a122c&show_logo=false&multi_city=true&with_hash=true";
    script.async = true;
    container.appendChild(script);
    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div id="travelpayouts-search-widget" className="max-w-4xl mx-auto my-12" />;
}

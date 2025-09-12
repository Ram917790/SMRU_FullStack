import { useEffect, useRef } from "react";

export function useNpfForm({ selector = ".npf_wgts" } = {}) {
  const triedInit = useRef(false);

  useEffect(() => {
    // In dev Strict Mode the effect can run twice; guard it
    if (triedInit.current) return;
    triedInit.current = true;

    function tryRender() {
      // The widget script usually exposes a global render; different projects use different names.
      // Common ones: window.NPF, window.npf, window.renderNpfForms
      const api = window.npf || window.NPF || window.renderNpfForms;
      const nodes = document.querySelectorAll(selector);

      if (!nodes.length) return true; // nothing to do yet

      if (api && typeof api.render === "function") {
        try {
          api.render(); // preferred if available
          return true;
        } catch (e) {
          // fallthrough to manual retry
        }
      }
      if (typeof api === "function") {
        try {
          api(); // some scripts export a bare function
          return true;
        } catch {}
      }
      return false;
    }

    // Attempt immediately
    if (tryRender()) return;

    // Retry a few times in case script is still loading
    let attempts = 0;
    const iv = setInterval(() => {
      attempts += 1;
      if (tryRender() || attempts > 20) {
        clearInterval(iv);
      }
    }, 250);

    return () => clearInterval(iv);
  }, [selector]);
}

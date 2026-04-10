"use client";

import { useEffect, useId, useCallback, useRef } from "react";

export default function MermaidRenderer() {
  const rendered = useId();
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const onWheel = useCallback((e: WheelEvent) => {
    const container = (e.target as HTMLElement).closest(".mermaid-diagram") as HTMLElement | null;
    if (!container) return;

    e.preventDefault();
    const scale = Math.min(Math.max(container.dataset.scale ? parseFloat(container.dataset.scale) : 1, 0.2), 5);
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.round(scale * delta * 100) / 100;

    const rect = container.getBoundingClientRect();
    const x = parseFloat(container.dataset.x ?? "0");
    const y = parseFloat(container.dataset.y ?? "0");
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;

    container.dataset.scale = String(newScale);
    container.dataset.x = String(x - mx * (newScale / scale - 1));
    container.dataset.y = String(y - my * (newScale / scale - 1));
    applyTransform(container);
    showResetBtn(container);
  }, []);

  const onMouseDown = useCallback((e: MouseEvent) => {
    const container = (e.target as HTMLElement).closest(".mermaid-diagram") as HTMLElement | null;
    if (!container || (e.target as HTMLElement).closest("button")) return;
    e.preventDefault();
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    container.classList.add("mermaid-dragging");
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging.current) return;
    const container = document.querySelector(".mermaid-dragging") as HTMLElement | null;
    if (!container) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    container.dataset.x = String(parseFloat(container.dataset.x ?? "0") + dx);
    container.dataset.y = String(parseFloat(container.dataset.y ?? "0") + dy);
    applyTransform(container);
    showResetBtn(container);
  }, []);

  const onMouseUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    document.querySelectorAll(".mermaid-dragging").forEach((el) => el.classList.remove("mermaid-dragging"));
  }, []);

  useEffect(() => {
    document.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("wheel", onWheel);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onWheel, onMouseDown, onMouseMove, onMouseUp]);

  useEffect(() => {
    const container = document.querySelector(".prose");
    if (!container) return;

    const mermaidPres = container.querySelectorAll<HTMLPreElement>(
      "pre[data-language='mermaid'], pre > code[data-language='mermaid']"
    );

    if (mermaidPres.length === 0) return;

    let destroyed = false;

    async function renderDiagrams() {
      const mermaid = (await import("mermaid")).default;

      const isDark = document.documentElement.classList.contains("dark");
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "default",
        securityLevel: "loose",
      });

      for (const pre of mermaidPres) {
        if (destroyed) break;

        const code = pre.tagName === "CODE" ? pre : pre.querySelector("code");
        if (!code) continue;

        const raw = code.textContent ?? "";

        try {
          const { svg } = await mermaid.render(`mermaid-${rendered}-${Math.random().toString(36).slice(2)}`, raw);

          const wrapper = document.createElement("div");
          wrapper.className = "mermaid-diagram";
          wrapper.dataset.scale = "1";
          wrapper.dataset.x = "0";
          wrapper.dataset.y = "0";

          const svgContainer = document.createElement("div");
          svgContainer.className = "mermaid-svg-container";
          svgContainer.innerHTML = svg;
          wrapper.appendChild(svgContainer);

          const controls = document.createElement("div");
          controls.className = "mermaid-controls";
          controls.innerHTML = `
            <button class="mermaid-zoom-in" title="放大">+</button>
            <button class="mermaid-zoom-out" title="缩小">−</button>
            <button class="mermaid-zoom-reset" title="重置">↺</button>
          `;
          wrapper.appendChild(controls);

          controls.querySelector(".mermaid-zoom-in")!.addEventListener("click", () => {
            zoomDiagram(wrapper, 1.25);
          });
          controls.querySelector(".mermaid-zoom-out")!.addEventListener("click", () => {
            zoomDiagram(wrapper, 0.8);
          });
          controls.querySelector(".mermaid-zoom-reset")!.addEventListener("click", () => {
            wrapper.dataset.scale = "1";
            wrapper.dataset.x = "0";
            wrapper.dataset.y = "0";
            applyTransform(wrapper);
            controls.classList.remove("show-reset");
          });

          const parentPre = pre.closest("pre");
          if (parentPre) {
            parentPre.replaceWith(wrapper);
          }
        } catch (err) {
          const errMsg = err instanceof Error ? err.message : "Unknown error";
          const wrapper = document.createElement("div");
          wrapper.className = "mermaid-error";
          wrapper.textContent = `Mermaid render error: ${errMsg}`;

          const parentPre = pre.closest("pre");
          if (parentPre) {
            parentPre.replaceWith(wrapper);
          }
        }
      }
    }

    renderDiagrams();

    function onThemeChange() {
      if (destroyed) return;
      setTimeout(renderDiagrams, 100);
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "class") {
          onThemeChange();
          break;
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      destroyed = true;
      observer.disconnect();
    };
  }, [rendered]);

  return null;
}

function applyTransform(el: HTMLElement) {
  const scale = parseFloat(el.dataset.scale ?? "1");
  const x = parseFloat(el.dataset.x ?? "0");
  const y = parseFloat(el.dataset.y ?? "0");
  const inner = el.querySelector(".mermaid-svg-container") as HTMLElement | null;
  if (inner) {
    inner.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }
}

function zoomDiagram(wrapper: HTMLElement, factor: number) {
  const scale = Math.min(Math.max(parseFloat(wrapper.dataset.scale ?? "1") * factor, 0.2), 5);
  wrapper.dataset.scale = String(Math.round(scale * 100) / 100);
  applyTransform(wrapper);
  showResetBtn(wrapper);
}

function showResetBtn(container: HTMLElement) {
  const controls = container.querySelector(".mermaid-controls");
  if (controls) controls.classList.add("show-reset");
}

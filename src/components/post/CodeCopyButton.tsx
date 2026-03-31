"use client";

import { useEffect } from "react";

export default function CodeCopyButton() {
  useEffect(() => {
    const container = document.querySelector(".prose");
    if (!container) return;

    const pres = container.querySelectorAll("pre");
    const buttons: HTMLButtonElement[] = [];

    pres.forEach((pre) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-copy-btn";
      btn.setAttribute("aria-label", "Copy code");
      btn.innerHTML = copySvg;

      btn.addEventListener("click", () => {
        const code = pre.querySelector("code")?.textContent ?? pre.textContent ?? "";
        navigator.clipboard
          .writeText(code)
          .then(() => {
            btn.textContent = "已复制";
            btn.classList.add("copied");
            setTimeout(() => {
              btn.innerHTML = copySvg;
              btn.classList.remove("copied");
            }, 2000);
          })
          .catch(() => {
            btn.textContent = "复制失败";
            setTimeout(() => {
              btn.innerHTML = copySvg;
            }, 2000);
          });
      });

      pre.style.position = "relative";
      pre.appendChild(btn);
      buttons.push(btn);
    });

    return () => {
      buttons.forEach((btn) => btn.remove());
    };
  }, []);

  return null;
}

const copySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"/><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"/></svg>`;

// ==UserScript==
// @name         Smartschool+
// @namespace    http://tampermonkey.net/
// @author       Joe
// @version      1.1
// @description  Displays full test details (score, commentary, etc.) for newly discovered tests, upcoming tests and the user's scores
// @match        https://*.smartschool.be/*
// @match        https://olva.sisofoscloud.be/*
// @match        https://mijn.olva.be/index.php?*
// @icon         https://static3.smart-school.net/smsc/svg/favicon/favicon.svg
// @match        https://play.google.com/store/apps/details?id=be.smartschool.mobile
// @grant        window.close
// @grant        GM_addStyle
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// @connect      mijn.olva.be
// @connect      olva.sisofoscloud.be
// @connect      olva.smartschool.be
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/Devcom439/Better-Smartschool/main/Smartschool%20%2B.user.js
// @downloadURL  https://raw.githubusercontent.com/Devcom439/Better-Smartschool/main/Smartschool%20%2B.user.js

// ==/UserScript==
(function () {
	"use strict";

	// =====================
	// DARK MODE FUNCTIONS
	// =====================

	console.log("Smartschool+ script started.");

	function applyDarkModeStyles() {
		const darkCSS = `
          /* === Body / Global === */
          body.dark-mode {
            background-color: #1e1e1e !important;
            color: #fff !important;
            -webkit-text-size-adjust: 100%;
            font-family: Open Sans, Helvetica Neue, helvetica, sans-serif;
            font-size: 1rem;
            font-style: normal;
            font-weight: 400;
          }

          body.dark-mode main div:not(.mainPage-Zrcmt, .mainPage-Zrcmt *),
          body.dark-mode section div:not(.mainPage-Zrcmt, .mainPage-Zrcmt *),
          body.dark-mode .content div,
          body.dark-mode .page-container div {
            background-color: #1e1e1e !important;
          }

          body.dark-mode h1:not(.header__title),
          body.dark-mode h2,
          body.dark-mode h3,
          body.dark-mode h4,
          body.dark-mode h5,
          body.dark-mode h6,
          body.dark-mode p,
          body.dark-mode a,
          body.dark-mode span:not(.todoColumnContainer-KCyuk *):not(.smscFrameTitle):not(.add-btn__text):not(.checkbox-row-wrapper__checkbox span):not(.add-btn__icon):not(.choose-metadata *),
          body.dark-mode div:not(.smscComposeMessage):not(.checkbox-row-wrapper__title):not(.add-btn__text):not(.add-btn__icon):not(.choose-metadata):not(.ple):not(.ple *):not(.detail-blob *):not(.mainPage-Zrcmt):not(.mainPage-Zrcmt *):not(.todoColumnContainer-KCyuk):not(.todoColumnContainer-KCyuk *),
          body.dark-mode li,
          body.dark-mode label:not(.choose-metadata *):not(.checkbox-row-wrapper__checkbox),
          body.dark-mode th,
          body.dark-mode td {
            color: #fff !important;
          }

          body.dark-mode .add-btn__text {
            color: #262626 !important;
          }

          /* === Navbar / Topnav === */
          body.dark-mode .topnav__menu,
          body.dark-mode .navbar {
            background-color: #2b2b2b !important;
            color: #fff !important;
          }

          body.dark-mode .topnav__menu-arrow {
            border-color: #333 !important;
            background-color: #333 !important;
          }

          /* === Buttons === */
          body.dark-mode button:not(.topnav__btn):not(.news__feed__button):not(.icon):not(.metadata__buttonbar__buttons button):not(.tree__edit__placeholder):not(.wholedays__expand-button-overflow-indicator):not(.todoColumnContainer-KCyuk *):not(.splitdetail *),
          body.dark-mode .btn:not(.js-todo-column-button-filter):not(.metadata__buttonbar__buttons button),
          body.dark-mode input[type=button],
          body.dark-mode input[type=submit] {
            background-color: #333;
            color: #fff;
            border: 1px solid #444;
          }

          body.dark-mode button:hover:not(.topnav__btn),
          body.dark-mode .topnav__menuitem:hover,
          body.dark-mode .btn:hover,
          body.dark-mode input[type=button]:hover,
          body.dark-mode input[type=submit]:hover {
            background-color: #444 !important;
          }

          /* === Inputs / Forms === */
          body.dark-mode input,
          body.dark-mode textarea,
          body.dark-mode select {
            background-color: #1e1e1e !important;
            color: #fff !important;
            border: 1px solid #333 !important;
          }

          body.dark-mode input::placeholder,
          body.dark-mode textarea::placeholder {
            color: #aaaaaa !important;
          }

          /* === Tables / Borders / Frames === */
          body.dark-mode tr:nth-child(even) td,
          body.dark-mode .helper--height--mega,
          body.dark-mode .modern-message,
          body.dark-mode .alert,
          body.dark-mode .message,
          body.dark-mode .notification {
            background-color: #2a2a2a !important;
          }

          body.dark-mode td[background] {
            background-color: #1e1e1e !important;
            background-image: none !important;
          }

          body.dark-mode .msgcell__parent-td table { background-color: #2a2a2a !important; }

          body.dark-mode hr:not(.menu-divider) {
            border-top: 1px solid #fff !important;
            background-color: transparent !important;
          }

          /* === Left Navigation / Sidebar === */
          body.dark-mode .smscleftnavcontainer,
          body.dark-mode .showLeftNav,
          body.dark-mode .ui-dialog,
          body.dark-mode .ui-dialog-buttonpane,
          body.dark-mode .notifs__hdr,
          body.dark-mode .toolbar.toolbarright {
            background-color: #1e1e1e !important;
            color: #fff !important;
            border: 1px solid #333 !important;
          }

          body.dark-mode .smscleftnavcontainer {
            border-radius: 12px !important;
            box-shadow: -2px -2px 4px rgba(0,0,0,0.6) !important;
          }

          body.dark-mode .smscleftnavcontainer a {
            color: #6ea8ff !important;
          }

          body.dark-mode .smscleftnavcontainer a:hover,
          body.dark-mode .msgContentVal a:hover {
            color: #bbdefb !important;
          }

          /* === Course / Folders === */
          body.dark-mode .showLeftNav .course-page__container,
          body.dark-mode .showLeftNav .empty-state__container,
          body.dark-mode .showLeftNav .course-module-planner {
            background-color: #2a2a2a !important;
          }

          body.dark-mode a.course-link {
            background-color: transparent !important;
            color: #fff !important;
          }

          body.dark-mode a.course-link:hover {
            background-color: #333 !important;
          }

          body.dark-mode a.course-link span.js-course-name,
          body.dark-mode a.course-link span.js-course-descr {
            color: #fff !important;
          }

          /* === Notifications / Dialogs === */
          body.dark-mode .notifs__hdr {
            border-radius: 6px !important;
            padding: 0.5em 1em !important;
          }

          body.dark-mode .dialog-content.metadata {
            background-color: #2a2a2a !important;
            color: #fff !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.6) !important;
          }

          body.dark-mode .dialog-content.metadata .choose-metadata__options {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5em;
          }

          body.dark-mode .dialog-content.metadata .choose-metadata__options .checkbox.js-checkbox {
            background-color: #3a3a3a !important;
            border: 1px solid #555 !important;
            border-radius: 6px !important;
            padding: 0.4em 0.8em !important;
            cursor: pointer;
            transition: background-color 0.2s ease, border-color 0.2s ease;
          }

          body.dark-mode .dialog-content.metadata .choose-metadata__options .checkbox.js-checkbox:hover {
            background-color: #4a4a4a !important;
          }

          body.dark-mode .dialog-content.metadata .choose-metadata__options .checkbox.js-checkbox.checked {
            background-color: #6ea8ff !important;
            border-color: #6ea8ff !important;
          }

          body.dark-mode .dialog-content.metadata .choose-metadata__options .checkbox.js-checkbox.checked span {
            color: #1e1e1e !important;
          }

          body.dark-mode .dialog-content.metadata .choose-metadata__options .checkbox.js-checkbox span {
            color: #fff !important;
            font-weight: 500;
          }

          /* === Resize Bar === */
          .resize-handle {
          width: 5px;
          cursor: col-resize;
          background-color: rgba(0,0,0,0.1);
          transition: background-color 0.2s ease;
          flex-shrink: 0;
          z-index: 10;
          }

          body.dark-mode .resize-handle {
          background-color: rgba(255,255,255,0.15);
          }

          .resize-handle:hover {
          background-color: rgba(0,0,0,0.25);
          }

          body.dark-mode .resize-handle:hover {
          background-color: rgba(255,255,255,0.3);
          }


          /* === Misc / Modern Messages === */
          body.dark-mode .modern-message {
            background-color: #2a2a2a !important;
            border: 1px solid #333 !important;
            border-radius: 4px !important;
            transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }

          body.dark-mode .modern-message:hover,
          body.dark-mode .modern-message:focus {
            background-color: #3a3a3a !important;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4) !important;
            cursor: pointer;
          }
        `;
		GM_addStyle(darkCSS);
	}

	function toggleDarkMode(force = null) {
		const enabled = force !== null ? force : !document.body.classList.contains("dark-mode");
		document.body.classList.toggle("dark-mode", enabled);
		localStorage.setItem("darkModeEnabled", enabled ? "true" : "false");
	}

	function setupDarkModeButton() {
		const nav = document.querySelector("nav.topnav");
		if (!nav || document.querySelector("#darkModeToggle")) return;

		const btnWrapper = document.createElement("div");
		btnWrapper.className = "topnav__btn-wrapper";

		const btn = document.createElement("button");
		btn.id = "darkModeToggle";
		btn.className = "topnav__btn";
		btn.textContent = "🌙";
		btn.style.cursor = "pointer";
		btn.addEventListener("click", () => {
			toggleDarkMode();
			btn.textContent = document.body.classList.contains("dark-mode") ? "☀" : "🌙";
		});

		btnWrapper.appendChild(btn);
		nav.insertBefore(btnWrapper, nav.querySelector(".topnav__btn--icon--exit"));

		// Restore last mode
		if (localStorage.getItem("darkModeEnabled") === "true") {
			toggleDarkMode(true);
			btn.textContent = "☀";
		}
	}

	function initDarkModeObserver() {
		const observer = new MutationObserver(() => {
			if (document.body.classList.contains("dark-mode")) {
				document.body.classList.add("dark-mode"); // ensure dynamic nodes match
			}
		});
		observer.observe(document.body, { childList: true, subtree: true });
	}

	// =====================
	// FLEX RESIZER HANDLES
	// =====================
	function initResizableContainers() {
		const left = document.querySelector("#leftcontainer");
		const center = document.querySelector("#centercontainer");
		const right = document.querySelector("#rightcontainer");
		const parent = left?.parentElement;

		if (!left || !center || !right || !parent) return;
		if (getComputedStyle(parent).display !== "flex") return;

		// Create handles
		const leftHandle = document.createElement("div");
		const rightHandle = document.createElement("div");
		leftHandle.className = "resize-handle resize-handle-left";
		rightHandle.className = "resize-handle resize-handle-right";

		// Insert handles
		left.insertAdjacentElement("afterend", leftHandle);
		center.insertAdjacentElement("afterend", rightHandle);

		// Restore saved sizes
		const savedLeft = localStorage.getItem("smartschool_left_width");
		const savedRight = localStorage.getItem("smartschool_right_width");
		if (savedLeft) left.style.maxWidth = savedLeft;
		if (savedRight) right.style.maxWidth = savedRight;

		// Drag setup
		function setupDrag(handle, target, side) {
			let isDragging = false;
			let startX, startWidth;

			handle.addEventListener("mousedown", (e) => {
				isDragging = true;
				startX = e.clientX;
				startWidth = target.offsetWidth;
				document.body.style.cursor = "col-resize";
				e.preventDefault();
			});

			window.addEventListener("mousemove", (e) => {
				if (!isDragging) return;
				console.log("User is dragging...");

				const dx = e.clientX - startX;

				let newWidth;
				if (side === "left") {
					newWidth = Math.max(150, startWidth + dx);
				} else if (side === "right") {
					newWidth = Math.max(150, startWidth - dx);
				}

				newWidth = `${newWidth}px`;
				target.style.maxWidth = newWidth;
				localStorage.setItem(side === "left" ? "smartschool_left_width" : "smartschool_right_width", newWidth);
			});

			window.addEventListener("mouseup", () => {
				if (isDragging) {
					isDragging = false;
					document.body.style.cursor = "default";
				}
			});
		}

		setupDrag(leftHandle, left, "left");
		setupDrag(rightHandle, right, "right");
	}

	// --- Constants ---
	const SMARTSCHOOL_URL = "https://olva.smartschool.be/";
	const TARGET_BARCODE_URL = "https://mijn.olva.be/index.php?page=97";
	const TARGET_POINTS_URL = "https://mijn.olva.be/index.php?page=200&kd=5867";
	const TARGET_SCHEDULE_URL = "https://olva.sisofoscloud.be/dagplan/dagplanLLNzoeken.php";
	const REFRESH_INTERVAL = 9_000_000; // 2.5 hours
	const POINTS_BLOCK_ID = "homepage__block--punten";
	const SCHEDULE_BLOCK_ID = "homepage__block--schedule";
	const CONTAINERS = {
		"#rightcontainer": { STORAGEKEY: "blockOrderRight", HIDDENKEY: "hiddenBlockIdsRight" },
		"#leftcontainer": { STORAGEKEY: "blockOrderLeft", HIDDENKEY: "hiddenBlockIdsLeft" },
	};

	// --- Global state ---
	let typedInput = "";
	let lastTypedTime = 0;
	let selectedIndex = -1;
	let TARGET_CLASS = localStorage.className || "";

	// Cache hidden sets
	const hiddenSets = {};
	for (const [selector, { HIDDENKEY }] of Object.entries(CONTAINERS)) {
		try {
			hiddenSets[selector] = new Set(JSON.parse(localStorage.getItem(HIDDENKEY) || "[]"));
		} catch {
			hiddenSets[selector] = new Set();
		}
	}

	// --- Utility shortcuts ---
	const q = (sel, ctx = document) => ctx.querySelector(sel);
	const qa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

	function simulateClick(el, times = 1) {
		if (!el) return;
		const opts = { bubbles: true, cancelable: true };
		for (let i = 0; i < times; i++) {
			el.dispatchEvent(new MouseEvent("mousedown", opts));
			el.dispatchEvent(new MouseEvent("mouseup", opts));
			el.dispatchEvent(new MouseEvent("click", opts));
		}
	}

	function resetTypedInput() {
		const now = Date.now();
		if (now - lastTypedTime > 1000) typedInput = "";
		lastTypedTime = now;
	}

	function getMenuItems() {
		if (window.__gEventActive === true) return qa(".topnav__menu--shortcuts a");
		if (window.__lEventActive === true) return qa(".topnav__menu--links a");
	}

	function highlightItem(index) {
		const items = getMenuItems();
		for (let i = 0; i < items.length; i++) {
			const it = items[i];
			if (i === index) {
				it.style.backgroundColor = "#444";
				it.style.border = "solid 1px";
				it.style.backgroundPositionX = "8px";
			} else {
				it.style.backgroundColor = "";
				it.style.border = "";
			}
		}
	}

	function findMatchingItem(query) {
		query = query.toLowerCase();
		const items = getMenuItems();
		for (let i = 0; i < items.length; i++) {
			if (items[i].textContent.trim().toLowerCase().startsWith(query)) return i;
		}
		return -1;
	}

	// --- DOM Modifiers ---
	function expandTreeElement() {
		if (!TARGET_CLASS) return;
		for (const mapEl of qa('li[rel="map"]')) {
			const anchor = q("a", mapEl);
			if (!anchor) continue;
			const txt = anchor.textContent.trim().toLowerCase();
			if (TARGET_CLASS.toLowerCase().includes(txt)) {
				simulateClick(mapEl, 2);
				break;
			}
		}
	}

	function closeBlockingEl() {
		q(".ui-dialog-buttonset button")?.click();
		q(".blue.ui-button")?.click();
	}

	function removeUnnecessaryHeaderEls() {
		q("button[title='Zoeken']")?.parentElement?.remove();
		q("a.js-btn-manual")?.remove();
	}

	// --- Block Reordering & Hiding ---
	function enableBlockReordering(containerSelector) {
		const { STORAGEKEY, HIDDENKEY } = CONTAINERS[containerSelector];
		const container = q(containerSelector);
		if (!container) return;

		// apply stored order
		const order = JSON.parse(localStorage.getItem(STORAGEKEY) || "[]");
		for (const id of order) {
			const b = q(`#${id}`, container);
			if (b) container.appendChild(b);
		}

		for (const block of qa(".homepage__block", container)) {
			if (!block.id) block.id = "homepage__block--" + Math.random().toString(36).slice(2);
			if (block.querySelector(".reorder-btn")) continue;

			if (hiddenSets[containerSelector].has(block.id)) block.style.display = "none";

			let top = q(".homepage__block__top", block);
			if (!top) {
				top = document.createElement("div");
				top.className = "homepage__block__top";
				top.innerHTML = `<div class="homepage__block__top__title"></div><div class="homepage__block__top__buttonbar"></div>`;
				block.insertBefore(top, block.firstElementChild);
			}
			const bar = q(".homepage__block__top__buttonbar", top);

			// up/down buttons
			for (const [dir, label] of [
				["up", "↑"],
				["down", "↓"],
			]) {
				const btn = document.createElement("button");
				btn.className = "reorder-btn";
				btn.textContent = label;
				btn.title = dir === "up" ? "Verplaats omhoog" : "Verplaats omlaag";
				btn.style.cssText = "margin-left:6px;cursor:pointer;font-size:0.9em;display:none";
				btn.onclick = (e) => {
					e.stopPropagation();
					const sib = dir === "up" ? block.previousElementSibling : block.nextElementSibling;
					if (sib?.classList.contains("homepage__block")) {
						if (dir === "up") container.insertBefore(block, sib);
						else container.insertBefore(sib, block);
						const ids = qa(".homepage__block", container).map((b) => b.id);
						localStorage.setItem(STORAGEKEY, JSON.stringify(ids));
					}
				};
				bar.appendChild(btn);
			}

			// hide button
			const x = document.createElement("button");
			x.className = "hide-btn";
			x.textContent = "×";
			x.title = "Verberg deze blok";
			x.style.cssText = "margin-left:6px;cursor:pointer;font-size:1.1em;display:none";
			x.onclick = (e) => {
				e.stopPropagation();
				block.style.display = "none";
				hiddenSets[containerSelector].add(block.id);
				localStorage.setItem(HIDDENKEY, JSON.stringify([...hiddenSets[containerSelector]]));
			};
			bar.appendChild(x);
		}
	}

	function setupGlobalEdit() {
		const menu = q(".topnav__menu");
		if (!menu) return;

		const edit = document.createElement("div");
		edit.className = "topnav__menuitem topnav__menuitem--icon smsc-column-nav__button--wiki";
		edit.textContent = "Edit";
		menu.appendChild(edit);

		const panel = document.createElement("div");
		panel.id = "hidden-blocks-panel";
		panel.style.cssText = "margin:10px;padding:10px;border:1px solid #ccc;display:none";
		document.body.appendChild(panel);

		let updater = null;

		function renderHiddenPanel() {
			const html = [];
			html.push("<strong>Hidden Blocks</strong><br>");
			for (const [selector, { HIDDENKEY }] of Object.entries(CONTAINERS)) {
				const sideName = selector === "#rightcontainer" ? "Right" : "Left";
				html.push(`<div style="margin-top:8px;font-weight:bold;">${sideName}:</div>`);
				const ids = JSON.parse(localStorage.getItem(HIDDENKEY) || "[]");
				if (!ids.length) {
					html.push(`<div style="margin-left:12px;"><em>none</em></div>`);
					continue;
				}
				for (const id of ids) {
					const blk = document.getElementById(id);
					const titleEl = blk?.querySelector(".homepage__block__top__title h2") || blk?.querySelector("h2.smsc-title--1");
					const title = titleEl ? titleEl.textContent.trim() : id;
					html.push(
						`<div style="margin:4px 0 4px 12px"><button style="margin-right:8px" data-id="${id}" data-sel="${selector}">Show</button>${title}</div>`
					);
				}
			}
			panel.innerHTML = html.join("");
			for (const btn of qa("button[data-id]", panel)) {
				btn.onclick = () => {
					const id = btn.dataset.id;
					const selector = btn.dataset.sel;
					const blk = document.getElementById(id);
					if (blk) blk.style.display = "";
					const ids = JSON.parse(localStorage.getItem(CONTAINERS[selector].HIDDENKEY) || "[]").filter((h) => h !== id);
					localStorage.setItem(CONTAINERS[selector].HIDDENKEY, JSON.stringify(ids));
					hiddenSets[selector].delete(id);
					renderHiddenPanel();
				};
			}
		}

		edit.onclick = () => {
			for (const selector of Object.keys(CONTAINERS)) {
				const cs = qa(".reorder-btn, .hide-btn", q(selector));
				const nowVisible = cs[0]?.style.display === "none";
				for (const b of cs) b.style.display = nowVisible ? "inline-block" : "none";
			}
			const opening = panel.style.display === "none";
			panel.style.display = opening ? "block" : "none";
			if (opening) {
				renderHiddenPanel();
				updater = setInterval(renderHiddenPanel, 300);
			} else {
				clearInterval(updater);
			}
		};
	}

	function fetchBarcode() {
		const cached = localStorage.getItem("barcodeDivsStyle");
		if (cached) {
			const barcodeDivsStyle = JSON.parse(cached);
			initializeBarcode(barcodeDivsStyle);
			return;
		}

		GM_xmlhttpRequest({
			method: "GET",
			url: TARGET_BARCODE_URL,
			headers: { Accept: "*/*", "Content-Type": "application/json" },
			onload: (res) => {
				if (res.status !== 200) return res.responseText;

				const doc = new DOMParser().parseFromString(res.responseText, "text/html");

				const barcodeDivsStyle = [];
				const children = doc.querySelector(".responsive div").children;
				for (const child of children) {
					const width = child.style.width;
					const left = child.style.left;
					barcodeDivsStyle.push([width, left]);
				}

				localStorage.setItem("barcodeDivsStyle", JSON.stringify(barcodeDivsStyle));

				initializeBarcode(barcodeDivsStyle);
			},
		});
	}

	function initializeBarcode(barcode_list) {
		const menu = q(".topnav__menu");
		if (!menu) return;

		// --- inject fullscreen styles ---
		const style = document.createElement("style");
		style.textContent = `
            .fullscreen-backdrop {
                position: fixed;
                inset: 0;
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
            }
            .fullscreen-backdrop.visible {
                opacity: 1;
                pointer-events: auto;
            }
            .fullscreen-barcode {
                border-radius: 8px;
                background: #fff;
                padding: 20px;
                transition: transform 0.5s ease;
                max-width: 80vw;
                max-height: 80vh;
                overflow: auto;
            }
            .fullscreen-backdrop.visible .fullscreen-barcode {
                transform: scale(1.1);
            }
        `;
		document.head.appendChild(style);

		// --- add barcode button ---
		const barcodeBtn = document.createElement("div");
		barcodeBtn.className = "topnav__menuitem topnav__menuitem--icon smsc-column-nav__button--wiki";
		barcodeBtn.textContent = "Barcode";
		menu.appendChild(barcodeBtn);

		// --- create fullscreen backdrop ---
		const backdrop = document.createElement("div");
		backdrop.className = "fullscreen-backdrop";

		const fullscreenContainer = document.createElement("div");
		fullscreenContainer.className = "fullscreen-barcode";

		backdrop.appendChild(fullscreenContainer);
		document.body.appendChild(backdrop);

		// --- render function for barcode ---
		function renderBarcode(barcode_list) {
			const html = [];
			html.push("<strong>Barcode</strong><br>");

			// wrapper for the bars
			const totalWidth = Math.max(...barcode_list.map(([w, l]) => parseInt(l) + parseInt(w)));
			html.push(`<div style="font-size:0; position:relative; width:${totalWidth}px; height:50px;">`);

			for (const bar of barcode_list) {
				html.push(
					`<div style="background-color:black; width:${bar[0]}; height:50px; position:absolute; left:${bar[1]}; top:0;">&nbsp;</div>`
				);
			}

			html.push(`</div>`); // close wrapper
			fullscreenContainer.innerHTML = html.join("");
		}

		// --- button opens fullscreen ---
		barcodeBtn.onclick = () => {
			renderBarcode(barcode_list);
			backdrop.classList.add("visible");
			document.body.style.overflow = "hidden"; // prevent background scroll
		};

		// --- click backdrop closes fullscreen ---
		backdrop.addEventListener("click", () => {
			backdrop.classList.remove("visible");
			document.body.style.overflow = ""; // restore scroll
		});
	}

	// --- Session Token Refresh ---
	function refreshSessTokens() {
		const linkEl = q("a[title='Mijn OLVA (incl. rapport) ']");
		const refreshPointsUrl = linkEl ? linkEl.href : TARGET_POINTS_URL;

		const now = Date.now();
		const lastRefresh = parseInt(localStorage.getItem("lastSessionRefresh") || "0", 10);
		if (lastRefresh && now - lastRefresh < REFRESH_INTERVAL) {
			return true;
		}

		GM_openInTab(refreshPointsUrl + "#scriptopened", { active: false });
		GM_openInTab(
			"https://olva.sisofoscloud.be/dagplan/dagplanLLN.php?functie=krant2&key=Raadplegen%20vervangingen%20voor%20leerlingen&campus=1#scriptopened",
			{ active: false }
		);
		localStorage.setItem("lastSessionRefresh", now.toString());

		return true;
	}

	// --- Upcoming Tests ---
	function fetchUpcomingTests() {
		const now = new Date();
		const in14days = new Date();
		in14days.setDate(now.getDate() + 14);
		const from = encodeURIComponent(now.toISOString());
		const to = encodeURIComponent(in14days.toISOString());

		const testsURL = `https://olva.smartschool.be/planner/api/v1/planned-elements/user/504_6417_0?from=${from}&to=${to}&types=planned-assignments,planned-to-dos`;

		GM_xmlhttpRequest({
			method: "GET",
			url: testsURL,
			headers: { Accept: "*/*", "Content-Type": "application/json" },
			onload: (res) => {
				try {
					const data = JSON.parse(res.responseText).sort(
						(a, b) => new Date(a.period.dateTimeFrom) - new Date(b.period.dateTimeFrom)
					);
					const grouped = {};
					for (const test of data) {
						// if (!test.isParticipant && test.isParticipant != null) continue;
						if (test.resolvedStatus === "resolved") continue;
						if (!TARGET_CLASS) {
							TARGET_CLASS = test.participants.groups[0].name;
							localStorage.setItem("className", TARGET_CLASS);
						}
						console.debug(test);
						const testDate = new Date(test.period.dateTimeTo);
						if (testDate < new Date()) continue;
						const iso = testDate.toISOString().split("T")[0];
						(grouped[iso] ||= []).push(test);
					}
					insertUpcomingTestsBlock(grouped);
				} catch (err) {
					console.error("Error parsing upcoming tests:", err);
				}
			},
		});
	}

	function insertUpcomingTestsBlock(grouped) {
		const container = q("#rightcontainer");
		if (!container) return;
		const block = document.createElement("div");
		block.className = "homepage__block";
		block.id = "homepage__block--toetsen";

		const html = [];
		html.push(`<div class="homepage__block__content">`);
		const days = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b));
		if (days.length) {
			days.forEach((day, idx) => {
				const dateObj = new Date(day);
				const dayName = dateObj.toLocaleDateString("nl-NL", { weekday: "long" });
				const formatted = `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} (${dateObj
					.getDate()
					.toString()
					.padStart(2, "0")}-${(dateObj.getMonth() + 1).toString().padStart(2, "0")})`;
				html.push(`<h3 style="margin-top:10px; margin-bottom:5px;">${formatted}</h3>`);
				const arr = grouped[day];
				for (let i = 0; i < arr.length; i++) {
					const t = arr[i];
					const courses = t.courses ? t.courses[0] : null;
					const scheduleCodes = courses ? courses.scheduleCodes[0] : "";
					const abbrev = t.assignmentType ? t.assignmentType.abbreviation : "";
					const time = new Date(t.period.dateTimeFrom).toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
					const border = i < arr.length - 1 ? "border-bottom:1px dotted #aaa;margin-bottom:5px;padding-bottom:5px;" : "";

					html.push(`<p style="margin:0;padding:2px 0;${border}">[${scheduleCodes}] [${abbrev}] ${t.name} om ${time}</p>`);
				}
				if (idx < days.length - 1) html.push(`<hr style="border-top:1px solid #000;margin:10px 0;">`);
			});
		} else {
			html.push(`<p>Geen toetsen in de komende dagen</p>`);
		}
		html.push(`</div>`);

		block.innerHTML = `
      <div class="homepage__block__top">
        <div class="homepage__block__top__title"><h2 class="smsc-title--1" style="color:#000">Toetsen voor ${TARGET_CLASS}</h2></div>
        <div class="homepage__block__top__buttonbar"></div>
      </div>
      ${html.join("")}
    `;

		const firstBlock = q(".homepage__block", container);
		firstBlock ? container.insertBefore(block, firstBlock) : container.appendChild(block);
	}

	// --- Schedule ---
	function fetchSchedule() {
		GM_xmlhttpRequest({
			method: "GET",
			url: TARGET_SCHEDULE_URL,
			onload: (res) => {
				if (res.status !== 200) return res.responseText;
				const schedule = parseSchedule(res.responseText);
				insertScheduleIntoPage(schedule);
			},
		});
	}

	function parseSchedule(html) {
		const doc = new DOMParser().parseFromString(html, "text/html");
		const schedule = [];
		let day = "";
		for (const row of qa("tr", doc)) {
			if (row.classList.contains("datum")) {
				day = q("th", row)?.innerText.trim() || "Onbekende dag";
				continue;
			}
			const cols = row.querySelectorAll("td");
			if (!cols.length) continue;
			const classGroup = cols[1]?.innerText.trim().split(",")[0] || "";
			if (TARGET_CLASS && !classGroup.toLowerCase().includes(TARGET_CLASS.toLowerCase())) continue;
			schedule.push({
				day,
				hour: cols[0]?.innerText.trim() || "N/A",
				classGroup,
				location: cols[2]?.innerText.trim() || "N/A",
				code: cols[3]?.innerText.trim() || "N/A",
			});
		}
		return schedule;
	}

	function insertScheduleIntoPage(schedule) {
		const container = q("#leftcontainer");
		if (!container) return;
		let block = q(`#${SCHEDULE_BLOCK_ID}`, container);
		if (!block) {
			block = document.createElement("div");
			block.className = "homepage__block";
			block.id = SCHEDULE_BLOCK_ID;
			container.insertBefore(block, container.firstChild);
		}
		const html = [];
		const codesMeaning = {
			1: "Opdracht",
			2: "Test",
			3: "(Online) Les",
			"*": "Thuis blijven",
		};
		let current = "";
		const lastItem = schedule.pop();
		for (const item of schedule) {
			if (item.day !== current) {
				if (current) html.push(`<hr style="border-top:1px solid #000;margin:10px 0;">`);
				html.push(`<h3 style="margin-top:10px;margin-bottom:5px;">${item.day}</h3>`);
				current = item.day;
			}
			html.push(`
            <p style="margin:0;padding:2px 0;">🕑Uur: ${item.hour}</p>
            <p style="margin:0;padding:2px 0;">📍Waar: ${item.location}</p>
            <p style="margin:0;padding:2px 0;">🔢Code: ${codesMeaning[item.code]} (${item.code})</p>
            `);

			if (item != lastItem) html.push(`<hr style="margin-top:5px;margin-bottom:5px;">`);
		}
		if (!html.length) html.push(`<p>Geen vervangingen gevonden</p>`);
		block.innerHTML = `
      <div class="homepage__block__top">
        <div class="homepage__block__top__title"><h2 class="smsc-title--1" style="color:#000">Vervanginen voor ${TARGET_CLASS}</h2></div>
        <div class="homepage__block__top__buttonbar"></div>
      </div>
      <div class="homepage__block__content">${html.join("")}</div>
    `;
	}

	// --- Points ---
	function fetchPoints() {
		GM_xmlhttpRequest({
			method: "GET",
			url: TARGET_POINTS_URL,
			onload: (res) => {
				console.debug("First points page:", res.responseText);
				// Check for redirect script in response
				const redirectMatch = res.responseText.match(/window\.location\.replace\(["']([^"']+)["']\)/);

				if (redirectMatch) {
					const redirectUrl = redirectMatch[1];
					console.debug("[POINTS] Following redirect to:", redirectUrl);

					GM_xmlhttpRequest({
						method: "GET",
						url: redirectUrl,
						onload: (res2) => {
							if (res2.status !== 200) {
								console.warn("[POINTS] Redirect failed:", res2.status);
								return;
							}
							console.debug("Second points page:", res2.responseText);
							parseAndInsertPoints(res2.responseText);
						},
					});
					return;
				}

				if (res.status !== 200) {
					console.warn("[POINTS] Request failed:", res.status);
					return;
				}

				parseAndInsertPoints(res.responseText);
			},
		});
	}

	function parseScore(scoreText) {
		const match = scoreText.match(/^([\d,.]+)\/([\d,.]+)$/);
		if (!match) return null;
		let obtained = parseFloat(match[1].replace(",", "."));
		let total = parseFloat(match[2].replace(",", "."));
		return isNaN(obtained) || isNaN(total) ? null : { obtained, total };
	}

	function parseAndInsertPoints(html) {
		const doc = new DOMParser().parseFromString(html, "text/html");
		const subjects = doc.querySelectorAll("h4.margintop");
		const result = [];
		const newTests = [];

		// Load seen tests from localStorage
		let seenTests = JSON.parse(localStorage.getItem("seenTests") || "[]");

		for (const subjectEl of subjects) {
			const subjectName = subjectEl.childNodes[0].textContent.trim();
			const ul = subjectEl.nextElementSibling;
			if (!ul || !ul.classList.contains("rapportlijst")) continue;

			const tests = [];
			let obtainedTotal = 0;
			let possibleTotal = 0;

			const rows = ul.querySelectorAll(".lijstrapportitem");
			for (const row of rows) {
				const scoreText = row.querySelector(".lijstrapportscore")?.textContent.trim() || "";
				const parsed = parseScore(scoreText);
				if (parsed) {
					obtainedTotal += parsed.obtained;
					possibleTotal += parsed.total;
				}

				const title = row.querySelector(".lijstrapportscorenaam")?.textContent.trim() || "";
				const comment = row.querySelector(".lijstrapportnotafull")?.textContent.trim() || "";
				const date = row.querySelector(".lijstrapportdatum")?.textContent.trim() || "";

				const testObj = { subject: subjectName, title, score: scoreText, comment, date };

				if (!seenTests.includes(title)) {
					newTests.push(testObj);
					seenTests.push(title);
				}

				tests.push(testObj);
			}

			let summary = "";
			if (possibleTotal > 0) {
				const percentage = (obtainedTotal / possibleTotal) * 100;
				summary = ` - ${obtainedTotal.toFixed(2)}/${possibleTotal} (${percentage.toFixed(2)}%)`;
			}

			result.push({ subject: subjectName, summary, tests });
		}

		// Save updated seenTests
		localStorage.setItem("seenTests", JSON.stringify(seenTests));

		insertPointsIntoPage(result, newTests);
	}

	function insertPointsIntoPage(subjects, newTests) {
		const container = q("#rightcontainer");
		if (!container) return;

		let block = q(`#${POINTS_BLOCK_ID}`, container);
		if (!block) {
			block = document.createElement("div");
			block.className = "homepage__block";
			block.id = POINTS_BLOCK_ID;
			container.appendChild(block);
		}

		const html = [];

		// -------- Nieuw voor jou section inside the block --------
		if (newTests.length) {
			const newHtml = newTests
				.map(
					(t) => `
            <div style="padding:6px 0; border-bottom:1px solid #ddd;">
                <div><strong>${t.subject}: ${t.title || "(geen titel)"}</strong></div>
                <div><b>Score:</b> ${t.score}</div>
                ${t.comment ? `<div><b>Toelichting:</b> ${t.comment}</div>` : ""}
                <div><b>Datum:</b> ${t.date}</div>
            </div>
        `
				)
				.join("");

			html.push(`
            <details open style="margin-bottom:12px;">
                <summary><b>Nieuw voor jou</b></summary>
                <div style="margin-top:6px;">${newHtml}</div>
            </details>
        `);
		}

		// -------- Normal subjects --------
		if (subjects.length) {
			for (const subj of subjects) {
				const testsHtml = subj.tests
					.slice()
					.reverse()
					.map(
						(t) => `
                <div style="padding:6px 0; border-bottom:1px solid #ddd;">
                    <div><strong>${t.title || "(geen titel)"}</strong></div>
                    <div><b>Score:</b> ${t.score}</div>
                    ${t.comment ? `<div><b>Toelichting:</b> ${t.comment}</div>` : ""}
                    <div><b>Datum:</b> ${t.date}</div>
                </div>
            `
					)
					.join("");

				html.push(`
                <details style="margin-bottom:10px;">
                    <summary><b>${subj.subject}</b> ${subj.summary}</summary>
                    <div style="margin-top:6px;">${testsHtml}</div>
                </details>
            `);
			}
		} else {
			html.push(`<p>Geen punten beschikbaar</p>`);
		}

		block.innerHTML = `
      <div class="homepage__block__top">
        <div class="homepage__block__top__title">
          <h2 class="smsc-title--1" style="color:#000">Punten</h2>
        </div>
        <div class="homepage__block__top__buttonbar"></div>
      </div>
      <div class="homepage__block__content">${html.join("")}</div>
    `;
	}

	// --- Keyboard shortcuts ---
	function handleKeydown(event) {
		let btn = null;
		const tag = document.activeElement.tagName;
		const isInput = tag === "INPUT" || tag === "TEXTAREA";
		const navBtn = q(".js-btn-shortcuts");
		const linksBtn = q(".js-btn-links");

		// Reset active events if their menus are collapsed
		if (navBtn && navBtn.getAttribute("aria-expanded") === "false") window.__gEventActive = false;
		if (linksBtn && linksBtn.getAttribute("aria-expanded") === "false") window.__lEventActive = false;

		if (!isInput && !window.__gEventActive && !window.__lEventActive) {
			switch (event.key.toLowerCase()) {
				case "s":
					event.preventDefault();
					simulateClick(q(".js-btn-home"));
					return;
				case "b":
					event.preventDefault();
					simulateClick(q(".js-btn-messages"));
					return;
				case "v":
					event.preventDefault();
					simulateClick(q(".js-btn-courses"));
					window.__vShortcutActive = true;
					return;
				case "g":
					event.preventDefault();
					btn = navBtn;
					if (btn?.getAttribute("aria-expanded") === "false") simulateClick(btn);
					typedInput = "planner";
					window.__gEventActive = true;
					selectedIndex = findMatchingItem(typedInput);
					if (selectedIndex !== -1) highlightItem(selectedIndex);
					return;
				case "l":
					event.preventDefault();
					btn = linksBtn;
					if (btn?.getAttribute("aria-expanded") === "false") simulateClick(btn);
					window.__lEventActive = true;
					setTimeout(() => {
						typedInput = "scoodle";
						selectedIndex = findMatchingItem(typedInput);
						if (selectedIndex !== -1) highlightItem(selectedIndex);
					}, 100); // delay to let DOM update
					return;
			}
		}

		if (event.key === "Enter") {
			event.preventDefault();

			if (window.__vShortcutActive) {
				try {
					const firstLi = document.querySelector(".course-list.js-courses-list li a");
					if (firstLi?.href) {
						sessionStorage.setItem("openDocuments", "true");
						window.location.href = firstLi.href;
					} else {
						console.warn("[Shortcut] No course link found.");
					}
				} catch (err) {
					console.error("[Shortcut] Failed to navigate:", err);
				}
				return;
			}

			if (selectedIndex !== -1) {
				const items = getMenuItems();
				if (items[selectedIndex]) window.location.href = items[selectedIndex].href;
			}
		}

		if (event.key === "Escape") {
			if (window.__gEventActive && navBtn) {
				simulateClick(navBtn); // close g menu
				window.__gEventActive = false;
			}
			if (window.__lEventActive && linksBtn) {
				simulateClick(linksBtn); // close l menu
				window.__lEventActive = false;
			}
			typedInput = "";
			selectedIndex = -1;
			return;
		}

		const anyMenuExpanded =
			(navBtn && navBtn.getAttribute("aria-expanded") === "true") || (linksBtn && linksBtn.getAttribute("aria-expanded") === "true");
		if (!anyMenuExpanded) return;

		resetTypedInput();

		// Handle typing for menu filtering and highlighting
		if (event.key.length === 1 && /[a-z0-9]/i.test(event.key)) {
			event.preventDefault();
			typedInput += event.key;
			const idx = findMatchingItem(typedInput);
			if (idx !== -1) {
				selectedIndex = idx;
				highlightItem(idx);
			}
			return;
		}
	}

	async function safeFetch(name, fetchFn, validateFn) {
		try {
			const data = await fetchFn();

			if (!validateFn(data)) {
				console.warn(`[${name}] invalid response, retrying init()...`);
				setTimeout(init, 2000);
				return null;
			}

			return data;
		} catch (err) {
			console.error(`[${name}] fetch failed, retrying init()...`, err);
			setTimeout(init, 2000);
			return null;
		}
	}

	async function runMain() {
		await safeFetch("Points", fetchPoints, (data) => !/splashscreen oauth/i.test(data));
		await safeFetch("Schedule", fetchSchedule, (data) => !/niet aangemeld/i.test(data));
		await safeFetch("Tests", fetchUpcomingTests, (data) => !/login-app/i.test(data));

		// Just run barcode setup, no need to retry init if it fails
		fetchBarcode();

		setTimeout(() => {
			enableBlockReordering("#leftcontainer");
			enableBlockReordering("#rightcontainer");
			setupGlobalEdit();
		}, 2000);
	}

	// --- Init ---
	function init() {
		if (window.location.hash === "#scriptopened") {
			window.addEventListener("load", () => {
				window.close();
			});
			return;
		}
		if (window.location.href.startsWith("https://oauth.smartschool.be/OAuth/index/platformchooser")) {
			q("#platformchooser_form__platform").value = "olva.smartschool.be";
			q("#platformchooserSubmitButton").disabled = "";
			q("#platformchooserSubmitButton").click();
		}

		if (!window.location.href.startsWith(SMARTSCHOOL_URL)) return;

		applyDarkModeStyles();
		setupDarkModeButton();
		initDarkModeObserver();

		initResizableContainers();

		document.addEventListener("keydown", handleKeydown);
		expandTreeElement();
		closeBlockingEl();
		removeUnnecessaryHeaderEls();

		username = q(".hlp-vert-box span")?.textContent.trim() || "";

		if (sessionStorage.getItem("openDocuments") === "true") {
			sessionStorage.removeItem("openDocuments");
			simulateClick(q(".smsc-column-nav__button--documents"));
		}

		refreshSessTokens();
		runMain();
	}
	init();
})();

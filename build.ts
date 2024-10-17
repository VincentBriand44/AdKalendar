import { build } from "esbuild";
// @ts-ignore bug resolveJsonModule
import { version } from "./package.json";

const banner = `
// ==UserScript==
// @name         AdKalendar
// @namespace    http://tampermonkey.net/
// @version      v${version}
// @description  Add new filters for ADKami calendar
// @author       Kanon
// @source       https://github.com/VincentBriand44/AdKalendar
// @downloadURL  https://raw.githubusercontent.com/VincentBriand44/AdKalendar/refs/heads/main/dist/AdKalendar.user.js
// @match        http*:/*adkami.com/agenda*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=adkami.com
// @grant        none
// ==/UserScript==
`;

build({
	entryPoints: ["src/index.ts"],
	bundle: true,
	minifySyntax: true,
	minifyWhitespace: true,
	sourcemap: false,
	target: "esNext",
	outfile: "dist/AdKalendar.user.js",
	banner: {
		js: banner,
	},
}).catch(() => process.exit(1));

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
// @match        https://www.adkami.com/agenda*
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
	outfile: `dist/AdKalendar-v${version}.user.js`,
	banner: {
		js: banner,
	},
}).catch(() => process.exit(1));

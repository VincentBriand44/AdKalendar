(() => {
	const buttonsPos: HTMLDivElement | null =
		document.querySelector("#pannel-list");

	if (!buttonsPos) return;

	const buttons = [
		{
			title: "Cacher 'VF'",
			id: "novf",
		},
		{
			title: "Cacher 'en pause'",
			id: "nopaused",
		},
		{
			title: "Cacher 'vu'",
			id: "nowatched",
		},
		{
			title: "Cacher 'oav/spécial'",
			id: "nospecial",
		},
	];

	for (const button of buttons) {
		const str = localStorage.getItem(button.id);

		if (!str) {
			localStorage.setItem(button.id, "false");
		}

		buttonsPos.style.flexWrap = "wrap";

		const hideButton = document.createElement("label");
		const input = document.createElement("input");
		const p = document.createElement("p");

		hideButton.id = button.id;
		hideButton.classList.add("btn", "right", "agenda-filter-watch");
		hideButton.style.display = "flex";
		hideButton.style.gap = "8px";
		hideButton.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
		hideButton.style.border = "1px solid rgba(0, 0, 0, 0.8)";
		hideButton.style.margin = "0px";

		hideButton.append(input);
		input.type = "checkbox";
		input.checked = str === "true";

		hideButton.append(p);
		p.textContent = button.title;
		buttonsPos.append(hideButton);

		hideButton.addEventListener("click", () => {
			clickHandler();
			localStorage.setItem(button.id, input.checked.toString());
		});
	}
})();

const clickHandler = () => {
	const episodes: NodeListOf<HTMLDivElement> =
		document.querySelectorAll(".episode");

	const noVf: HTMLInputElement | null = document.querySelector("#novf input");
	const noSpecial: HTMLInputElement | null =
		document.querySelector("#nospecial input");

	const noPaused: HTMLInputElement | null =
		document.querySelector("#nopaused input");
	const noWatched: HTMLInputElement | null =
		document.querySelector("#nowatched input");

	if (!noVf || !noPaused || !noWatched || !noSpecial) return;

	// biome-ignore lint/complexity/noForEach: <explanation>
	episodes.forEach((episode) => {
		const episodeTitle = episode.querySelector(".epis");
		let hide = false;

		if (episodeTitle?.textContent?.endsWith("vf") && !episode.hidden) {
			episode.style.display = noVf.checked ? "none" : "block";
			hide = noVf.checked;
		}
		if (!episodeTitle?.textContent?.startsWith("Episode") && !episode.hidden) {
			episode.style.display = noSpecial.checked ? "none" : "block";
			hide = noSpecial.checked;
		}

		if (episode.classList.contains("pause") && !episode.hidden && !hide) {
			episode.style.display = noPaused.checked ? "none" : "block";
			hide = noPaused.checked;
		}
		if (
			episode.classList.contains("vu") &&
			episodeTitle?.textContent?.startsWith("Episode") &&
			!episode.hidden &&
			!hide
		) {
			episode.style.display = noWatched.checked ? "none" : "block";
		}
	});
};

const mutationCallback: MutationCallback = (mutationsList) => {
	for (const mutation of mutationsList) {
		if (mutation.type === "attributes" && mutation.attributeName === "hidden") {
			clickHandler();
		}
	}
};

const observer = new MutationObserver(mutationCallback);
const config = { subtree: true, attributes: true };
const agenda: HTMLDivElement | null = document.querySelector(".agenda-list");

if (!agenda) throw new Error(".agenda-list not found");

observer.observe(agenda, config);

// Fix: Execute clickHandler on initial load
clickHandler();

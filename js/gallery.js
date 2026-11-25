const byId = (id) => document.getElementById(id);
const collection = exhibition;
const dialog = byId("viewer");
const number = (n) => String(n).padStart(2, "0");
let featured = 0;
let activeList = collection;
let activeIndex = 0;
let showingModel = false;

function showFeatured(index) {
  featured = (index + collection.length) % collection.length;
  const car = collection[featured];
  byId("art").src = car.image;
  byId("art").alt = car.name;
  byId("title").textContent = car.name;
  byId("count").textContent =
    number(featured + 1) + " / " + number(collection.length);
}

function displayMode(use3D) {
  showingModel = use3D;
  const car = activeList[activeIndex];
  const stage = byId("embed");
  stage.replaceChildren();
  byId("large").hidden = use3D;
  stage.hidden = !use3D;
  if (use3D) {
    const frame = document.createElement("iframe");
    frame.title = car.name + " — interaktīvs 3D modelis";
    frame.src =
      "https://sketchfab.com/models/" +
      car.uid +
      "/embed?autostart=1&preload=1&dnt=1";
    frame.allow = "autoplay; fullscreen; xr-spatial-tracking";
    frame.allowFullscreen = true;
    stage.append(frame);
  }
  byId("mode").textContent = use3D ? "Skatīt attēlu" : "Atvērt 3D";
  byId("hint").textContent = use3D
    ? "Velc, lai pagrieztu. Tuvini ar peles ritentiņu vai diviem pirkstiem. Ja skats neielādējas, atver modeli Sketchfab."
    : "3D skatam nepieciešams internets.";
}

function selectCar(list, index) {
  activeList = list;
  activeIndex = (index + list.length) % list.length;
  const car = list[activeIndex];
  byId("work-name").textContent = car.name;
  byId("description").textContent = car.description || "";
  byId("credit").textContent = "3D modeļa autors: " + car.author;
  byId("source").href = "https://sketchfab.com/models/" + car.uid;
  byId("large").src = car.image;
  byId("large").alt = car.name;
  for (const id of ["back", "forward"]) byId(id).disabled = list.length < 2;
  displayMode(navigator.onLine);
  if (!dialog.open) dialog.showModal();
}

function makeCard(car, index, list, curated) {
  const card = document.createElement("button");
  card.className = curated ? "card reveal" : "card";
  card.setAttribute("aria-haspopup", "dialog");
  const thumb = document.createElement("span");
  thumb.className = "thumb";
  const image = document.createElement("img");
  image.alt = "";
  image.loading = "lazy";
  if (car.image) image.src = car.image;
  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = "3D";
  thumb.append(image, badge);
  const label = document.createElement("span");
  label.className = "card-label";
  const order = document.createElement("span");
  order.className = "number";
  order.textContent = number(index + 1);
  const title = document.createElement("strong");
  title.textContent = car.name;
  label.append(order, title);
  card.append(thumb, label);
  card.onclick = () => selectCar(list, index);
  return card;
}

collection.forEach((car, i) =>
  byId("cards").append(makeCard(car, i, collection, true)),
);
byId("prev").onclick = () => showFeatured(featured - 1);
byId("next").onclick = () => showFeatured(featured + 1);
byId("back").onclick = () => selectCar(activeList, activeIndex - 1);
byId("forward").onclick = () => selectCar(activeList, activeIndex + 1);
byId("close").onclick = () => dialog.close();
dialog.addEventListener("close", () => byId("embed").replaceChildren());
byId("mode").onclick = () => displayMode(!showingModel);
document.querySelector(".open-art").onclick = () => selectCar(collection, featured);
byId("skats").addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
  event.preventDefault();
  showFeatured(featured + (event.key === "ArrowRight" ? 1 : -1));
});
let start;
const art = byId("art");
art.addEventListener(
  "touchstart",
  (event) => {
    start = event.touches.length === 1 ? event.touches[0] : null;
  },
  { passive: true },
);
art.addEventListener("touchcancel", () => {
  start = null;
});
art.addEventListener(
  "touchend",
  (event) => {
    if (!start) return;
    const dx = event.changedTouches[0].clientX - start.clientX;
    const dy = event.changedTouches[0].clientY - start.clientY;
    start = null;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
    if (event.cancelable) event.preventDefault();
    showFeatured(featured + (dx < 0 ? 1 : -1));
  },
  { passive: false },
);
showFeatured(featured);
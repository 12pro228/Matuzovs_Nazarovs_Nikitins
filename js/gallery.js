const byId = (id) => document.getElementById(id);
const collection = exhibition;

for (const car of collection) {
  const card = document.createElement("figure");
  card.className = "card";
  const thumb = document.createElement("span");
  thumb.className = "thumb";
  const image = document.createElement("img");
  image.src = car.image;
  image.alt = "";
  thumb.append(image);
  const caption = document.createElement("figcaption");
  caption.textContent = car.name;
  card.append(thumb, caption);
  byId("cards").append(card);
}

const number = (n) => String(n).padStart(2, "0");
let featured = 0;

function showFeatured(index) {
  featured = (index + collection.length) % collection.length;
  const car = collection[featured];
  byId("art").src = car.image;
  byId("art").alt = car.name;
  byId("title").textContent = car.name;
  byId("count").textContent =
    number(featured + 1) + " / " + number(collection.length);
}

byId("prev").onclick = () => showFeatured(featured - 1);
byId("next").onclick = () => showFeatured(featured + 1);
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


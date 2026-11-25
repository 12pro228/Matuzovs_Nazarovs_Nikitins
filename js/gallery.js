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

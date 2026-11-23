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

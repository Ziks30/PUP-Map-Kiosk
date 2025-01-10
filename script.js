function showSceneryBox(imageSrc, title, description) {
  let sceneryBox = document.getElementById("sceneryBox");
  if (!sceneryBox) {
    sceneryBox = document.createElement("div");
    sceneryBox.id = "sceneryBox";
    sceneryBox.style.position = "absolute";
    sceneryBox.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    sceneryBox.style.border = "3px solid #800000";
    sceneryBox.style.padding = "10px";
    sceneryBox.style.zIndex = "1000";
    sceneryBox.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
    sceneryBox.style.borderRadius = "5px";
    sceneryBox.style.width = "250px";
    document.body.appendChild(sceneryBox);
  }

  sceneryBox.innerHTML = `
      <img src="${imageSrc}" alt="${title}" style="width: 100%; border-radius: 5px;">
      <h3 style="margin: 10px 0; font-size: 16px; color: #800000">${title}</h3>
      <p style="margin: 0; font-size: 14px; line-height: 1.4;">${description}</p>
    `;

  document.body.addEventListener("mousemove", (e) => {
    const boxWidth = sceneryBox.offsetWidth;
    const boxHeight = sceneryBox.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = e.pageY + 10;
    let left = e.pageX + 10;

    if (left + boxWidth > viewportWidth) {
      left = e.pageX - boxWidth - 10;
    }
    if (top + boxHeight > viewportHeight) {
      top = e.pageY - boxHeight - 10;
    }

    sceneryBox.style.top = `${top}px`;
    sceneryBox.style.left = `${left}px`;
  });

  sceneryBox.style.display = "block";
}

function removeSceneryBox() {
  const sceneryBox = document.getElementById("sceneryBox");
  if (sceneryBox) {
    sceneryBox.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector("img[usemap]");
  const mapAreas = document.querySelectorAll("area");

  function scaleMapAreas() {
    const originalWidth = img.naturalWidth; // Get the original image width
    const displayedWidth = img.clientWidth; // Get the current displayed width
    const scaleFactor = displayedWidth / originalWidth;

    mapAreas.forEach((area) => {
      const originalCoords = area.dataset.coords.split(",").map(Number);
      const scaledCoords = originalCoords.map((coord) => Math.round(coord * scaleFactor));
      area.setAttribute("coords", scaledCoords.join(","));
    });
  }

  if (img.complete) {
    scaleMapAreas(); // Call immediately if the image is already loaded
  } else {
    img.addEventListener("load", scaleMapAreas);
  }

  window.addEventListener("resize", scaleMapAreas);
});

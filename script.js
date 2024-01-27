const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === "space") {
    setRandomColors();
  }
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type === "lock") {
    event.target.children[0].classList.toggle("fa-lock-open");
    event.target.children[0].classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClickboard(event.target.textContent);
  } else if (type === "change") {
    setRandomColors();
  }
});

function copyToClickboard(text) {
  return navigator.clipboard.writeText(text);
}

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];

  cols.forEach((col, index) => {
    const islocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");

    if (islocked) {
      colors.push(text.textContent);
      return;
    }

    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();

    if (!isInitial) {
      colors.push(color);
    }

    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });

  updateColorsHash(colors);
}

function setTextColor(text, color) {
  const luminence = chroma(color).luminance();
  text.style.color = luminence > 0.5 ? "black" : "white";
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => col.toString().substring(1))
    .join("-");
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}

setRandomColors(true);

// function generateRandomColor() {
//   const hexCodex = '1234567890ABCDEF'
//   let color = ''

//   for (let i = 0; i < 6; i++) {
//     color += hexCodex[Math.floor(Math.random() * hexCodex.length)]
//   }

//   return '#' + color
// }

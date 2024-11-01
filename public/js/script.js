window.onload = function () {
  let gallery = document.querySelector("#gallery");
    
  visual(gallery);
  //ab(gallery);

  triggerIfInactive();
};

function visual(gallery){
  resetDiv(gallery)
  wave(gallery);
  ab(gallery);
}

function resetDiv(gallery){
    document.querySelector('body').classList.remove("mapbg");//style.backgroundImage = 'none';
    removeDivs(gallery)
}
function removeDivs(container) {
   const divs = container.querySelectorAll('div');
    
    divs.forEach(div => {
      // Move all child nodes of the div to the parent of the div
      while (div.firstChild) {
        container.insertBefore(div.firstChild, div);
      }
      // Remove the empty div
      container.removeChild(div);
    });
}


function ab(gallery) {
  let i = 0,
    len = gallery.childElementCount;
  while (i < len) {
    let node = gallery.getElementsByTagName("figure")[i];
    node.style.position = "absolute";
    i++;
  }
}
var shaking = false;
var shift = getRandomInt(180);

function hover(x) {
  //console.log("hover!")
  let id = x.id;

  //console.log(id);
  loadCard(id);
}

function loadCard(id) {
  let container = document.querySelector("#datacard");
  //.innerHTML=db[id].html;
  let content = "<dl>";
  let item = db.find((item) => item.id === id);
  console.log(item);

  for (let key in item) {
    if (key != "_id") content += `<dt>${key}</dt><dd> ${item[key]}</dd>`;
  }
  container.innerHTML = content + "</dl>";
}

function shake() {
  console.log("shake!");
  shaking = true;
  shift = getRandomInt(180);
}

function wave(gallery) {
  let i = 0,
    len = gallery.childElementCount;
  //console.log(shift);
  while (i < len) {
    let node = gallery.getElementsByTagName("figure")[i];
    let rect = node.getBoundingClientRect();
    let amplitude = 160;
    let frequency = 20;
    let height = rect.y;
    let y = height / 2 + amplitude * Math.sin((i + shift) / frequency);
    node.style.left = rect.x + globalThis.scrollX + "px";
    node.style.top = y + "px";
    i++;
  }
}

function setup() {}
function draw() {
  if (shaking) {
    let i = 0,
      len = gallery.childElementCount;
    //console.log(shift);
    while (i < len) {
      let node = gallery.getElementsByTagName("figure")[i];
      let rect = node.getBoundingClientRect();
      let amplitude = 160;
      let frequency = 20;
      let height = rect.y;
      let y = height / 2 + amplitude * Math.sin((i + shift) / frequency);
      node.style.top = y + "px";
      i++;
    }
    shift++;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let time;
function triggerIfInactive() {
  resetTimer();
  let events = [
    "mousedown",
    "mousemove",
    "keydown",
    "scroll",
    "mousewheel",
    "touchstart",
  ]; // You can add/remove events as you need
  events.forEach((ev) => document.addEventListener(ev, resetTimer, true));
}

function resetTimer() {
  shaking = false;
  clearTimeout(time); //Resets previous timer
  time = setTimeout(shake, 2000); // Sets new timer after one minute
}

function historical() {
  let sortedb = _.sortBy(db, "period");
  const groupedElements = {};
  const parentElement = document.getElementById("gallery");
  resetDiv(parentElement)
// Group elements by period
  sortedb.forEach(entry => {
  const { period, id } = entry;
  const element = document.getElementById(id);
  if (element) {
    element.style.cssText = ''; // Clear inline styles

    if (!groupedElements[period]) {
      // Create new div for each unique period
      const periodDiv = document.createElement('div');
      periodDiv.className = `period-group period-${period}`;
      periodDiv.innerHTML = `<h2>${period}</h2>`;
      groupedElements[period] = periodDiv;
      parentElement.appendChild(periodDiv); // Append periodDiv to the parent
    }

    groupedElements[period].appendChild(element); // Append element to the period div
  }
});
}
function geographical() {
    let sortedb = _.sortBy(db, "country");
    const groupedElements = {};
    const parentElement = document.getElementById("gallery");
    resetDiv(parentElement)
    document.querySelector('body').classList.add("mapbg");
  // Group elements by period
    sortedb.forEach(entry => {
    const { country, id } = entry;
    const element = document.getElementById(id);
    if (element) {
      element.style.cssText = ''; // Clear inline styles
        
      if (!groupedElements[country]) {
        // Create new div for each unique period
        const countryDiv = document.createElement('div');
        countryDiv.className = `country-group country-${country}`;
        countryDiv.innerHTML = `<h2>${country}</h2>`;
        groupedElements[country] = countryDiv;
        parentElement.appendChild(countryDiv); // Append periodDiv to the parent
      }
  
      groupedElements[country].appendChild(element); // Append element to the period div
    }
  });
  }
  
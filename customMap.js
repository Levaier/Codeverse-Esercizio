//* Custom map inizialization and setting
const map = L.map("map", {
  crs: L.CRS.Simple,
  zoomControl: false,
  doubleClickZoom: false,
  dragging: false,
  minZoom: 0,
  maxZoom: 0,
});

//* Initial map coordinate
let imageBounds = [
  [-26.5, -25],
  [1021.5, 1023],
];

//* Custom map setting and append to HTML
const imageUrl = "./img/background.jpg";
L.imageOverlay(imageUrl, imageBounds).addTo(map);
map.fitBounds(imageBounds);
map.setView([249, 330], 1);

//* Button creation
const firstButton = document.createElement("button");
firstButton.innerHTML = `<button id="firstButton" class="btn" type="button">Scopri!</button>`;

//* Custom markers creation
const myIcon = L.icon({
  iconUrl: "./img/star.png",
  iconSize: [50, 50],
  iconAnchor: [25, 65],
  popupAnchor: [0, -65],
});

const unitDescription = document.createElement("div");
unitDescription.innerHTML = `<div class="unit-container">
    <h4>Unità 1</h4>
    <p>Pianeta <strong>HTMLON</strong></p>
  </div>`;

const secondUnitDescription =  document.createElement("div");
secondUnitDescription.innerHTML = `<div class="unit-container">
<h4>Unità 2</h4>
<p>Pianeta <strong>CSSVERSE</strong></p>
</div>`;

const progressBar = document.createElement("div");
progressBar.innerHTML = `<div class="progress-bar">
    <div class="progress"></div>
  </div>`;

function updateProgressBar(progress) {
  let progressBarElement = progressBar.querySelector(".progress");
  progressBarElement.style.width = progress + "%";
}
updateProgressBar(50);

//* Markers creation
let firstMarker = L.marker([320.2, 309.0], { icon: myIcon }).addTo(map);
firstMarker.bindTooltip(
  `${unitDescription.outerHTML} ${progressBar.outerHTML}`,
  {
    direction: "right",
    offset: [30, -40],
    permanent: true,
  }
);

firstMarker.on("click", function () {
  const modal = document.getElementById("myModal");
  modal.classList.remove("hidden");
  modal.classList.add("show");

  const closeBtn = document.getElementById("closeBtn");
  closeBtn.onclick = function () {
    modal.classList.remove("show");
    modal.classList.add("hidden");
  };

  var span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.classList.remove("show");
    modal.classList.add("hidden");
  };
});

const openVideoModal = () => {
  const modal = document.getElementById("modalVideo");
  modal.classList.remove("hidden");
  modal.classList.add("show");
};

const closeVideoModal = () => {
  const upBtnClose = document.getElementById("closeVideoX");
  const modal = document.getElementById("modalVideo");
  upBtnClose.onclick = function () {
    modal.classList.remove("show");
    modal.classList.add("hidden");
  };
};

const tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    videoId: "K4TOrB7at0Y",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
    playerVars: {
      autoplay: 0
    },
  });
}


function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    console.warn(YT.PlayerState.ENDED);
    AutomaticCloseVideoModal();
    const unit2 = document.getElementById("unit2");
    unit2.classList.remove("opacity");
    const unit1 = document.getElementById("unit1");
    unit1.classList.add("completed");
  }
}


const AutomaticCloseVideoModal = () => {
  const videoModal =  document.getElementById("modalVideo");
  videoModal.classList.remove("show");
  videoModal.classList.add("hidden");
}

function stopVideo() {
  player.stopVideo();
}


let customMarker = L.marker([135, 103], { icon: myIcon }).addTo(map);
customMarker.bindTooltip(
  `${secondUnitDescription.outerHTML}`,
  {
    direction: "right",
    offset: [30, -40],
    permanent: true,
  }
);
customMarker.getElement().classList.add("marker-disabled");
customMarker.setOpacity(0.4);
customMarker.setInteractive(false);
// Global Variables

let lastAddedGroup;
let sectionImages = {
  templates: [
    'assets/humanModel.png',
    'assets/robot2.png',
    'assets/chicken2.png',
    'assets/zubairOwl.png',
  ],
  accessories: [
    'assets/bowtie2.png',
    'assets/glasses2.png',
    'assets/cowboyhat.png',
    'assets/tie2.png',
  ],
  dresses: [
    'assets/blueDressPic2.png',
    'assets/red-dress2.png',
    'assets/yellow-dress2.png',
  ],
  tops: [
    'assets/shirt2.png',
    'assets/tshirt2.png',
  ],

  bottoms: [
    'assets/jeans2.png',
    'assets/slacks2.png',
  ]
};

// Add stage to page
const stage = new Konva.Stage({
  container: 'canvas',
  width: 800,
  height: 700
});

// Create layers and add to stage
const layers = [
  new Konva.Layer(), // Backgrounds
  new Konva.Layer(), // Clothes
  new Konva.Layer(), // Accessories
  new Konva.Layer(), // Text?
];

layers.forEach(function (layer) {
  stage.add(layer);
});

// Generate color palette
const backgroundColors = [
  '#ad2105',
  '#ff0000',
  '#ff5900',
  '#ff8c00',
  '#ffbb00',
  '#ffea00',
  '#a5f53c',
  '#34cc02',
  '#289101',
  '#066601',
  '#03ad99',
  '#04ffee',
  '#08c1ff',
  '#0891bf',
  '#045cff',
  '#1f02e0',
  '#c78fff',
  '#8902ff',
  '#622d9e',
  '#a11163',
  '#ff99ee',
  '#CD853F',
  '#A0522D',
  '#8B4513',
  '#D2B48C',
  '#fafffa',
  '#90918f',
  '#61615f',
  '#424241',
  '#030303',
];

const navBar = document.getElementById('navBar');

for (let i = 0; i < backgroundColors.length; i++) {
  const square = document.createElement('div');
  square.className = 'square';
  square.style.backgroundColor = backgroundColors[i];
  navBar.appendChild(square);
}

// Set up UI buttons
$('.square').on('click', changeBackgroundColor);
$('#resizeButton').on('click', addResizeAnchors);
$('#resetButton').on('click', resetStage);

// Create sections with clickable images
Object.keys(sectionImages).forEach(function (section) {
  let menuSection = document.querySelector(`#${section} .card`);

  // Add clickable images to section
  sectionImages[section].forEach(function (imageURL) {
    let imageElement = document.createElement('img');
    imageElement.src = imageURL;
    $(imageElement).addClass("imageSelector");

    // Attach image to section div
    menuSection.appendChild(imageElement);

    let targetLayer;
    if (section === "templates") {
      targetLayer = layers[0]; // Backgrounds
    }
    else if (section === "accessories") {
      targetLayer = layers[2]; // Accessories
    }
    else {
      targetLayer = layers[1]; // Clothes
    }

    $(imageElement).on('click', function (event) {
      addImageToCanvas(event.target.src, targetLayer);
    });
  });
});

// Helper functions

function changeBackgroundColor(event) {
  $('#canvas').css('background-color', event.target.style.backgroundColor);
}

function resetStage(event) {
  stage.clear();
  layers.forEach(function (layer) {
    layer.removeChildren();
    $('#canvas').css('background-color', '#fafffa', )
  });
  targetLayer.draw();
}

function addResizeAnchors(event) {
  addResizeAnchor(lastAddedGroup, lastAddedGroup.x(), lastAddedGroup.y(), "topLeft");
  addResizeAnchor(lastAddedGroup, lastAddedGroup.width() + lastAddedGroup.x(), lastAddedGroup.y(), "topRight");
  addResizeAnchor(lastAddedGroup, lastAddedGroup.width() + lastAddedGroup.x(), lastAddedGroup.height() + lastAddedGroup.y(), "bottomRight");
  addResizeAnchor(lastAddedGroup, lastAddedGroup.x(), lastAddedGroup.height() + lastAddedGroup.y(), "bottomLeft");
  lastAddedGroup.draw();
}

function addImageToCanvas(source, targetLayer) {
  let imageObj = new Image();

  imageObj.onload = function () {
    let image = new Konva.Image({
      x: 55,
      y: 5,
      image: imageObj,
    });

    let myGroup = new Konva.Group({
      x: image.x(),
      y: image.y(),
      width: image.width(),
      height: image.height(),
      draggable: true
    });
    lastAddedGroup = myGroup; // keep track of last image added

    myGroup.add(image);
    targetLayer.add(myGroup);
    targetLayer.draw();

    // Remove image group from canvas with a click event
    myGroup.on('click', function (event) {

      let myChildren = event.target.getParent().getChildren();
      console.log(myChildren);
      if (myChildren.length > 1) {
        for (let i = myChildren.length - 1; i >= 0; i--) {
          if (myChildren[i].className === 'Circle') {
            myChildren[i].remove();
          }
        }
      }
      else {
        event.target.remove();
      }
      targetLayer.draw();
    });
  };

  imageObj.src = source;
}

// TBD: only add resize anchors once - don't add if they're already there; alternately, disable the button when clicked

function addResizeAnchor(group, x, y, name) {
  const anchorLayer = group.getLayer();
  const anchor = new Konva.Circle({
    x: x,
    y: y,
    stroke: '#666',
    fill: '#ddd',
    strokeWidth: 2,
    radius: 8,
    name: name,
    draggable: true,
    dragOnTop: false
  });
  group.add(anchor);

  anchor.on('dragmove', function () {
    resizeImage(this);
    anchorLayer.draw();
  });
  anchor.on('mousedown touchstart', function () {
    group.setDraggable(false);
    this.moveToTop();
  });
  anchor.on('dragend', function () {
    group.setDraggable(true);
    anchorLayer.draw();
  });
  // add hover styling
  anchor.on('mouseover', function () {
    const anchorLayer = this.getLayer();
    document.body.style.cursor = 'pointer';
    this.setStrokeWidth(4);
    anchorLayer.draw();
  });
  anchor.on('mouseout', function () {
    const anchorLayer = this.getLayer();
    document.body.style.cursor = 'default';
    this.setStrokeWidth(2);
    anchorLayer.draw();
  });
  return anchor;
}

function resizeImage(activeAnchor) {
  const group = activeAnchor.getParent();
  const topLeft = group.get('.topLeft')[0];
  const topRight = group.get('.topRight')[0];
  const bottomRight = group.get('.bottomRight')[0];
  const bottomLeft = group.get('.bottomLeft')[0];
  const image = group.get('Image')[0];
  const anchorX = activeAnchor.getX();
  const anchorY = activeAnchor.getY();

  // update anchor positions
  switch (activeAnchor.getName()) {
  case 'topLeft':
    topRight.setY(anchorY);
    bottomLeft.setX(anchorX);
    break;
  case 'topRight':
    topLeft.setY(anchorY);
    bottomRight.setX(anchorX);
    break;
  case 'bottomRight':
    bottomLeft.setY(anchorY);
    topRight.setX(anchorX);
    break;
  case 'bottomLeft':
    bottomRight.setY(anchorY);
    topLeft.setX(anchorX);
    break;
  }
  image.position(topLeft.position());

  let width = topRight.getX() - topLeft.getX();
  let height = bottomLeft.getY() - topLeft.getY();
  if (width && height) {
    image.width(width);
    image.height(height);
  }
}

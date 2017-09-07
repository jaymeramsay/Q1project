// SETTING UP KONVA LIBRARY FOR CANVAS
//setting the Stage
let stage = new Konva.Stage({
  container: 'canvas',
  width: 1400,
  height: 500
});

let layers = [
  new Konva.Layer(),
  new Konva.Layer(),
  new Konva.Layer(),
  new Konva.Layer(),
];

// stage.width(300); set to a page resize event to be fancy-ass.
layers.forEach(function (layer) {
  stage.add(layer);
});

//Background Colors
const colors = [
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

// Global Variables
let lastAddedGroup;
let anchorExists = true;

// IMAGE OBJECT
let sectionImageObj = {
  templates: [
    'assets/humanModelPic.png',
    'assets/robot.png',
    'assets/chicken.png',
    'assets/zubairowl.png',
  ],
  accessories: [
    'assets/bowtie.png',
    'assets/glasses.png',
    'assets/hat.png',
    'assets/tie.png',
  ],
  dresses: [
    'assets/blueDressPic.png',
    'assets/red-dress.png',
    'assets/yellow-dress.png',
    'http://fillmurray.com/150/185',
  ],
  tops: [
    'assets/shirt.png',
    'assets/tshirt.png',
    'http://fillmurray.com/150/153',
    'http://fillmurray.com/150/206',
  ],
  bottoms: [
    'assets/jeans.png',
    'assets/slacks.png',
    'http://fillmurray.com/150/111',
    'http://fillmurray.com/150/109',
  ]
};

// put a click event on image buttons in sidebar
function imageClick(element, targetLayer) {
  $(element).on('click', function (ev) {
    let imgButton = ev.target;
    imageToCanvas(imgButton.src, targetLayer); //calling another function
  });
}

//accessing images sources in function
function imageToCanvas(source, targetLayer) {
  let imageObj = new Image();

  imageObj.onload = function () {
    let image = new Konva.Image({
      image: imageObj,
    });

    //create a konva group and add images to it as well as layers
    let myGroup = new Konva.Group({
      x: image.x(),
      y: image.y(),
      width: image.width(),
      height: image.height(),
      draggable: true
    });

    lastAddedGroup = myGroup;
    myGroup.add(image);
    console.log(targetLayer);
    console.log(typeof targetLayer);
    targetLayer.add(myGroup);
    targetLayer.draw();

    //remove group and image from canvas with a click event
    myGroup.on('click', function (ev) {
      // ev.target.remove();
      lastAddedGroup.remove();
      targetLayer.draw();
    });
  };
  imageObj.src = source;
}

//  SWITCH CANVAS COLORS FUNCTION
function squareClicker(square) {
  $('.square').on('click', function (ev) {
    $("#canvas").css('background-color', ev.target.style.backgroundColor);
  });
}

// RESize BUTTON SEQUENCE OF FUNCTIONS
//
// set up active anchors for the photos
function update(activeAnchor) {
  let group = activeAnchor.getParent();
  let topLeft = group.get('.topLeft')[0];
  let topRight = group.get('.topRight')[0];
  let bottomRight = group.get('.bottomRight')[0];
  let bottomLeft = group.get('.bottomLeft')[0];
  let image = group.get('Image')[0];
  let anchorX = activeAnchor.getX();
  let anchorY = activeAnchor.getY();
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

//create and add resize anchors
function addAnchor(group, x, y, name) {
  let stage = group.getStage();
  let targetLayer = group.getLayer();
  let anchor = new Konva.Circle({
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
  anchor.on('dragmove', function () {
    update(this);
    targetLayer.draw();
  });
  anchor.on('mousedown touchstart', function () {
    group.setDraggable(false);
    this.moveToTop();
  });
  anchor.on('dragend', function () {
    group.setDraggable(true);
    targetLayer.draw();
  });
  // add hover styling
  anchor.on('mouseover', function () {
    let targetLayer = this.getLayer();
    document.body.style.cursor = 'pointer';
    this.setStrokeWidth(4);
    targetLayer.draw();
  });
  anchor.on('mouseout', function () {
    let targetLayer = this.getLayer();
    document.body.style.cursor = 'default';
    this.setStrokeWidth(2);
    targetLayer.draw();
  });
  group.add(anchor);
  return anchor;
}

// let targetLayer = new Konva.Layer();
// stage.add(targetLayer);

//RESIZE BUTTON CLICK EVENT
$('#resizeButton').on('click', function (ev) {
  console.log('IM CLICKING THE RESIZE BUTTON');
  addAnchor(lastAddedGroup, lastAddedGroup.x(), lastAddedGroup.y(), "topLeft");
  addAnchor(lastAddedGroup, lastAddedGroup.width() + lastAddedGroup.x(), lastAddedGroup.y(), "topRight");
  addAnchor(lastAddedGroup, lastAddedGroup.width() + lastAddedGroup.x(), lastAddedGroup.height() + lastAddedGroup.y(), "bottomRight");
  addAnchor(lastAddedGroup, lastAddedGroup.x(), lastAddedGroup.height() + lastAddedGroup.y(), "bottomLeft");
  lastAddedGroup.draw();
});

//RESET BUTTON CONSTRUCTION
$('#resetButton').on('click', function (ev) {
  stage.clear();
  layers.forEach(function (layer) {
    layer.removeChildren();
  });
  // stage.style.backgroundColor = "white";
  targetLayer.draw();
});

//Create a nested forEach to generate img tags for imgObj[keys]
Object.keys(sectionImageObj).forEach(function (section) {
  let imageSelector = document.querySelector(`#${section} .card`);

  sectionImageObj[section].forEach(function (value) {
    //   // create img html element with src = value
    let imageElement = document.createElement('img');
    imageElement.src = value; //set image urls to the values in sectionImageObj
    $(imageElement).addClass("imageSelector");
    // attach image to section div
    imageSelector.appendChild(imageElement);
    let targetLayer = layers[1];
    if (section === "templates") {
      targetLayer = layers[0];
    }
    else if (section === "accessories") {
      targetLayer = layers[2];
    }
    imageClick(imageElement, targetLayer); //here, I'm invoking my imageClick function
  });
});

//generate color palette
let navBar = document.getElementById('navBar');
for (let i = 0; i < colors.length; i++) {
  let square = document.createElement('div');
  square.className = 'square';
  square.style.backgroundColor = colors[i];
  navBar.appendChild(square);
  squareClicker();
}

//Canvas creation
let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d'); //canvas object uses method getContext to access to a lot of drawing info


// IMAGE OBJECT
let sectionImageObj = {
  templates: [
    'assets/humanModelPic.png',
    'http://fillmurray.com/150/150',
    'http://fillmurray.com/150/150',
    'http://fillmurray.com/150/150',
    'http://fillmurray.com/150/150',
  ],
  accessories: [
    'http://fillmurray.com/150/150',
    'http://fillmurray.com/150/150',
    'http://fillmurray.com/150/150',
    'http://fillmurray.com/150/150',
  ],
  dresses: [
    'http://fillmurray.com/150/150',
    'http://fillmurray.com/150/150',
    'http://fillmurray.com/150/150',
    'http://fillmurray.com/150/150',
  ],
  tops: [
    'http://fillmurray.com/150/150',
    'http://fillmurray.com/150/150',
    'http://fillmurray.com/150/150',
    'http://fillmurray.com/150/150',
  ],
  bottoms: [
    'http://fillmurray.com/150/150',
    'http://fillmurray.com/150/150',
    'http://fillmurray.com/150/150',
    'http://fillmurray.com/150/150',
  ]
};

Object.keys(sectionImageObj).forEach(function (section) {
  let imageSelector = document.querySelector(`#${section} .card`);
  console.log(imageSelector);

  sectionImageObj[section].forEach(function (value) {
    //   // create img html element with src = value
    let imageElement = document.createElement('img');
    imageElement.src = value;
    // attach image to section div
    imageSelector.appendChild(imageElement);
    console.log(imageSelector);

    // put event listener on image
  });
});
//
// // SETTING UP KONVA LIBRARY FOR CANVAS
// let stage = new Konva.Stage({
//   container: '#canvas',
//   width: canvas.width,
//   height: canvas.height
// });
//
// let firstLayer = new Konva.Layer();
//
// stage.add(firstLayer);
//
// let secondLayer = new Konva.Layer();


// Create events for all of template and clothing images


//Side Bar

//Side Bar

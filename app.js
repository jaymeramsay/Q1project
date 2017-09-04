//Canvas creation
// let canvas = document.querySelector('canvas');
// let context = canvas.getContext('2d'); //canvas object uses method getContext to access to a lot of drawing info



// SETTING UP KONVA LIBRARY FOR CANVAS
//setting the Stage
let stage = new Konva.Stage({
  container: 'canvas',
  width: 700,
  height: 700
});

let layer = new Konva.Layer();
stage.add(layer);



// IMAGE OBJECT
let sectionImageObj = {
  templates: [
    'assets/humanModelPic.png',
    'http://fillmurray.com/150/155',
    'http://fillmurray.com/150/160',
    'http://fillmurray.com/150/200',
    'http://fillmurray.com/150/100',
  ],
  accessories: [
    'http://fillmurray.com/150/120',
    'http://fillmurray.com/150/115',
    'http://fillmurray.com/150/175',
    'http://fillmurray.com/150/150',
  ],
  dresses: [
    'http://fillmurray.com/150/140',
    'http://fillmurray.com/150/210',
    'http://fillmurray.com/150/180',
    'http://fillmurray.com/150/190',
  ],
  tops: [
    'http://fillmurray.com/150/151',
    'http://fillmurray.com/150/152',
    'http://fillmurray.com/150/153',
    'http://fillmurray.com/150/154',
  ],
  bottoms: [
    'http://fillmurray.com/150/132',
    'http://fillmurray.com/150/134',
    'http://fillmurray.com/150/111',
    'http://fillmurray.com/150/109',
  ]
};



// put a click event on image buttons in sidebar
function imageClick(element) {
  $(element).on('click', function (ev) {
    let imgButton = ev.target;
    imageToCanvas(imgButton.src); //calling another function
  });
}

//accessing images sources in function
function imageToCanvas(source) {
  let imageObj = new Image();
  console.log('this is my source' + source);

  imageObj.onload = function () {
    let image = new Konva.Image({
      x: 175,
      y: 50,
      image: imageObj,
      width: 400,
      height: 600,
      draggable: true
    });
    layer.add(image);
    stage.add(layer);

    image.on('click', function (ev) {
      ev.target.remove();
      layer.draw();
    });
  };
  imageObj.src = source;
}




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
    imageClick(imageElement); //here, I'm invoking my imageClick function
  });
});




//Side Bar

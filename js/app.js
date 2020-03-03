var product = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "sweep",
  "tauntaun",
  "unicorn",
  "usb",
  "water-can",
  "wine-glass"
];
var last=[];

var productOne = document.querySelector('#productOne');
var productTwo = document.querySelector('#productTwo');
var productThree = document.querySelector('#productThree');
var imageSection = document.querySelector('#imagesSection');

productOne.src = `img/${product[0]}.jpg`;
productOne.alt = product[0];
productOne.title = product[0];

productTwo.src = `img/${product[1]}.jpg`;
productTwo.alt = product[1];
productTwo.title = product[1];

productThree.src = `img/${product[2]}.jpg`;
productThree.alt = product[2];
productThree.title = product[2];
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function pro(name, imagePath) {
  this.name = name;
  this.clicks = 0;
  this.views = 0;
  this.imagePath = `img/${this.name}.jpg`;
  pro.all.push(this);
}
pro.all = [];

for (var i = 0; i < product.length; i++) {
  new pro(product[i]);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////


var one, two, three; //,four, five, six;
function render() {

  one = pro.all[randomNumber(0, pro.all.length - 1)];

  two = pro.all[randomNumber(0, pro.all.length - 1)];

  three = pro.all[randomNumber(0, pro.all.length - 1)];

//while (one.imagePath === two.imagePath || one.imagePath === three.imagePath || two.imagePath === three.imagePath) {
  while (one.imagePath === two.imagePath || one.imagePath === three.imagePath || two.imagePath === three.imagePath || last.includes(one.imagePath) || last.includes(three.imagePath) || last.includes(two.imagePath)) {
    one = pro.all[randomNumber(0, pro.all.length - 1)];

    two = pro.all[randomNumber(0, pro.all.length - 1)];

    three = pro.all[randomNumber(0, pro.all.length - 1)];
  }
  // pro.all.pop(one);
  // pro.all.pop(two);
  // pro.all.pop(three);

  // console.log(pro.all);

  // four = pro.all[randomNumber(0, pro.all.length - 1)];

  // five = pro.all[randomNumber(0, pro.all.length - 1)];

  // six = pro.all[randomNumber(0, pro.all.length - 1)];

 
  // while (four.imagePath === five.imagePath || four.imagePath === six.imagePath || five.imagePath === six.imagePath) {
  //   four = pro.all[randomNumber(0, pro.all.length - 1)];

  //   five = pro.all[randomNumber(0, pro.all.length - 1)];

  //   six = pro.all[randomNumber(0, pro.all.length - 1)];
  // }
  // pro.all.push(one);
  // pro.all.push(two);
  // pro.all.push(three);

  // console.log(pro.all);


 
  productOne.setAttribute('src', one.imagePath);
  productOne.setAttribute('alt', one.name);
  productOne.setAttribute('title', one.name);

  productTwo.setAttribute('src', two.imagePath);
  productTwo.setAttribute('alt', two.name);
  productTwo.setAttribute('title', two.name);

  productThree.setAttribute('src', three.imagePath);
  productThree.setAttribute('alt', three.name);
  productThree.setAttribute('title', three.name);


  last[0] = one.imagePath;
  last[1] = two.imagePath;
  last[2] = three.imagePath;

 while (last.length>3){
   last.shift();
 }

}
render();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
imageSection.addEventListener('click', handleClickOnpro);
var totalClicks = 0;
function handleClickOnpro(event) {
  if (totalClicks < 25) {
    if (event.target.id !== 'imagesSection') {
      if (event.target.id === 'productOne') {
        one.clicks++;
      } else if (event.target.id === 'productTwo') {
        two.clicks++;
      } else if (event.target.id === 'productThree') {
        three.clicks++;
      }
      totalClicks++;
      one.views++;
      two.views++;
      three.views++;
      render();
    }
  } else {
    console.log('more than 25 clicks');
    imageSection.removeEventListener('click', handleClickOnpro);
    render2();
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
function render2() {
  // var ulE1 = document.getElementById('summary');
  // for (var i =0; i<pro.all.length ; i++) {
  //   var liE1 = document.createElement('li');
  //   liE1.textContent = `${pro.all[i].name} has ${pro.all[i].clicks} clicks and ${pro.all[i].views} views`;
  //   ulE1.appendChild(liE1);
  // }
  var newProductClicks = [];
  var newviews = [];
  for (var i = 0; i < product.length; i++) {

    var productClicks = pro.all[i].clicks;
    newProductClicks.push(productClicks);

    var productViews = pro.all[i].views;
    newviews.push(productViews);



    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: product,
        datasets: [{
          label: '# of click',
          data: newProductClicks,
          backgroundColor: 'rgba(20, 0, 0, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,

        },
        {
          label: '# of views',
          data: newviews,
          backgroundColor: 'rgba(250, 99, 189, 0.2)',
          borderColor: 'rgba(295, 99, 132, 1)',
          borderWidth: 1,

        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


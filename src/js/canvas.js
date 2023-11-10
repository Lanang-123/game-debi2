import caracter from "../img/ck.png"
import platform from "../img/platform.png"
import background from "../img/background.png"
import tree from "../img/tree.png"


const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Lebar wadah
canvas.width = 1024;
// Tinggi wadah
canvas.height = 576;


const gravity = 0.5;
let scrollOffset = 0;

// Atur Pemain
class Player {
    constructor() {
        // Posisi Pemain
        this.position = {
            x:100,
            y:100
        }

         // Gravitasi Pemain
        this.velocity = {
            x:0,
            y:0
        }

        this.widht =30,
        this.height = 30
    }

    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y,this.widht,this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if(this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        }else {
            this.velocity.y = 0;
        }


    }
}

// Wadah layar
class Platform {
    constructor({x,y,image}) {
        this.position = {
            x,y
        },
        this.image = image
        this.width = image.width
        this.height = image.height
        
    }

    draw() {
        c.drawImage(this.image,this.position.x,this.position.y)
    }
}

class GenericObject {
    constructor({x,y,image}) {
        this.position = {
            x,y
        },
        this.image = image
        this.width = image.width
        this.height = image.height
        
    }

    draw() {
        c.drawImage(this.image,this.position.x,this.position.y)
    }
}

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

const platFormImage = createImage(platform);

const player = new Player();
const platforms = [new Platform({x:-1,y:470,image: platFormImage}),new Platform({x:platFormImage.width - 3,y:470,image:platFormImage})];

const genericObjects = [
  new GenericObject({x:-1,y:-1,image:createImage(background)}),
  new GenericObject({x:100,y:400,image:createImage(tree)},{x:250,y:300,image:createImage(tree)},{x:500,y:300,image:createImage(tree)}),
];

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}


function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'white' 
    c.fillRect(0,0,canvas.width,canvas.height);
    
    genericObjects.forEach(genericObject => {
      genericObject.draw();
    });

    platforms.forEach((platform) => {
        platform.draw();
    });
    player.update();

    // Gerakan 
    if(keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5;
    }else if(keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5;
    }
    else {
        player.velocity.x = 0;
        if(keys.right.pressed) {
            scrollOffset += 5;
            platforms.forEach((platform) => {
               platform.position.x -= 5;
            }); 
            genericObjects.forEach(genericObject => {
              genericObject.position.x -= 3;
            })
        }else if(keys.left.pressed) {
            scrollOffset += 5;
            platforms.forEach((platform) => {
               platform.position.x += 5;
            });
             genericObjects.forEach(genericObject => {
              genericObject.position.x += 3;
            })
           
        }
    }


    // Interaksi antara pijakan dan player
    platforms.forEach((platform) => {
        if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.widht >= platform.position.x && player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0;
        }
    })

    if(scrollOffset > 2000) {
        console.log('you win');
    }
}

animate();

// PERGERAKAN PEMAIN
addEventListener('keydown',({keyCode}) => {
    console.log(keyCode);
    switch (keyCode) {
        case 65:
            keys.left.pressed = true;
            break;
        case 83:
            player.velocity.y += 1;
            break;
        case 87:
            player.velocity.y -= 0;
            break;
        case 68:
            keys.right.pressed = true;
            break;
    }
})

addEventListener('keyup',({keyCode}) => {
    console.log(keyCode);
    switch (keyCode) {
        case 65:
            keys.left.pressed = false;
            break;
        case 83:
            player.velocity.y += 20;
            break;
        case 87:
            player.velocity.y -= 20;
            break;
        case 68:
            keys.right.pressed = false;
            break;
    }
})
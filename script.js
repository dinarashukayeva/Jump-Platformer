let allFloor = [];

let rooms = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

let x = 300; let y = 50;
let vx = 0; let vy = 0;
let ay = 0.8; let ax = 0;
let moving = false;
let room = 0;
let row = 0;
let col = 0;
let jump = false;
let ind = -1;
let claw = true; //for future purposes
let walljumpcheck = false;

let state = "action";

let inv = [];
let items = [];


setInterval(frame, 16.7)

function setup() {//0
  createCanvas(600, 600);
  //items.push([new Item(60, 260, "alcohol à la misery")])
  //items.push([])
  //items.push([])
  // items.push([])
  // items.push([])
  // items.push([])
  // items.push([])
  // items.push([])
  // items.push([])
  allFloor.push([ //0
    new Floor(400, 450, 200, 20), 
    new Floor(0, 580, 600, 20), 
    new Floor(0, 320, 500, 20), 
    new Floor(60, 100, 340, 20), 
    new Floor(0, 0, 20, 600), 
    new Floor(580, 0, 20, 490), 
    new Floor(0, 0, 600, 20), 
    new Floor(400, 90, 20, 100), 
    new Floor(500, 190, 500, 20)]);
  
  allFloor.push( //1
    [new Floor(0, 580, 300, 20), //bottom1
     new Floor(400, 580, 200, 20),//bottom2
     new Floor(580, 120, 20, 500),//right
     new Floor(100, 100, 500, 20),//topright 
     new Floor(160, 450, 420, 20),
     new Floor(0, 280, 500, 20),
     new Floor(0, 0, 20, 490), 
     new Floor(0, 0, 600, 20)
    ]);
  allFloor.push([//2
    new Floor(0, 580, 600, 20), 
     new Floor(580, 0, 20, 600), 
     new Floor(0, 120, 20, 500),
     new Floor(0, 0, 600, 20),
     new Floor(445, 140, 20, 340),
     new Floor(20, 120, 445, 20),
     new Floor(0, 100, 20, 20)
    ]);
  allFloor.push([//3
    new Floor(60, 580, 560, 20), //bottom
    new Floor(0, 0, 20, 600), //left
    new Floor(20, 0, 580, 20)
    ]);
  allFloor.push([//4
    new Floor(0, 580, 600, 20), //bottom
    new Floor(150, 0, 20, 460), 
    new Floor(275, 450, 305, 20), //
    new Floor(580, 0, 20, 600), //side
    new Floor(0, 0, 300, 20), //top1
    new Floor(400, 0, 200, 20) //top2
  ]);//4
  allFloor.push([//5
    new Floor(0, 580, 600, 20), 
    new Floor(580, 0, 20, 600)
  ])
  allFloor.push([//6
    new Floor(0, 580, 600, 20), //bottom
    new Floor(0, 0, 20, 580), //left
    new Floor(60, 0, 560, 20)//top
  ])
  allFloor.push([new Floor(0, 580, 600, 20), new Floor(0, 0, 600, 20)])
  allFloor.push([new Floor(0, 580, 600, 20), new Floor(580, 0, 20, 600), new Floor(0, 0, 600, 20)])
}//floors/items in rooms

function FloorCollide() {
  for (let i = 0; i < allFloor[room].length; i++) {
    if (allFloor[room][i].x + allFloor[room][i].l > x - 10 && allFloor[room][i].x < x + 10 && allFloor[room][i].y + allFloor[room][i].w > y - 11 && allFloor[room][i].y < y + 9) {
      if (!(x - 10 < allFloor[room][i].x + allFloor[room][i].l && x + 10 > allFloor[room][i].x + allFloor[room][i].l + 9) && !(x + 10 > allFloor[room][i].x && x-10 < allFloor[room][i].x - 9)) { 
        if (y < allFloor[room][i].y + (allFloor[room][i].w) / 2) {
          ay = 0
          vy = 0
          y = allFloor[room][i].y - 9
          walljumpcheck = false;
        } else if (y > allFloor[room][i].y + (allFloor[room][i].w) / 2) {
          ay = 0.8
          vy = 0
          y = allFloor[room][i].y + allFloor[room][i].w + 11
        }
      }else{
        if(x < allFloor[room][i].x + (allFloor[room][i].l) / 2){
          if(claw == true && jump == true && keyIsDown(67)){
            vx = -12
            vy = -9
            walljumpcheck = true
          }else{
          vx = 0
          x = allFloor[room][i].x -10
          }
        }if(x > allFloor[room][i].x + (allFloor[room][i].l) / 2){
          if(claw == true && jump == true && keyIsDown(67)){
            vx = 12
            vy = -9
            walljumpcheck = true
          }else{
          vx = 0
          x = allFloor[room][i].x + allFloor[room][i].l + 10
          }
        }
      }
    } else {
      ay = 0.8
    }
  }
}

//function ItemCollide(){
  //for(let i = 0; i < allItem[room].length; i++) {
  //}
//}

function frame(){
  if(state == "action"){
    action()
  }
  if(state == "inventory"){
    inven()
  }
}


function inven(){
   background(100, 92, 80);
  //------ display ---------
  for (let i = 0; i < allFloor[room].length; i++) {
    allFloor[room][i].display();
    circle(x, y, 20)
  }
  //for (let i = 0; i < items[room].length; i++) {
    //items[room][i].display();
  //}
  fill(10, 10, 10, 100)
  rect(0, 0, 600, 600)
  fill(200, 200, 200, 100)
  rect(100, 300, 400, 550)
  fill(0)

  text("ITEMS", 280, 310)
  text("coordinates (" + col + ", " + (rooms.length - row) + ")", 30, 30)
}

function action() {
  background(100, 92, 80);
  //------ display ---------
  for (let i = 0; i < allFloor[room].length; i++) {
    allFloor[room][i].display();
  }
  //for (let i = 0; i < items[room].length; i++) {
    //items[room][i].display();
  //}

  //-------- add v and a --------
  if(vy <= 19){
    vy += ay
  }
  y += vy
  vx += ax
  x += vx

  circle(x, y, 20)
  FloorCollide();
  //ItemCollide()

  //------- jump from floor -------------
  for (let i = 0; i < allFloor[room].length; i++) {
    if (y + 9 == allFloor[room][i].y) {
      jump = false;
    }
  }

  //----- Left right slowing down --------
  if (moving == true && vx > 0) {
    ax = -0.5
  } else if (moving == true && vx < 0) {
    ax = 0.5
  } else {
    ax = 0
  }

  //------ leftright moving, room switch ---------
  if (keyIsDown(RIGHT_ARROW) && walljumpcheck == false) {
    FloorCollide();
      moving = false
      vx = 5
    if(x > 590 && col != rooms[0].length - 1){
      room = rooms[row][col +  1]
      col += 1;
      x = 10 
    }
  } 
  else {
    moving = true
  }
  
  if (keyIsDown(LEFT_ARROW) && walljumpcheck == false) {
    FloorCollide();
      moving = false
      vx = -5
    if(x < 10 && col != 0){
      room = rooms[row][col - 1]
      col -= 1;
      x = 590
    }
  } 
  else {
    moving = true
  }
  
//--------- up/down room change -----------
  if(y < 0 && row != 0){
    room = rooms[row - 1][col];
    print("q")
    y = 580
    row -= 1
  }
  if(y > 600 && row != rooms.length - 1){
    room = rooms[row + 1][col];
    print("r")
    y = 10
    row += 1
    print(row)
  }
}

function keyPressed() {
  if (key == ' ') {
    if (jump == false && state == "action") {
      vy -= 15;
      jump = true;
    }
  }
  //if (key == 'q') {
    // print(x + " " + vx)
    // print(keyIsDown(LEFT_ARROW) && x >= 0)
    // print(allFloor[0].x + allFloor[0].l)
    //print(row + " " + col)
    //print(claw)
  //}
  if(key == 'i'){
    if(state == "inventory"){
      state = "action";
    }else{
      state = "inventory";
    }
  }
}

function mousePressed() {
    print(mouseX + ", " + mouseY);
}

//---------------------- FLOOR COLLIDE SCAFFOLD VERSION ---------
// function FloorCollide(){
//   for (let i = 0; i < allFloor.length; i++) {
//      if (allFloor[i].x + allFloor[i].l > x - 10 && allFloor[i].x < x + 10 && allFloor[i].y + allFloor[i].w > y - 10 && allFloor[i].y < y + 10) {
//        if(y < allFloor[i].y + (allFloor[i].l) /2){
//           ay = 0
//           vy = 0
//           y = allFloor[i].y - 10
//        }
//        else if(y < allFloor[i].y + (allFloor[i].l) /2){
//           ay = 0
//           vy = 0
//           y = allFloor[i].y + allFloor[i].w + 10
//        }
//      }else{
//        ay = 0.8
//      }
//   }
// }

let spline_dropdown;
let mode_dropdown;
let reset_button;

let backR = 0;
let backG = 0;
let backB = 0;

let point_radius = 20;
let pointR = 255;
let pointG = 0;
let pointB = 100;

let dragged = false;
let drag_index = -1;

function setup() {
  createCanvas(800, 800);
  init_curve();
  make_dropdown();
  make_button();
}


function draw() {
  background(backR, backG, backB);
  let spline_type = spline_dropdown.value();
  let interaction = mode_dropdown.value();
  check_control_points();
  if (spline_type == "Bezier Curve" && control_points.length >= 4) {
    interpolate_bezier(control_points);
  } else if (spline_type == "B-Spline" && control_points.length >= 4) {
    interpolate_b_spline(control_points);
  } else if (spline_type == "Catmull-Rom Spline" && control_points.length >= 4) {
    interpolate_catmull(control_points);
  }
  
}

function check_control_points() {
  for (let i = 0; i < control_points.length; i++) {
    fill(pointR, pointG, pointB);
    if (i != 0) {
      stroke(200);
      strokeWeight(1);
      drawingContext.setLineDash([5,15]);
      line(control_points[i-1].x, control_points[i-1].y, control_points[i].x, control_points[i].y);
    }
    if (dist(control_points[i].x, control_points[i].y, mouseX, mouseY) < point_radius && mouseIsPressed && mode_dropdown.value() == "Move control point" && !dragged) {
      dragged = true;
      drag_index = i;
    }
    if (mouseIsPressed && dragged && i == drag_index) {
      control_points[i].x = mouseX;
      control_points[i].y = mouseY;
    }
    control_points[i].x = Math.min(width, control_points[i].x);
    control_points[i].y = Math.min(height, control_points[i].y);
    control_points[i].x = Math.max(0, control_points[i].x);
    control_points[i].y = Math.max(0, control_points[i].y);
    noStroke();
    circle(control_points[i].x, control_points[i].y, point_radius);
  }
}

function make_button() {
  reset_button = createButton("Reset");
  reset_button.position(width + 50, 150);
  reset_button.mousePressed(reset_spline);
}

function make_dropdown() {
  spline_dropdown = createSelect();
  spline_dropdown.position(width + 50, 50);
  spline_dropdown.option("Bezier Curve");
  spline_dropdown.option("B-Spline");
  spline_dropdown.option("Catmull-Rom Spline");
  
  mode_dropdown = createSelect();
  mode_dropdown.position(width + 50, 100);
  mode_dropdown.option("Create control point");
  mode_dropdown.option("Move control point");
}

function mouseClicked() {
  if (mode_dropdown.value() == "Create control point" && mouseX <= width && mouseY <= height) {
    new_control_point(mouseX, mouseY);
  }
}

function mouseReleased() {
  if (mode_dropdown.value() == "Move control point") {
    dragged = false;
    drag_index = -1;
  }
  return false;
}

function reset_spline() {
  control_points = [];
  init_curve();
}

function init_curve() {
  new_control_point(40, 400);
  new_control_point(60, 80);
  new_control_point(400, 80);
  new_control_point(420, 400);
}

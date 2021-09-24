let control_points = [];

function ControlPoint(x, y) {
  this.x = x;
  this.y = y;
}

function new_control_point(x, y) {
  let control_point = new ControlPoint(x, y);
  control_points.push(control_point);
}

function bezier_curve(p0, p1, p2, p3, t) {
  let time_matrix = [[Math.pow(t, 3),Math.pow(t,2),t,1]];
  let g_b = [[float(p0.x), float(p0.y)], [float(p1.x), float(p1.y)], [float(p2.x), float(p2.y)], [float(p3.x), float(p3.y)]];
  let m_b = [[-1.0,3.0,-3.0,1.0],[3.0,-6.0,3.0,0.0],[-3.0,3.0,0.0,0.0],[1.0,0.0,0.0,0.0]];
  let b_b = matrix_mult(time_matrix, m_b);
  let q_t = matrix_mult(b_b, g_b);
  return q_t;
}

function interpolate_bezier(control_points) {
  let interpolated_points = [];
  let index = 0;
  stroke(255, 155, 0);
  strokeWeight(5);
  for (let i = 0; i < control_points.length - 3; i += 3) {
    for (let t = 0; t <= 1; t += 0.005) { 
      interpolated_points[index] = bezier_curve(control_points[i], control_points[i + 1], control_points[i + 2], control_points[i + 3], t);
      if (index != 0) {
        line(interpolated_points[index - 1][0][0], interpolated_points[index - 1][0][1], interpolated_points[index][0][0], interpolated_points[index][0][1]);
      }
      index++;
    }
  }
}

function b_spline(p0, p1, p2, p3, t) {
  let time_matrix = [[Math.pow(t, 3),Math.pow(t,2),t,1]];
  let g_bs = [[float(p0.x), float(p0.y)], [float(p1.x), float(p1.y)], [float(p2.x), float(p2.y)], [float(p3.x), float(p3.y)]];
  let m_bs = [[-1.0/6.0, 3.0/6.0, -3.0/6.0, 1.0/6.0],[3.0/6.0, -6.0/6.0, 3.0/6.0, 0.0],[-3.0/6.0, 0.0, 3.0/6.0, 0.0],[1.0/6.0, 4.0/6.0, 1.0/6.0, 0.0]];
  let b_bs = matrix_mult(time_matrix, m_bs);
  let q_t = matrix_mult(b_bs, g_bs);
  return q_t;
}

function interpolate_b_spline(control_points) {
  let interpolated_points = [];
  let index = 0;
  stroke(255, 155, 0);
  strokeWeight(5);
  for (let i = 0; i < control_points.length - 3; i++) {
    for (let t = 0; t <= 1; t += 0.005) { 
      interpolated_points[index] = b_spline(control_points[i], control_points[i + 1], control_points[i + 2], control_points[i + 3], t);
      if (index != 0) {
        line(interpolated_points[index - 1][0][0], interpolated_points[index - 1][0][1], interpolated_points[index][0][0], interpolated_points[index][0][1]);
      }
      index++;
    }
  }
}

function catmull_rom_spline(p0, p1, p2, p3, t) {
  let time_matrix = [[Math.pow(t, 3),Math.pow(t,2),t,1]];
  let g_cs = [[float(p0.x), float(p0.y)], [float(p1.x), float(p1.y)], [float(p2.x), float(p2.y)], [float(p3.x), float(p3.y)]];
  let m_cs = [[-1.0/2.0, 3.0/2.0, -3.0/2.0, 1.0/2.0],[2.0/2.0, -5.0/2.0, 4.0/2.0, -1.0/2.0],[-1.0/2.0, 0.0, 1.0/2.0, 0.0],[0.0, 2.0/2.0, 0.0, 0.0]];
  let b_cs = matrix_mult(time_matrix, m_cs);
  let q_t = matrix_mult(b_cs, g_cs);
  return q_t;
}

function interpolate_catmull(control_points) {
  let interpolated_points = [];
  let index = 0;
  stroke(255, 155, 0);
  strokeWeight(5);
  for (let i = 0; i < control_points.length - 3; i++) {
    for (let t = 0; t <= 1; t += 0.005) { 
      interpolated_points[index] = catmull_rom_spline(control_points[i], control_points[i + 1], control_points[i + 2], control_points[i + 3], t);
      if (index != 0) {
        line(interpolated_points[index - 1][0][0], interpolated_points[index - 1][0][1], interpolated_points[index][0][0], interpolated_points[index][0][1]);
      }
      index++;
    }
  }
}

function matrix_mult(a, b) {
    let result = [];
    for (let i = 0; i < a.length; i++) {
        result[i] = [];
        for (let j = 0; j < b[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < a[0].length; k++) {
                sum += a[i][k] * b[k][j];
            }
            result[i][j] = sum; 
        }
    }
    return result;
}

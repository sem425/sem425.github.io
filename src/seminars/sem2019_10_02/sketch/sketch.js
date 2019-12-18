let Width = 600;
let Height = 600;

let T = 0.0;
// Шаг интегрирования
let DT = 0.01;

// Число элементарных шагов на один один вызов draw()
let IntegrationStepsN = 100;

// Состояние атомов
let X_balls = [];
let Y_balls = [];
let VX_balls = [];
let VY_balls = [];

// Временные массивы для копирования состояния атомов
let Temp_X_balls = [];
let Temp_Y_balls = [];
let Temp_VX_balls = [];
let Temp_VY_balls = [];

// Вязкость
let Nu = t => {
    if (t >= 800000) {
	return 0.04;
    } else {
	return 0.0;
    }
};

// жесткость пружин
let K = 0.2;

// Размер решетки в атомах
let NRows = 80; 
let NCols = 80;

// Шаг решетки
let Step = 10;

function init_state() {
    for (let row = 0; row < NRows; row++) {
	X_balls.push([]);
	Y_balls.push([]);
	VX_balls.push([]);
	VY_balls.push([]);
	
	Temp_X_balls.push([]);
	Temp_Y_balls.push([]);
	Temp_VX_balls.push([]);
	Temp_VY_balls.push([]);
	
	for (let col = 0; col < NCols; col++) {
	    X_balls[row].push(1.2 * Step * col);
	    Y_balls[row].push(1.2 * Step * row);
	    if(row == 0) {
		VX_balls[row].push(0.0);
	    } else {
		VX_balls[row].push(0.0);
	    }
	    VY_balls[row].push(0.0);
	    
	    Temp_X_balls[row].push(Step * col);
	    Temp_Y_balls[row].push(Step * row);
	    Temp_VX_balls[row].push(0.0);
	    Temp_VY_balls[row].push(0.0);
	}
    }
}

function step() {
    for (let row = 0; row < NRows; ++row) {
	for (let col = 0; col < NCols; ++col) {
	    // Вычислим ускорение, действующее на шар [row,col]

	    let ax = 0.0;
	    let ay = 0.0;
	    
	    for (let dr = -1; dr <= 1; dr++) {
		for (let dc = -1; dc <= 1; dc++) {
		    if (dr == 0 && dc == 0) {
			continue;
		    }

		    // Шар, с которым будем считать взаимодействие:
		    let nb_row = row + dr;
		    let nb_col = col + dc;

		    if (nb_row < 0 || nb_row >= NRows || nb_col < 0 || nb_col >= NCols) {
			// Имеем дело с шаром за границей решетки(не существует)
			continue;
		    }

		    let x0 = X_balls[row][col];
		    let y0 = Y_balls[row][col];
		    let x1 = X_balls[nb_row][nb_col];
		    let y1 = Y_balls[nb_row][nb_col];

		    // Посчитаем расстояние между атомами в недеформированной решетки:
		    let s;
		    if (dr == dc || dr == -dc) {
			// Диагональ
			s = Math.sqrt(2) * Step;
		    } else {
			// Вертикаль | горизонталь
			s = Step;
		    }

		    // Посчитаем силу взаимодействия, исходя из модели упругости с учетом
		    // того, что пружина в расслабленном состояние имеет длину s
		    let l = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
		    fx = K * (1 - s / l) * (x1 - x0);
		    fy = K * (1 - s / l) * (y1 - y0);

		    // сделаем добавку к ускорению в предположении 1-ной массы:
		    ax += fx;
		    ay += fy;
		}
	    }

	    // Шары погружены в вязкую среду с коэффициентом вязкости Nu. Учтем вязкость
	    ax += -Nu(T) * VX_balls[row][col];
	    ay += -Nu(T) * VY_balls[row][col];

	    // Сделаем шаг интегрирования методом Эйлера:
	    Temp_X_balls[row][col] = X_balls[row][col] + VX_balls[row][col] * DT;
	    Temp_Y_balls[row][col] = Y_balls[row][col] + VY_balls[row][col] * DT;
	    Temp_VX_balls[row][col] = VX_balls[row][col] + ax * DT;
	    Temp_VY_balls[row][col] = VY_balls[row][col] + ay * DT;

	    // Обновим время
	    T += DT;
	}
    }

    // Обновим координаты шаров
    // Решили делать без перестановок двух массивов.
    for (let row = 0; row < NRows; row++) {
	for (let col = 0; col < NCols; col++) {
	    X_balls[row][col] = Temp_X_balls[row][col];
	    Y_balls[row][col] = Temp_Y_balls[row][col];
	    VX_balls[row][col] = Temp_VX_balls[row][col];
	    VY_balls[row][col] = Temp_VY_balls[row][col];
	}
    }
}

function setup() {
    self.createCanvas(600, 600);
    self.noStroke();
    self.fill(255, 255, 0);

    init_state();
}

function draw() {
    self.background(0, 0, 0);
    self.noStroke();
    self.fill(255, 255, 0);
    
    for (let row = 0; row < NRows; row++) {
	for (let col = 0; col < NCols; col++) {
	    self.ellipse(0 + X_balls[row][col] * 0.5, 0 + Y_balls[row][col] * 0.5, 2, 2);
	}
    }

    self.stroke(255);
    self.fill(255,255,255);
    self.text(T, 10, 20);

    for(let st = 0; st < IntegrationStepsN; st++) {
	step();
    }
}

let Width = 380;
let Height = 380;
let MaxVel = 10;
let T = 0.0;
let dT = 0.1;

let NPrey = 60
let NPredator = 60;
let Alpha = 0.003;
let Gamma = 0.003;
let DistanceThreshold = 10;
let Beta = 0.5;  // prey's mortality
let Delta = 0.2;

function Population() {
    this.array = []
    this.idx = 0;
    this.nsize = 0;
    
    this.append = fish => {
	if (this.array.length <= this.nsize) {
	    this.array.push(fish);
	} else {
	    this.array[this.nsize] = fish;
	}

	this.nsize++;
    };
    
    this.begin_iterate = () => {
	this.idx = 0;
    }

    this.point_to = () => {
	return this.idx < this.nsize;
    }

    this.get = () => {
	if(!this.point_to()){
	    return null
	}

	return this.array[this.idx];
    }

    this.remove = () => {
	if(this.point_to()) {
	    let fish = this.array[this.idx];
	    this.array[this.idx] = this.array[this.nsize - 1];
	    this.nsize--;
	    return fish;
	}

	return null;
    }
    
    this.next = () => {
	this.idx++;
    }    
}

function birth(fish) {
    let vx = random(-MaxVel, MaxVel);
    let vy = random(-MaxVel, MaxVel);
    return [fish[0], fish[1], vx, vy];
}

function moveFishes(population, dt) {
    population.begin_iterate();
    while(population.point_to()) {
	let fish = population.get()
	fish[0] = fish[0] + fish[2] * dt;
	fish[1] = fish[1] + fish[3] * dt;
	fish[0] = (fish[0] + Width) % Width;
	fish[1] = (fish[1] + Height) % Height;
	population.next();
    }
}

function preyReproduction(population, alpha) {
    population.begin_iterate();
    while(population.point_to()) {
	let fish = population.get();
	if (random() < alpha) {
	    let new_fish = birth(fish)
	    population.append(new_fish);
	}
	population.next();
    }
}

function predatorExtinction(population, gamma) {
    population.begin_iterate();
    while(population.point_to()) {
	if (random() < gamma) {
	    population.remove();
	}
	population.next();
    }
}

function relationship(predators, preys, threshold, beta, delta) {
    preys.begin_iterate();
    while(preys.point_to()) {
	predators.begin_iterate();
	while(predators.point_to()) {
	    let prey = preys.get();
	    if(prey == null) {
		break;
	    }

	    let predator = predators.get();
	    let d = abs(prey[0] - predator[0]) + abs(prey[1] - predator[1]);
	    if (d < threshold) {
		if(random() < beta) {
		    preys.remove();
		}

		if(random() < delta) {
		    predators.append(birth(predator));
		}
	    }
	    predators.next();
	}
	preys.next();
    }
}

function step() {
    moveFishes(PreyPopulation, dT);
    moveFishes(PredatorPopulation, dT);

    preyReproduction(PreyPopulation, Alpha);
    
    predatorExtinction(PredatorPopulation, Gamma);

    relationship(PredatorPopulation, PreyPopulation, DistanceThreshold, Beta, Delta);
}

function drawPopulation(population, color, size) {
    fill(color);
    stroke(color);

    population.begin_iterate();
    while(population.point_to()) {
	let fish = population.get()
	ellipse(fish[0], fish[1], size, size);
	population.next();
    }
}

let PreyPopulation = new Population()
let PredatorPopulation = new Population();

function setup() {
    createCanvas(Width, Height);

    let init_fish = () => {
	let x = random(0, Width);
	let y = random(0, Height);
	let vx = random(-MaxVel, MaxVel);
	let vy = random(-MaxVel, MaxVel);
	return [x, y, vx, vy]
    };

    for(let i = 0; i < NPrey; i++) {
	PreyPopulation.append(init_fish());
    }

    for(let i = 0; i < NPredator; i++) {
	PredatorPopulation.append(init_fish());
    }
}

function draw() {
    background(255);
    fill(0,0,0);
    stroke(0,0,0);
    text('Prey: ' + PreyPopulation.nsize + ' Predator: ' + PredatorPopulation.nsize,
	 10, 10);
    drawPopulation(PreyPopulation, [0, 255, 0], 5);
    drawPopulation(PredatorPopulation, [255, 0, 0], 10);
    step();
}

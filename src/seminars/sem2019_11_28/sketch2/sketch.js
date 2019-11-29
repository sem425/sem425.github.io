let Width = 600;
let Height = 400;
let CHeight = Height + 400;

let MaxVel = 10;
let T = 0.0;
let dT = 0.1;

let NPrey = 60
let NPredator = 60;
let Alpha = 0.005;
let Gamma = 0.001;
let DistanceThreshold = 10;
let Beta = 0.2;  // prey's mortality
let Delta = 0.15

function birth(fish) {
    let vx = random(-MaxVel, MaxVel);
    let vy = random(-MaxVel, MaxVel);
    return [fish[0], fish[1], vx, vy];
}

function moveFishes(population, dt) {
    for (let i = 0; i < population.length; i++) {
	let fish = population[i];
	fish[0] = fish[0] + fish[2] * dt;
	fish[1] = fish[1] + fish[3] * dt;
	fish[0] = (fish[0] + Width) % Width;
	fish[1] = (fish[1] + Height) % Height;
    }
}

function preyReproduction(population, alpha) {
    let new_fishes = []
    for (let i = 0; i < population.length; i++) {
	let fish = population[i];
	if (random() < alpha) {
	    let new_fish = birth(fish)
	    new_fishes.push(new_fish);
	}
    }
    return new_fishes;
}

function predatorExtinction(population, gamma) {
    let i = 0;
    while(i < population.length) {
	if (random() < gamma) {
	    population[i] = population[population.length - 1];
	    population.pop();
	} else {
	    i++;
	}
    }
}

function relationship(predators, preys, threshold, beta, delta) {
    let new_predators = [];
    
    for(let pred_idx = 0; pred_idx < predators.length; pred_idx++) {
	let predator = predators[pred_idx];

	let prey_idx = 0;
	// console.log(preys.length);
	while(prey_idx < preys.length) {
	    let prey = preys[prey_idx];
	    let d = abs(prey[0] - predator[0]) + abs(prey[1] - predator[1]);
	    if (d < threshold) {
		if(random() < beta) {
		    preys[prey_idx] = preys[preys.length - 1];
		    preys.pop();
		    prey_idx--;
		    if(random() < delta) {
			new_predators.push(birth(predator));
		    }
		}
	    }
	    prey_idx++;
	}
    }

    return new_predators;
}

function step() {
    moveFishes(PreyPopulation, dT);
    moveFishes(PredatorPopulation, dT);

    let new_preys = preyReproduction(PreyPopulation, Alpha);

    predatorExtinction(PredatorPopulation, Gamma);

    let new_predators = relationship(PredatorPopulation, PreyPopulation, DistanceThreshold, Beta, Delta);

    // добавляем приплод
    PreyPopulation = PreyPopulation.concat(new_preys);
    PredatorPopulation = PredatorPopulation.concat(new_predators);
}

function drawPopulation(population, color, size) {
    fill(color);
    stroke(color);

    for(let i = 0; i < population.length; i++) {
	let fish = population[i];
	ellipse(fish[0], fish[1], size, size);
    }
}

let PreyPopulation = [];
let PredatorPopulation = [];

function setup() {
    createCanvas(Width, CHeight);

    let init_fish = () => {
	let x = random(0, Width);
	let y = random(0, Height);
	let vx = random(-MaxVel, MaxVel);
	let vy = random(-MaxVel, MaxVel);
	return [x, y, vx, vy]
    };

    for(let i = 0; i < NPrey; i++) {
	PreyPopulation.push(init_fish());
    }

    for(let i = 0; i < NPredator; i++) {
	PredatorPopulation.push(init_fish());
    }
}

function draw() {
    fill(255);
    stroke(0,0,255);
    rect(0,0,Width, Height);

    fill(0);
    stroke(0);
    let npreys = PreyPopulation.length;
    let npredators = PredatorPopulation.length;
    text('Prey: ' + npreys + ' Predator: ' + npredators,
	 10, 10);
    drawPopulation(PreyPopulation, [0, 255, 0], 5);
    drawPopulation(PredatorPopulation, [255, 0, 0], 10);

    if(npreys == 0 && npredators == 0) {
	text("THE END", ((Width / 2) - 50), Height / 2);
    }

    translate(0, Height);
    fill(0);
    stroke(255);
    ellipse(npreys, npredators, 10, 10);

    step();
}

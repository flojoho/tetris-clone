
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

type Individual = {
  count: number
}

type Stats = {
  max: number,
  [key: number]: number
}

const fps = 10;

let n = 1;
const padding = 50;
const individuals: Individual[] = [];

setInterval(() => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for(const individual of individuals) {
    if(Math.random() > 0.5) individual.count++;
  }

  for(let i = 1; i <= 100; i++) {
    const newIndividual = {
      count: 0
    };
    for(let i = 1; i <= n; i++) {
      if(Math.random() > 0.5) newIndividual.count++;
    };
    individuals.push(newIndividual);
  }

  const stats: Stats = {
    max: 0
  };
  for(const individual of individuals) {
    if(stats[individual.count]) {
      stats[individual.count]++;
    } else {
      stats[individual.count] = 1;
    }

    if(stats.max < stats[individual.count]) {
      stats.max = stats[individual.count];
    }
  }

  for(let i = 1; i <= n; i++) {
    if(!stats[i]) continue;

    const drawingWidth = canvas.width - 2 * padding;
    const drawingHeight = canvas.height - 2 * padding;
    const barWidth = drawingWidth/n;
    const barHeight = stats[i]/stats.max * drawingHeight;
    
    ctx.fillStyle = 'white';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(
      padding + barWidth * (i - 1),
      padding + drawingHeight - barHeight,
      barWidth,
      barHeight
    );
    ctx.fill();
  }


  n++;
}, 1000/fps);

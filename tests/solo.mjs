import assert from 'node:assert/strict';import{SoloGame,COLORS}from'../solo-engine.mjs';
let g=new SoloGame();assert.equal(g.bricks.length,40);for(let r=0;r<4;r++)assert(g.bricks.slice(r*10,r*10+10).every(b=>b.color===COLORS[r]));assert.equal(g.cups.length,2);
for(let cup of g.cups){g.state='playing';g.ball={x:cup.x,y:cup.y-40,vx:0,vy:360};let before=g.drinks;g.update(.05);assert.equal(g.drinks,before+1);assert.equal(g.state,'ready');assert.equal(g.event.type,'drink')}
g=new SoloGame();g.state='playing';g.ball={x:35,y:233,vx:0,vy:-360};g.update(.07);assert.equal(g.hits,1);assert(g.ball.vy>0);assert.equal(g.bricks.filter(b=>b.alive).length,39);
g=new SoloGame();g.state='playing';g.ball={x:g.paddle,y:780,vx:0,vy:360};g.update(.05);assert(g.ball.vy<0);
g.ball={x:50,y:870,vx:0,vy:360};g.update(.05);assert.equal(g.misses,1);assert.equal(g.state,'ready');
g=new SoloGame();g.hits=39;g.bricks.forEach((b,i)=>b.alive=i===30);g.state='playing';g.ball={x:35,y:233,vx:0,vy:-360};g.update(.07);assert.equal(g.state,'over');assert.equal(g.event.type,'win');
console.log('Passed: 40 bricks, row colors, two cup penalties, brick removal, rebound, miss, wall clear.');

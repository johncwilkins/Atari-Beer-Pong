import assert from 'node:assert/strict';
import {Game} from '../engine.mjs';
for(let side=0;side<2;side++){
 let g=new Game();g.lastHit=1-side;g.cup(side);assert.equal(g.scores[1-side],1);assert.equal(g.server,side);
 g=new Game();g.lastHit=side;g.cup(side);assert.equal(g.scores[1-side],1);
 g=new Game();g.scores[1-side]=4;g.lastHit=side;g.cup(side);assert.equal(g.scores[1-side],4);assert.equal(g.event.type,'viner');assert.notEqual(g.state,'over');
 g.lastHit=1-side;g.cup(side);assert.equal(g.scores[1-side],5);assert.equal(g.winner,1-side);
 g=new Game();g.miss(side);assert.deepEqual(g.scores,[0,0]);assert.equal(g.server,side);
 g=new Game();g.state='playing';g.lastHit=side;g.ball={x:side===0?220:780,y:310,vx:side===0?600:-600,vy:0};g.update(.1);assert.equal(g.scores[1-side],1);assert.equal(g.state,'between');
}
let g=new Game();g.state='playing';g.ball={x:65,y:310,vx:-340,vy:0};g.update(.1);assert(g.ball.vx>0);assert.equal(g.lastHit,0);
g.move(-100);assert.equal(g.paddles[0],62);g.move(9999);assert.equal(g.paddles[0],558);
console.log('Passed: scoring, own-cup collision, Viner protection, legitimate winner, misses, paddle rebound, bounds.');
for(let server=0;server<2;server++)for(let owner=0;owner<2;owner++){
 let g=new Game();g.server=server;g.serve();g.cup(owner);assert.equal(g.scores[1-server],1,'Either cup on serve awards receiver');assert.equal(g.scores[server],0);
 g=new Game();g.server=server;g.scores[1-server]=4;g.serve();g.cup(owner);assert.equal(g.scores[1-server],4);assert.equal(g.event.type,'viner');assert.notEqual(g.state,'over');
}
let rally=new Game();rally.server=1;rally.serve();rally.ball={x:65,y:310,vx:-340,vy:0};rally.update(.1);assert.equal(rally.onServe,false);rally.scores[0]=4;rally.cup(1);assert.equal(rally.winner,0);
console.log('Passed: both servers, either serve cup, fifth-point protection, rally after return.');

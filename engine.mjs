export const W=1000,H=620;
export class Game {
 constructor(){this.speed=1;this.size=100;this.reset()}
 reset(){this.scores=[0,0];this.paddles=[310,310];this.state='ready';this.server=0;this.ball={x:47,y:310,vx:0,vy:0};this.lastHit=0;this.onServe=false;this.event=null;this.wait=0;this.aiClock=0;this.aiOffset=0;this.winner=null}
 serve(){if(this.state!=='ready')return;let angle=(Math.random()-.5)*.9;let dir=this.server===0?1:-1;this.ball={x:this.server===0?49:951,y:this.paddles[this.server],vx:dir*340*Math.cos(angle),vy:340*Math.sin(angle)};this.lastHit=this.server;this.onServe=true;this.state='playing';this.event={type:'serve'}}
 cup(owner){let self=this.lastHit===owner, serve=this.onServe, scorer=serve?1-this.server:1-owner;let viner=(self||serve)&&this.scores[scorer]===4;if(!viner)this.scores[scorer]++;this.event={type:viner?'viner':'point',owner,scorer,self,serve};this.server=owner;this.wait=1.4;this.state='between';if(this.scores[scorer]>=5){this.state='over';this.winner=scorer}}
 miss(side){this.event={type:'miss',side};this.server=side;this.wait=.85;this.state='between'}
 move(y){this.paddles[0]=Math.max(12+this.size/2,Math.min(H-12-this.size/2,y))}
 update(dt){if(this.state==='over'||this.state==='paused')return; if(this.state==='between'){this.wait-=dt;if(this.wait<=0){this.state='ready';this.wait=0}return}
 this.aiClock-=dt;if(this.aiClock<=0){this.aiClock=.16;this.aiOffset=(Math.random()-.5)*this.size*.8}
 let target=this.state==='ready'&&this.server===1?H*.3: this.ball.vx>0?this.ball.y+this.aiOffset:H/2;let step=290*dt;this.paddles[1]+=Math.max(-step,Math.min(step,target-this.paddles[1]));this.paddles[1]=Math.max(12+this.size/2,Math.min(H-12-this.size/2,this.paddles[1]));
 if(this.state==='ready'){this.ball.x=this.server===0?49:951;this.ball.y=this.paddles[this.server];if(this.server===1){this.wait+=dt;if(this.wait>1.1){this.wait=0;this.serve()}}return}
 let n=Math.max(1,Math.ceil(Math.hypot(this.ball.vx,this.ball.vy)*dt*this.speed/4)),d=dt*this.speed/n;
 for(let i=0;i<n&&this.state==='playing';i++){let b=this.ball,oldx=b.x;b.x+=b.vx*d;b.y+=b.vy*d;
 if(b.y<16){b.y=32-b.y;b.vy=Math.abs(b.vy);this.event={type:'wall'}}if(b.y>H-16){b.y=2*(H-16)-b.y;b.vy=-Math.abs(b.vy);this.event={type:'wall'}}
 for(let side=0;side<2;side++){let x=side===0?260:740;if(Math.abs(b.x-x)<25&&Math.abs(b.y-310)<33){this.cup(side);break}}
 if(this.state!=='playing')break;
 for(let side=0;side<2;side++){let x=side===0?41:959;let crossed=side===0?b.vx<0&&oldx>=x+6&&b.x<=x+6:b.vx>0&&oldx<=x-6&&b.x>=x-6;if(crossed&&Math.abs(b.y-this.paddles[side])<this.size/2+6){let off=Math.max(-1,Math.min(1,(b.y-this.paddles[side])/(this.size/2)));let angle=off*1.05,speed=Math.min(620,Math.hypot(b.vx,b.vy)*1.045);b.x=side===0?x+7:x-7;b.vx=(side===0?1:-1)*speed*Math.cos(angle);b.vy=speed*Math.sin(angle);this.lastHit=side;this.onServe=false;this.event={type:'paddle'}}}
 if(b.x< -10)this.miss(0);if(b.x>W+10)this.miss(1);
 }
 }
}

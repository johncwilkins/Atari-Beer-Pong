export const SW=620,SH=860,COLORS=['#3689e9','#efce43','#df4f48','#4fba68'];
export class SoloGame{
 constructor(){this.speed=1;this.size=100;this.reset()}
 reset(){this.paddle=SW/2;this.ball={x:this.paddle,y:786,vx:0,vy:0};this.state='ready';this.hits=0;this.drinks=0;this.misses=0;this.event=null;this.cups=[{x:205,y:435},{x:415,y:515}];this.bricks=[];for(let r=0;r<4;r++)for(let col=0;col<10;col++)this.bricks.push({x:18+col*59,y:100+r*28,w:53,h:21,color:COLORS[r],alive:true})}
 move(x){this.paddle=Math.max(12+this.size/2,Math.min(SW-12-this.size/2,x));if(this.state==='ready'){this.ball.x=this.paddle;this.ball.y=786}}
 serve(){if(this.state!=='ready')return;let a=(Math.random()-.5)*.7;this.ball={x:this.paddle,y:786,vx:360*Math.sin(a),vy:-360*Math.cos(a)};this.state='playing';this.event={type:'serve'}}
 update(dt){if(this.state!=='playing')return;let b=this.ball,n=Math.max(1,Math.ceil(Math.hypot(b.vx,b.vy)*dt*this.speed/4)),d=dt*this.speed/n;
 for(let i=0;i<n&&this.state==='playing';i++){let ox=b.x,oy=b.y;b.x+=b.vx*d;b.y+=b.vy*d;
 if(b.x<16){b.x=32-b.x;b.vx=Math.abs(b.vx);this.event={type:'wall'}}if(b.x>SW-16){b.x=2*(SW-16)-b.x;b.vx=-Math.abs(b.vx);this.event={type:'wall'}}if(b.y<16){b.y=32-b.y;b.vy=Math.abs(b.vy);this.event={type:'wall'}}
 for(const cup of this.cups)if(Math.abs(b.x-cup.x)<25&&Math.abs(b.y-cup.y)<33){this.drinks++;this.state='ready';this.move(this.paddle);this.event={type:'drink'};break}if(this.state!=='playing')break;
 for(const brick of this.bricks){if(!brick.alive||b.x+5<brick.x||b.x-5>brick.x+brick.w||b.y+5<brick.y||b.y-5>brick.y+brick.h)continue;brick.alive=false;this.hits++;if(oy+5<=brick.y||oy-5>=brick.y+brick.h)b.vy=-b.vy;else b.vx=-b.vx;b.x=ox;b.y=oy;this.event={type:'brick'};if(this.hits===40){this.state='over';this.event={type:'win'}}break}
 if(b.vy>0&&oy<=791&&b.y>=791&&Math.abs(b.x-this.paddle)<this.size/2+5){let off=Math.max(-1,Math.min(1,(b.x-this.paddle)/(this.size/2))),a=off*1.05,v=Math.min(590,Math.hypot(b.vx,b.vy)*1.015);b.y=790;b.vx=Math.sin(a)*v;b.vy=-Math.cos(a)*v;this.event={type:'paddle'}}
 if(b.y>SH+10){this.misses++;this.state='ready';this.move(this.paddle);this.event={type:'miss'}}
 }
 }
}

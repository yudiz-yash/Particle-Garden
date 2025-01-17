uniform sampler2D uTexture;
uniform float uNbColumns;
varying vec2 vTextureCoord;
uniform float uNbLines;
uniform float uProgress;

float circle(vec2 uv,float border){
  float radius=.5;
  float dist=radius-distance(uv,vec2(.5));
  return smoothstep(0.,radius,dist);
}

void main(){
  
  vec2 uv=gl_PointCoord;
  uv.y*=-1.;
  
  uv/=vec2(uNbColumns,uNbLines);
  
  float texOffsetU=vTextureCoord.x/uNbColumns;
  
  float texOffsetV=vTextureCoord.y/uNbLines;
  
  uv+=vec2(texOffsetU,texOffsetV);
  
  uv+=vec2(.5);
  
  vec4 texture=texture2D(uTexture,uv);
  gl_FragColor=texture;
  if(gl_FragColor.r < 0.1){
    discard;
  }
  gl_FragColor.a*=circle(gl_PointCoord,1.);
  gl_FragColor.a*=uProgress;
}
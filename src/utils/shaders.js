const devicePixelRatio = 1;

export const vertexShader = (duration) => {
  return `
  attribute vec3 aColor;
  attribute float aAlpha;
  attribute vec3 aPosition;
  attribute vec3 aPositionStart;
  attribute vec3 aControlPointOne;  
  attribute vec3 aControlPointTwo;  
  attribute vec3 aPositionEnd;
  attribute float aOffset;

  uniform float uProgress;
  uniform mat4 uProjectionMatrix;
  uniform mat4 uModelMatrix;
  uniform mat4 uViewMatrix;

  varying vec3 vColor;
  varying float vAlpha;
  
  vec3 bezier4(vec3 a, vec3 b, vec3 c, vec3 d, float t) {
    return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);
  }

  float easeInOutQuint(float t){
    return t < 0.5 ? 16.0 * t * t * t * t * t : 1.0 + 16.0 * (--t) * t * t * t * t;
  }
  
  float easeInQuint(float t){
    return t * t * t * t;
  }

  void main() {
    float tProgress = easeInQuint(min(1.0, max(0.0, (uProgress - aOffset)) / ${duration}));
    vec3 newPosition = bezier4(aPositionStart, aControlPointOne, aControlPointTwo, aPositionEnd, tProgress);
    gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix * vec4(newPosition + aPosition, 1.0);
    gl_PointSize = mix(2.0/${devicePixelRatio.toFixed(1)}, 1.0/${devicePixelRatio.toFixed(1)}, tProgress);
    vColor = aColor;
    vAlpha = aAlpha;
  }
  `;
};

export const fragmentShader = () => {
  return `
  precision mediump float;

  varying vec3 vColor;
  varying float vAlpha;


  void main(){
    gl_FragColor = vec4(vColor, vAlpha);
  }
  `;
};

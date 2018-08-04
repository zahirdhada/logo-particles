import "babel-polyfill";
import Phenomenon from 'phenomenon';
import "./assets/styles/styles.scss";
import tlIcon from "./assets/images/tl-icon.png";
import tlLogo from "./assets/images/tl-logo.png";
import cfIcon from "./assets/images/cf-icon.png";
import cfLogo from "./assets/images/cf-logo.png";
import rgIcon from "./assets/images/rg-icon.png";
import rgLogo from "./assets/images/rg-logo.png";
import gaugesIcon from "./assets/images/gauges-icon.png";
import gaugesLogo from "./assets/images/gauges-logo.png";
import {fragmentShader, vertexShader} from './utils/shaders';
import {initAttributes} from './utils/utils';
import $ from 'jquery';

const ImageMap = {
  tlLogo,
  tlIcon,
  cfIcon,
  cfLogo,
  rgIcon,
  rgLogo,
  gaugesIcon,
  gaugesLogo,
};

// Every uniform must have:
// - Key (used in the shader)
// - Type (what kind of value)
// - Value (based on the type)
const uniforms = {
  uProgress: {
    type: 'float',
    value: 0.0,
  },
};

const canvas = document.getElementById('canvas');

// Create the renderer
const phenomenon = new Phenomenon({
  canvas: canvas,
  context: {
    Antialias: true,
  },
  settings: {
    clearColor: [239 / 255, 239 / 255, 239 / 255, 1],
    devicePixelRatio,
    position: {x: 0, y: 0, z: 3},
    shouldRender: true,
    uniforms,
  },
});
const changeImage = async (image) => {
  $('.change-image').prop('disabled', true);
  const imgUrl = ImageMap[image];
  const duration = 0.6;
  const { multiplier, attributes } = await initAttributes(imgUrl, duration, phenomenon);

  // Vertex shader used to calculate the position
  const vertex = vertexShader(duration);

  // Fragment shader to draw the colored pixels to the canvas
  const fragment = fragmentShader();

  phenomenon.remove('image');
  phenomenon.add('image', {
    attributes: attributes.map(a => Object.assign({}, a)),
    multiplier,
    uniforms,
    vertex,
    fragment,
    onRender: (instance) => {
      if (instance.uniforms.uProgress.value <= 1) {
        instance.uniforms.uProgress.value += 0.0166666667 / 6;
      }
    },
  });
  $('.change-image').prop('disabled', false);
};

$('.change-image').on('click', (e) => {
  phenomenon.uniforms.uProgress.value = 0;
  changeImage($(e.target).data('image'));
});

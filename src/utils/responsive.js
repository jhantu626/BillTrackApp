// utils/responsive.js
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const BASE_WIDTH = 402;
const SCALE = width / BASE_WIDTH;

export const font = size => size * SCALE;
export const padding = size => size * SCALE;
export const margin = size => size * SCALE;
export const icon = size => size * SCALE;
export const gap = size => size * SCALE;
export const scale = SCALE;

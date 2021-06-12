import { example } from './app';
import webpackLogo from './images/webpack-logo.svg';
import './styles/index.scss';

const logo: HTMLImageElement = document.createElement('img');
logo.src = webpackLogo;

const heading: HTMLHeadingElement = document.createElement('h1');
heading.textContent = example();

const app: HTMLElement | null = document.querySelector('#root');
app?.append(logo, heading);

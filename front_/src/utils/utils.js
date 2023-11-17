// 
import { keyframes } from '@emotion/react'

export const colors = {
    primary: '#FFFFFF',
    secondary: '#122547',
    tertiary: '#1F4385',
    dark: '#000000',
    background: '#F4F4F4',

    text_dark: '#000000',
    text_light: '#FFFFFF',
    text_blue: '#122547',
    text_light_blue: 'rgba(18, 37, 71, 0.6)',
};

export const radius = {
    small: '12px',
    medium: '25px',
    large: '30px',
}

export const fontSize = {
    mobileButton: '1.2em',
    mobileSubTitle: '1.4em',
    mobileTitle: '2.4em',

    button: '1.8em',
    subTitle: '2em',
    title: '3.6em',
}

const breakpointsMax = [499, 768, 999, 1630];    
export const mediaMax = breakpointsMax.map((bp) => `@media (max-width: ${bp}px)`);
const breakpointsMin = [500, 768, 1000, 1629];
export const mediaMin = breakpointsMin.map((bp) => `@media (min-width: ${bp}px)`);

export function scrollToTop() {
    window.scrollTo(0, 0);
}

export const bounce = keyframes`
    from, 20%, 53%, 80%, to {
        transform: translate3d(0,0,0);
    }

    40%, 43% {
        transform: translate3d(0, -20px, 0);
    }

    70% {
        transform: translate3d(0, -10px, 0);
    }

    90% {
        transform: translate3d(0,-4px,0);
    }
`

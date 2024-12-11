import { css } from 'styled-components';
import { colors } from './colors';

export const dark = css`
  ${colors}

  .ck.ck-powered-by > a > svg > path:nth-child(3) {
    fill: rgb(172, 156, 251);
  }
`;

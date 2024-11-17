import styled from 'styled-components';
import {
  IconButton,
  Box,
  Flex
} from '@strapi/design-system';

export const ExpandWrapper = styled(Flex)`
  // Background with 20% opacity
  background: ${({ theme }) => `${theme.colors.neutral800}1F`};
`;

export const LoaderBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
`;

export const CounterLoaderBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const ExpandIconButton = styled(IconButton)`
  position: absolute;
  bottom: 3.1rem;
  right: 1.2rem;
  z-index: 1;
`

export const CollapseIconButton = styled(IconButton)`
  position: absolute;
  bottom: 3.1rem;
  right: 1.2rem;
`

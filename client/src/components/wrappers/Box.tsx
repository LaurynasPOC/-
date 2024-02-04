import styled from "styled-components";

interface BoxProps {
  margin?: string | number;
  padding?: string | number;
  border?: string;
  textAlign?: string | number;
  borderRadius?: string;
  width?: string | number;
  height?: string | number;
  maxWidth?: string | number;
  gridRow?: string | number;
  position?: string;
  active?: number;
}

export const Box = styled.div<BoxProps>`
  margin: ${({ margin }) => margin || ""};
  padding: ${({ padding }) => padding || ""};
  border: ${({ border }) => border || ""};
  text-align: ${({ textAlign }) => textAlign || ""};
  border-radius: ${({ borderRadius }) => borderRadius || ""};
  position: ${({ position }) => position || ""};
  width: ${({ width }) => width || ""};
  height: ${({ height }) => height || ""};
  max-width: ${({ maxWidth }) => maxWidth || ""};
  grid-row: ${({ gridRow }) => gridRow || ""};
`;

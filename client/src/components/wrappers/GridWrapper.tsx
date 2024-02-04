import styled from "styled-components";
import { Box } from "./Box";
import { tablet, mobile, laptop } from "../../styles/breakpoints";

interface GridProps {
  col?: string | number;
  colExact?: string | number;
  gap?: string;
  alignItems?: string | number;
  justifyContent?: string | number;
  colXl?: string | number;
  colExactXl?: string | number;
  colL?: string | number;
  colExactL?: string | number;
  colSm?: string | number;
  colExactSm?: string | number;
}

export const GridWrapper = styled(Box)<GridProps>`
  display: grid;
  grid-template-columns: ${({ col, colExact }) =>
    colExact || (col ? `repeat(${col}, minmax(0, 1fr))` : "")};
  grid-gap: ${({ gap }) => gap || "20px"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  @media ${laptop} {
    grid-template-columns: ${({ colXl, colExactXl }) =>
      colExactXl || (colXl ? `repeat(${colXl}, minmax(0, 1fr))` : "")};
  }
  @media ${tablet} {
    grid-template-columns: ${({ colL, colExactL }) =>
      colExactL || (colL ? `repeat(${colL}, minmax(0, 1fr))` : "")};
  }
  @media ${mobile} {
    grid-template-columns: ${({ colSm, colExactSm }) =>
      colExactSm || (colSm ? `repeat(${colSm}, minmax(0, 1fr))` : "")};
  }
`;

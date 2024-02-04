import styled from "styled-components";
import { Box } from "./Box";

interface FlexProps {
  justifyContent?: string;
  alignItems?: string;
  gap?: string | number;
  flexDirection?: string;
  flexWrap?: string;
}

export const FlexWrapper = styled(Box)<FlexProps>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || ""};
  align-items: ${({ alignItems }) => alignItems || ""};
  gap: ${({ gap }) => gap || ""};
  flex-direction: ${({ flexDirection }) => flexDirection || ""};
  flex-wrap: ${({ flexWrap }) => flexWrap || ""};
`;

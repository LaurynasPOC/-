import styled from "styled-components";
import { tablet, laptop } from "../../styles/breakpoints";

interface ContainerProps {
  width?: string | number;
  padding?: string;
}

export const Container = styled.div<ContainerProps>`
  max-width: 1300px;
  padding: 40px;
  margin-left: auto;
  margin-right: auto;
  @media ${laptop} {
    padding: 30px;
  }
  @media ${tablet} {
    padding: 20px;
  }
`;

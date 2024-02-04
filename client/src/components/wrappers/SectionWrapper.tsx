import styled from "styled-components";
import { laptop, mobile, tablet } from "../../styles/breakpoints";

interface SectionProps {
  backgroundColor?: string;
}

export const SectionWrapper = styled.section<SectionProps>`
  height: 100%;
  position: "relative";
  padding: 100px 20px;
  background-color: ${({ backgroundColor }) => backgroundColor || ""};
  @media ${laptop} {
    padding: 80px 20px;
  }
  @media ${tablet} {
    padding: 50px 15px;
  }
  @media ${mobile} {
    padding: 30px 10px;
  }
`;

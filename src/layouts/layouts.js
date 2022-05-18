import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../constants/breakpoint";

const Wrapper = styled.div`
  margin: 0 auto;
  min-height: calc(100vh-206px);
  ${MEDIA_QUERY_SM} {
    min-height: calc(100vh-216px);
  }
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 30px;
  max-width: 960px;
  ${MEDIA_QUERY_SM} {
    padding: 20px 30px;
  }
`;

export { Wrapper, Container };

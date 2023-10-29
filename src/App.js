import FAQSection from "./components/FAQSection";
import TaxCalculator from "./components/taxCalculator";
import styled from "styled-components";

function App() {
  return (
    <Wrapper className="App">
      <TaxCalculator/>
      <FAQSection/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem 10rem;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5; 
  @media screen and (max-width: 980px){
    padding: 0 5rem;
  }

  @media screen and (max-width: 775px){
    padding: 0; 
  }

`;

export default App;

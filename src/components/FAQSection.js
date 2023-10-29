import React from 'react'
import styled from 'styled-components';
import FAQ from '../data/faq';

const FAQSection = () => {
  return (
    <Wrapper>
        <h1>Frequently Asked Questions</h1>
        {FAQ.map((item, index) => {
            return (
                <div className='inner-container' key={index}>
                    <h3>{index+1}. {item.question}</h3>
                    <pre>
                        <p>{item.answer}</p>
                    </pre>
                </div>
            )
        }
        )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 2rem 0;
  width: 100%;
  background-color: white; 

  h1 {
    font-size: 30px;
    font-weight: 700;
    line-height: 30px;
    padding: 0 2rem;
  }

  .inner-container {
    margin: 2rem 0;
    width: 100%;
    padding: 0 2rem;
    text-align: justify; 
  }

  pre{
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;  
    color: #3E424A;
    font-family: Inter;
  }

  h3 {
    font-size: 20px;
    font-weight: 700;
    line-height: 22px;
    margin: 1rem 0;
  }

  p {
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;  
    color: #3E424A;
  } 
`;

export default FAQSection;
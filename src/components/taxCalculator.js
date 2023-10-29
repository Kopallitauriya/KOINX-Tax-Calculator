import React, { useEffect } from 'react'
import styled from 'styled-components';
import taxRate from '../data/taxrate';
import check from '../assets/check.png';
import australia from '../assets/australia.png';
// import downarrow from '../assets/downarrow.png';
// import dropdown from '../assets/dropdown.png';


const TaxCalculator = () => {

    const [info, setInfo] = React.useState({
        financialYear: '',
        country: '',
        purchasePrice: 0,
        salePrice: 0,
        expenses: 0,
        investmentType: '',
        annualIncome: '0%',
    });

    const [tax, setTax] = React.useState({
        capitalGains: '',
        discount: '',
    });

    const [netCapitalGains, setNetCapitalGains] = React.useState(0);
    const [taxPayable, setTaxPayable] = React.useState(0);

    useEffect(() => {
        if(info.purchasePrice && info.salePrice && info.expenses){
            let capitalGains = info.salePrice - info.purchasePrice - info.expenses;
            if(capitalGains > 0) setTax({...tax, capitalGains: capitalGains, discount : capitalGains * 0.5});
            else setTax({...tax, capitalGains: capitalGains, discount : 0});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [info]);

    const shortTermHandler = (e) => {
        e.preventDefault();
        setInfo({...info, investmentType : 'short-term'});
        const btns = document.querySelectorAll('button');
        btns.forEach(btn => {
            btn.classList.remove('btn-active');
        })
        e.target.classList.add('btn-active');
        setNetCapitalGains(tax.capitalGains);

    };

    const longTermHandler = (e) => {
        e.preventDefault();
        setInfo({...info, investmentType : 'long-term'});
         const btns = document.querySelectorAll('button');
         btns.forEach(btn => {
             btn.classList.remove('btn-active');
         })
         e.target.classList.add('btn-active');
        setNetCapitalGains(tax.capitalGains > 0 ? tax.capitalGains - tax.discount : tax.capitalGains);
    }

    const optionHandler = (e) => {
        e.preventDefault();
        setInfo({...info, annualIncome : e.target.value});
        const taxRate = e.target.value;
        const taxRateArr = taxRate.split('+');
        console.log(taxRateArr);
        if(taxRateArr.length <= 1 || taxRateArr.capitalGains < 0){
            setTaxPayable(0);
        }else{
            const taxRate = parseFloat(taxRateArr[1].split('%'));
            console.log(taxRate);
            setTaxPayable((taxRate / 100) * netCapitalGains);
        }

    }
  return (
    <Wrapper>
        <h1>Free Crypto Tax Calculator Australia</h1>
        <div className='inner-container'>
            <div className='content-container'>
                <p className='row-label'>
                    Financial Year
                </p>
                <div className='input change-input'>
                    <select value={info.financialYear} onChange={(e) => {setInfo({...info, financialYear : e.target.value})}} className='row-select'>
                        <option value="FY 2023-24">FY 2023-24</option>
                    </select>
                </div>
           </div>
            <div className='content-container'>
                <p className='row-label'>
                    Country
                </p>
                <div className='input change-input'>
                    <select value={info.country} onChange={(e) => {setInfo({...info, country : e.target.value})}} className='row-select'>
                        <option value="Australia"><i src={australia} alt='australia'></i> Australia</option>
                    </select>
                </div>
            </div>
        </div>
        <div className='inner-container'>
            <span className='seperator'></span>
        </div>

        <div className='inner-container'>
            <div className='content-container'>
                <label>
                    Enter purchase price of Crypto
                </label>
                <div className='input'>
                    <span>$</span> <input value={info.purchasePrice} onChange={(e) => {setInfo({...info, purchasePrice : e.target.value})}}/>
                </div>
            </div>

            <div className='content-container'>
                <label>
                    Enter sale price of Crypto
                </label>
                <div className='input'>
                    <span>$</span> <input value={info.salePrice} onChange={(e) => {setInfo({...info, salePrice : e.target.value})}}/>
                </div>
            </div>
        </div>

        <div className='inner-container'>
            <div className='content-container'>
                <label>
                    Enter your expenses
                </label>
                <div className='input'>
                    <span>$</span> <input value={info.expenses} onChange={(e) => {setInfo({...info, expenses : e.target.value})}}/>
                </div>
            </div>

            <div className='content-container'>
                <label>
                    Investment type
                </label>
                <div className='btn-container'>
                    <div className='btn-groups'>
                        <button onClick={shortTermHandler}>Short term  { info.investmentType === 'short-term' ? <img src={check} alt='img'/> : ""}</button>
                        <p> &#10094; 12 months</p>
                    </div>
                    <div className='btn-groups'>
                        <button onClick={longTermHandler}>Long term { info.investmentType === 'long-term' ? <img src={check} alt='img'/> : ""}</button>
                        <p> &#10095; 12 months</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='inner-container'>
            <div className='content-container'>
                <label>
                    Select your annual income
                </label>
                <select value={info.annualIncome} onChange={optionHandler} required>
                {
                    taxRate.map((item, index) => {
                        return (
                            <option key={index} value={item.rate}>{item.bracket} </option>
                            )
                        })
                    }
                </select>
            </div>

            <div className='content-container'>
                <p className='tax-rate'>
                    Tax Rate <br/> {info.annualIncome}
                </p>
            </div>
        </div>

        {info.investmentType === 'long-term' ? <div className='inner-container'>
            <div className='content-container'>
                <label>
                    Capital gains amount
                </label>
                <div className='input'>
                    <span>$</span> <input value={tax.capitalGains}/>
                </div>
            </div>

            <div className='content-container'>
                <label>
                    Discount for long term gains
                </label>
                <div className='input'>
                    <span>$</span> <input value={tax.discount}/>
                </div>
            </div>
        </div> : ""}

        <div className='inner-container'>
            <div className='content-container final-tax'>
                <p >Net capital gains amount</p >
                <h3 className='tax-gain'>$ {netCapitalGains}</h3>
            </div>
            <div className='content-container final-tax'>
                <p> The tax you need to pay*</p>
                <h3 className='tax-amount'>$ {taxPayable}</h3>
            </div>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.section` 
    width: 100%;
    height: 100%;
    background-color: white;
    margin-bottom: 2rem;
    h1{
        text-align: center;
        font-size: 36px;
        font-weight: 700;
        line-height: 42px;
        letter-spacing: 0em;
        color: #333;
        padding: 2rem;

    }
    .inner-container{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        margin: 2rem 0;
        padding: 0 10rem;
    }

    .content-container{
        width:340px;
        min-width: 340px;
        height: auto;
        display: flex;
        justify-content: flex-start;
        align-items: Center;
        flex-wrap: wrap;
    }
    label {
        width: 100%;
        font-size: 15px;
        font-weight: 400;
        line-height: 24px;
    }
    select, input {
        appearance: none;
        width: 80%;
        height: 48px;
        background: #EFF2F5;
        outline:  none;
        border: none;
        font-family: Inter;
        font-size: 18px;
        font-weight: 500;
        line-height: 22px;
        border-radius: 5px;
        
    }
    
    .input {
        width: 100%;
        height: 48px;
        background: #EFF2F5;
        border-radius: 5px;
    }

    .input > span{
        margin: 0 1rem;
    }

    select {
        padding: 0 2rem;
        width:100%;
    }
    option {
        height: 48px;
        width: 100%;
    }

    .row-label{
        width: 40%;
    }

    .row-select{
        width: 90%;
        margin-left: 0.5rem;
    }

    .change-input{
        width: 60%;
    }
    .btn-container{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 2rem;
    }

    .btn-groups{
        width: 162.5px;
        height: 56px;
    }

    .btn-groups > button{
        width: 160px;
        height: 54px;
        padding: 24px, 12px, 24px, 12px;
        border-radius: 8px;
        border: 1px;
        justify: space-between;
        angle: -0 deg;
        font-family: Inter;
        font-size: 18px;
        font-weight: 500;
        line-height: 22px;
    }

    .btn-groups > button > img{
        width: 23.33px
        height: 17.88px
        margin-left: 1rem;
    }

    .btn-active{
        color: #0141CF;
        border: 2px solid #0141CF;
        outline: 2px solid #0141CF;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        // padding: 0 1rem;
    }

    .tax-rate{
       margin-top: 1.5rem;
    }

    .final-tax{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #EBF9F4;
        height: 97px;
        margin-bottom: 2rem;
    }

    .final-tax > p{
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 0.5rem;
    }

    .final-tax > h3{
        font-size: 24px;
        font-weight: 700;
        line-height: 29px;
    }

    .tax-gain{
        color: #0FBA83;
    }

    .tax-amount{
        color: #0141CF;
    }

    @media screen and (max-width: 1345px){

        .row-select {
            width: 100%;
            height: 48px;
        }

        .content-container{
            width: 100%;
            margin-bottom: 1rem;
        }   
    }
    @media screen and (max-width: 980px){
        .row-select {
            width: 100%;
            height: 48px;
        }

        .content-container{
            width: 100%;
            margin-bottom: 1rem;
        }   
    }

    @media screen and (max-width: 670px){
        .inner-container{
            flex-direction: column;
            margin-left: -9rem;
        }
        .input, select {
            width: 100%;
        }
        .input {
            flex-direction: column;
        }
    }

`; 

export default TaxCalculator;
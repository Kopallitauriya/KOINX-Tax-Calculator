

const taxRate = [
    {
        bracket: '$ 0 - $ 18,200',
        rate: '0%'
    },
    {
        bracket: '$ 18,201 - $ 45,000',
        rate: 'Nil + 19% of the excess over $ 18,200'
    },
    {
        bracket: '$ 45,001 - $ 120,000',
        rate: '$ 5,092 + 32.5% of the excess over $ 45,000'
    },
    {
        bracket: '$ 120,001 - $ 180,000',
        rate: '$ 29,467 + 37% of the excess over $ 120,000'
    },
    {
        bracket: '$ 180,001+',
        rate: '$ 51,667 + 45% of the excess over $ 180,000'
    }
]

export default taxRate;
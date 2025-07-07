import { useState } from 'react'
import { InputBox } from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {

  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('eur');
  const [toCurrency, setToCurrency] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const fromCurrencyInfo = useCurrencyInfo(fromCurrency);

  const options = Object.keys(fromCurrencyInfo);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * fromCurrencyInfo[toCurrency]);
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-shadow-amber-600">
      <div className="w-full text-center mb-6">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg tracking-wide">💱 Currency Converter</h1>
        <p className="text-lg text-white/80 mt-2">Convert currencies instantly with live rates</p>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl p-8 bg-white/30 backdrop-blur-lg border border-white/40">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-4">
              <InputBox
                label="From"
                amount={amount}
                onAmountChange={setAmount}
                currencyOptions={options}
                onCurrencyChange={setFromCurrency}
                selectCurrency={fromCurrency}
                amountDisabled={false}
              />
            </div>
            <div className="relative w-full flex justify-center my-4">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg border-2 border-white/60 hover:scale-110 transition-transform duration-200"
                onClick={swapCurrencies}
                title="Swap currencies"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17v1a3 3 0 003 3h10m4-4V7a3 3 0 00-3-3H7m-4 4v10a3 3 0 003 3h10" />
                </svg>
                Swap
              </button>
            </div>
            <div className="w-full mb-6">
              <InputBox
                label="To"
                amount={convertedAmount}
                onAmountChange={setConvertedAmount}
                currencyOptions={options}
                onCurrencyChange={setToCurrency}
                selectCurrency={toCurrency}
                amountDisabled={false}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:from-pink-500 hover:to-indigo-500 transition-all duration-200"
            >
              Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
            </button>
          </form>
        </div>
      </div>

      <footer className='w-full p-2 text-2xl text-center fixed bottom-3'>Copyright @Abhishek7552 2k25 </footer>
    </div>
  )
}

export default App;

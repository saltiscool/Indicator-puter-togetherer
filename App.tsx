
import React, { useState, useCallback } from 'react';
import { IndicatorInput } from './components/IndicatorInput';
import { CodeOutput } from './components/CodeOutput';
import { combineScripts } from './services/geminiService';
import { MergeIcon, SparklesIcon } from './components/icons';

const App: React.FC = () => {
  const [script1, setScript1] = useState('');
  const [script2, setScript2] = useState('');
  const [combinedScript, setCombinedScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCombine = useCallback(async () => {
    if (!script1 || !script2) {
      setError('Please provide both indicator scripts.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setCombinedScript('');

    try {
      const result = await combineScripts(script1, script2);
      setCombinedScript(result);
    } catch (e) {
      console.error(e);
      setError('Failed to combine scripts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [script1, script2]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-7xl text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-2">
          <MergeIcon className="h-10 w-10 text-emerald-400" />
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            Pine Script Puter togetherer
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Combine two TradingView indicators into one using Gemini AI. Nice for People on a free plan with limited indicator slots.

          Do not put any prompts in this thing, just the indicator code.
        </p>
      </header>

      <main className="w-full max-w-7xl flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <IndicatorInput
            title="Indicator 1"
            value={script1}
            onChange={(e) => setScript1(e.target.value)}
            placeholder={`//@version=6\nindicator("My RSI")\nplot(ta.rsi(close, 14))`}
          />
          <IndicatorInput
            title="Indicator 2"
            value={script2}
            onChange={(e) => setScript2(e.target.value)}
            placeholder={`//@version=6\nindicator("My MACD")\n[macdLine, signalLine, _] = ta.macd(close, 12, 26, 9)\nplot(macdLine)\nplot(signalLine)`}
          />
        </div>

        <div className="flex flex-col items-center justify-center mb-6">
          <button
            onClick={handleCombine}
            disabled={isLoading || !script1 || !script2}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
          >
            {isLoading ? (
              'Fusing Scripts...'
            ) : (
              <>
                <SparklesIcon className="h-5 w-5" />
                Run
              </>
            )}
          </button>
          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        </div>

        <CodeOutput code={combinedScript} isLoading={isLoading} />
      </main>

       <footer className="w-full max-w-7xl text-center mt-8 text-gray-500 text-sm">
        <p>Generated scripts are not guaranteed to be error-free. I recommend testing in the Pine Editor.</p>
      </footer>
    </div>
  );
};

export default App;
   

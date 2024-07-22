import React, { useState, useEffect } from 'react';

const PlayerPane = ({ playerWallet, operator, kamis, ghostGumsUsed, setGhostGumsUsed }) => {
  const [estimatedUsage, setEstimatedUsage] = useState(0);
  const [ghostGums, setGhostGums] = useState(0);

  useEffect(() => {
    const calculateEstimatedUsage = () => {
      const usage = kamis.reduce((total, kami) => {
        if (kami.isRunning) {
          return total + (3600 / kami.interval);
        }
        return total;
      }, 0);
      setEstimatedUsage(usage);
    };

    calculateEstimatedUsage();
  }, [kamis]);


  return (
    <div className="bg-gradient-to-br from-purple-800 to-indigo-900 rounded-2xl shadow-2xl p-8 mb-8 text-white border-4 border-purple-400 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-purple-stars opacity-20"></div>
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-200 tracking-wide">
          🎮 Player Dashboard 🍬
        </h2>
        <div className="space-y-5">
          <div className="bg-purple-700 bg-opacity-50 rounded-lg p-4 backdrop-filter backdrop-blur-sm">
            <p className="text-lg"><strong className="text-purple-300">Player Wallet:</strong> <span className="font-mono">{playerWallet || 'Not connected'}</span></p>
          </div>
          <div className="bg-purple-700 bg-opacity-50 rounded-lg p-4 backdrop-filter backdrop-blur-sm">
            <p className="text-lg"><strong className="text-purple-300">Operator Address:</strong> <span className="font-mono">{operator || 'Not connected'}</span></p>
          </div>
          {/* <div className="bg-purple-700 bg-opacity-50 rounded-lg p-4 backdrop-filter backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <label htmlFor="ghostGums" className="text-lg text-purple-300">🍫 Enter Held Ghost Gums:</label>
              <input
                type="number"
                id="ghostGums"
                value={ghostGums}
                onChange={(e) => setGhostGums(Math.max(0, parseInt(e.target.value) || 0))}
                className="px-4 py-2 text-purple-900 bg-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
                min="0"
              />
            </div>
          </div> */}

          {/* <div className="bg-purple-700 bg-opacity-50 rounded-lg p-4 backdrop-filter backdrop-blur-sm">
            <p className="text-lg">
              <strong className="text-purple-300">Remaining Ghost Gums:</strong> 
              <span className="text-2xl font-bold ml-2 text-purple-200">{Math.max(0, ghostGums - ghostGumsUsed)}</span>
            </p>
          </div> */}
          <div className="bg-purple-700 bg-opacity-50 rounded-lg p-4 backdrop-filter backdrop-blur-sm">
            <p className="text-lg">
              <strong className="text-purple-300">Hourly 🍫 Usage:</strong> 
              <span className="text-2xl font-bold ml-2 text-purple-200">{estimatedUsage.toFixed(1)}</span>
            </p>
            <p className="text-lg">
              <strong className="text-purple-300">Ghost Gums Used:</strong> 
              <span className="text-2xl font-bold ml-2 text-purple-200">{ghostGumsUsed}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPane;
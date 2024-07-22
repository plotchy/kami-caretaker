import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type Kami = {
  name: string;
  nickname: string;
  interval: number;
  timeLeft: number;
  isRunning: boolean;
};

type KamiCardComponentProps = {
  kami: Kami;
  index: number;
  updateKami: (index: number, key: string, value: any) => void;
  deleteKami: (index: number) => void;
  toggleKamiTimer: (index: number) => void;
  resetKamiTimer: (index: number) => void;
  testHealKami: (index: number) => void;
};

const KamiCard: React.FC<KamiCardComponentProps> = ({ kami, index, updateKami, deleteKami, toggleKamiTimer, resetKamiTimer, testHealKami }) => {
  const [showBanishConfirmation, setShowBanishConfirmation] = useState(false);
  const [showHealConfirmation, setShowHealConfirmation] = useState(false);
  const [isValidHex, setIsValidHex] = useState(true);
  const getEmojiForNickname = (nickname) => {
    const emojis = [
      '🌟', '🌈', '🌸', '🍄', '🦋', '🐉', '🦄', '🌊', '🌺', '🍀',
      '🔥', '💧', '🌪️', '🌻', '🌹', '🍃',
      '🌙', '⭐', '☀️', '⚡', '❄️', '🌊', '🌷', '🌋', '🪐', '🌼', '🌌', '🌠'
    ];
    return emojis[nickname.length % emojis.length];
  };

  const updateInterval = (hours, minutes, seconds) => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    updateKami(index, 'interval', totalSeconds);
  };

  const handleDeleteClick = () => {
    setShowBanishConfirmation(true);
  };

  const handleConfirmDelete = () => {
    deleteKami(index);
    setShowBanishConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowBanishConfirmation(false);
  };

  const handleHealClick = () => {
    setShowHealConfirmation(true);
  };

  const handleConfirmHeal = () => {
    testHealKami(index);
    setShowHealConfirmation(false);
  };

  const handleCancelHeal = () => {
    setShowHealConfirmation(false);
  };

  const validateHex = (value) => {
    const hexRegex = /^0x[0-9a-fA-F]{64}$/;
    return hexRegex.test(value);
  };

  useEffect(() => {
    setIsValidHex(validateHex(kami.name));
  }, [kami.name]);

  const handleNameChange = (e) => {
    const newValue = e.target.value;
    updateKami(index, 'name', newValue);
    setIsValidHex(validateHex(newValue));
  };

  return (
    // <div className="relative mt-6 p-6 border-2 border-blue-500 rounded-lg bg-blue-800 bg-opacity-55 shadow-lg transform transition-all duration-300 hover:scale-105">
    <div className="relative mt-6 p-6 border-2 border-blue-500 rounded-lg bg-blue-800 bg-opacity-55 shadow-lg">
      <button
        onClick={handleDeleteClick}
        className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-xl font-bold"
        title="Banish this Kami"
      >
        ✕
      </button>
      {/* Confirmation Modal */}
      {showBanishConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-900 p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-xl font-bold text-blue-200 mb-4">Are you sure?</h3>
            <p className="text-blue-300 mb-6">
              Banishing this Kami will remove it permanently. The digital code can be difficult to obtain, and you'll need to find it again to resummon this Kami.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Banish Kami
              </button>
            </div>
          </div>
        </div>
      )}
      {showHealConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-900 p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-xl font-bold text-blue-200 mb-4">Confirm Healing</h3>
            <p className="text-blue-300 mb-6">
              Are you sure you want to heal {kami.nickname || 'this Kami'} now? This action will use a Ghost Gum.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelHeal}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmHeal}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Confirm Heal
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="text-2xl font-bold text-blue-300 mb-4">
        {getEmojiForNickname(kami.nickname || kami.name)} {kami.nickname || 'Mysterious Kami'}
      </div>
      <label className="block text-sm font-medium text-blue-300">
        Kami's Digital Code 🔮
        <input
          type="text"
          value={kami.name}
          onChange={handleNameChange}
          placeholder="0x1234..."
          className={`mt-1 block w-full px-3 py-2 text-blue-800 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${
            isValidHex ? 'border-blue-500' : 'border-red-500'
          }`}
        />
      </label>
      {!isValidHex && (
        <p className="mt-1 text-sm text-red-500">
          Must be a 64 character hex string starting with 0x<br></br>
          {/* <Link href="/faq#digital-code">
            <a className="underline hover:text-red-400">
              Learn how to get the Digital Code
            </a>
          </Link> */}
          <Link href="/faq#digital-code" className="underline hover:text-red-400">
              Learn how to get the Digital Code
          </Link>
        </p>
      )}
      <label className="block text-sm font-medium text-blue-300 mt-4">
        Kami's Nickname 🏷️
        <input
          type="text"
          value={kami.nickname}
          onChange={(e) => updateKami(index, 'nickname', e.target.value)}
          placeholder="Give your Kami a name!"
          className="mt-1 block w-full px-3 py-2 text-blue-800 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </label>
      <div className="block text-sm font-medium text-blue-300 mt-4">
        Healing Interval ⏳
        <div className="flex items-center mt-1 space-x-2">
          <input
            type="number"
            min="0"
            max="23"
            value={Math.floor(kami.interval / 3600)}
            onChange={(e) => {
              const hours = parseInt(e.target.value) || 0;
              const minutes = Math.floor((kami.interval % 3600) / 60);
              const seconds = kami.interval % 60;
              updateInterval(hours, minutes, seconds);
            }}
            className="w-16 px-2 py-1 text-blue-800 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <span className="text-blue-300">h</span>
          <input
            type="number"
            min="0"
            max="59"
            value={Math.floor((kami.interval % 3600) / 60)}
            onChange={(e) => {
              const hours = Math.floor(kami.interval / 3600);
              const minutes = parseInt(e.target.value) || 0;
              const seconds = kami.interval % 60;
              updateInterval(hours, minutes, seconds);
            }}
            className="w-16 px-2 py-1 text-blue-800 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <span className="text-blue-300">m</span>
          <input
            type="number"
            min="0"
            max="59"
            value={kami.interval % 60}
            onChange={(e) => {
              const hours = Math.floor(kami.interval / 3600);
              const minutes = Math.floor((kami.interval % 3600) / 60);
              const seconds = parseInt(e.target.value) || 0;
              updateInterval(hours, minutes, seconds);
            }}
            className="w-16 px-2 py-1 text-blue-800 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <span className="text-blue-300">s</span>
        </div>
      </div>
      <div className="mt-6 bg-blue-900 bg-opacity-30 rounded-lg p-4 shadow-inner">
        <div className="text-lg font-semibold text-blue-300 mb-2">
          🕰️ Time until next healing ritual 🍫
        </div>
        <div className="text-3xl font-bold text-blue-200">
          {kami.timeLeft >= 3600 ? `${Math.floor(kami.timeLeft / 3600)}h ` : ''}
          {kami.timeLeft >= 60 ? `${Math.floor((kami.timeLeft % 3600) / 60)}m ` : ''}
          {`${kami.timeLeft % 60}s`}
        </div>
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => toggleKamiTimer(index)}
          // className={`w-full text-lg font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
            className={`w-full text-lg font-semibold py-3 px-6 rounded-full shadow-lg ${
            kami.isRunning
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'
              : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
          } text-white ${!isValidHex ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isValidHex}
        >
          {kami.isRunning ? '🛑 Pause Timer' : '▶️ Start Timer'}
        </button>
        <button
          onClick={() => resetKamiTimer(index)}
          className={`bg-blue-500 hover:bg-blue-600 rounded-full w-24 h-16 flex items-center justify-center ${
            !isValidHex ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Reset Timer"
          disabled={!isValidHex}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="mt-4">
        <button
          onClick={handleHealClick}
          className={`w-full text-lg font-semibold py-3 px-6 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transition duration-300 ease-in-out transform hover:scale-105 ${
            !isValidHex ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!isValidHex}
        >
          🍬 Send Heal Now (Test)
        </button>
      </div>
    </div>
  );
};

export default KamiCard;
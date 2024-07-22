import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from "next/head";
import Image from 'next/future/image'

const FAQPage = () => {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleInputChange = (e) => {
    setInputCode(e.target.value);
  };

  const processCode = () => {
    if (inputCode.length >= 74) {
      const extractedCode = inputCode.slice(10, 74);
      setOutputCode(`0x${extractedCode}`);
    } else {
      setOutputCode('Input is too short');
    }
  };




  return (
    <>
      <Head>
        <title>Kami Caretaker: FAQ</title>
      </Head>
      {
          <header className="container mx-auto flex justify-end items-center mb-8">
            <div className="flex gap-1">
              <Link href="/">
                <a className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                  Home 🏠
                </a>
              </Link>
            </div>
          </header>
        }
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Frequently Asked Questions
          </h1>

        
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 space-y-12">
          {/* */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-blue-300" id="site-purpose">
              What does this site do?
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              This site helps you heal up your Kamis while you're away. You can add your kamis and set timers to feed them, and this site will automatically feed them for you.
            </p>
          </div>

          {/* */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-blue-300" id="site-purpose">
              Tips for using this site
            </h2>
            <div className="text-lg text-gray-300 mb-4">
              <p>This site relies on your computer to be:</p>
              <ul className="list-disc list-inside mt-4 space-y-3 text-gray-300">
                <li>🔋 On</li>
                <li>🙇‍♂️ Awake</li>
                <li>📡 Connected to the internet</li>
              </ul>
              <p>Plug in your computer and adjust display and power settings to prevent it from sleeping.</p>
            </div>
          </div>

          {/* */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-blue-300" id="digital-code">
              How do I get a Kami's Digital Code? 🔮
            </h2>
              <p className="text-lg text-gray-300 mb-4">
                A Kami's Digital Code is the unique identifier that represents the kami onchain. Here's how to obtain and format it correctly:
              </p>
              <ol className="list-decimal list-inside mt-4 space-y-3 text-gray-300">
                <li className="pl-2">Feed one of your Kamis a Maple Ghost Gum 🍫</li>
                <li className="pl-2">View the feeding transaction on the explorer</li>
                {/* <img src="/images/viewFeedTx.png" alt="View Feed Transaction" className="w-full h-auto" /> */}
                <Image src="/images/viewFeedTx.png" alt="View Feed Transaction" width={500} height={200} />
                <li className="pl-2">Click on View Details of the transaction</li>
                {/* <img src="/images/feedTx1.png" alt="Feed Transaction Details" className="w-full h-auto" /> */}
                <Image src="/images/feedTx1.png" alt="Feed Transaction Details" width={500} height={400} />
                <li className="pl-2">Copy the Raw Input field</li>
                {/* <img src="/images/feedTx2.png" alt="Feed Transaction Input" className="w-full h-auto" /> */}
                <Image src="/images/feedTx2.png" alt="Feed Transaction Input" width={500} height={240} />
                <li className="pl-2">Put the raw input in the Digital Code Helper below</li>
              </ol>
              <p className="mt-4 text-lg text-gray-300">
                The final result should be a 66-character string starting with "0x" followed by 64 hexadecimal characters (0-9 and a-f).
              </p>
              <div className="mt-4 p-4 bg-blue-900/50 rounded-lg">
                <p className="text-lg font-mono text-blue-300 break-all">
                  Example: 0xf74306293486beb6d46bec0113f794c2d42edbd80a8e37405fb3b5f1a970d16f
                </p>
              </div>
            </div>
            
            <div>
            <h2 className="text-3xl font-bold mb-4 text-blue-300" id="digital-code-helper">
              Digital Code Helper 🧙‍♂️
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              Use this tool to extract the Kami's Digital Code from the feed transaction raw input:
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  value={inputCode}
                  onChange={handleInputChange}
                  placeholder="Paste your raw input here..."
                  className="w-full px-4 py-2 bg-blue-900/50 border border-blue-400 rounded-md text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!isClient}
                />
                <button
                  onClick={processCode}
                  className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold transition duration-150 ease-in-out"
                  disabled={!isClient}
                >
                  Extract Kami Digital Code
                </button>
                {outputCode && (
                  <div className="mt-4 p-4 bg-blue-900/50 rounded-lg">
                    <p className="text-lg font-semibold text-blue-300 mb-2">Extracted Kami Digital Code:</p>
                    <p className="font-mono text-blue-200 break-all">{outputCode}</p>
                  </div>
                )}
              </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default FAQPage;
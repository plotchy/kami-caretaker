import React, { useState, useEffect, ChangeEvent } from 'react';
import Link from 'next/link';
import Head from "next/head";
import Image from 'next/image';

const FAQPage: React.FC = () => {
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [isClient, setIsClient] = useState<boolean>(false);
  const [expandedTab, setExpandedTab] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const toggleTab = (tab: string) => {
    setExpandedTab(expandedTab === tab ? null : tab);
  };

  return (
    <>
      <Head>
        <title>Kami Caretaker: FAQ</title>
      </Head>
      {
          <header className="container mx-auto flex justify-end items-center mb-8">
            <div className="flex gap-1">
              <Link href="/" className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                  Home 🏠
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
              <p>To make sure this site works properly, your computer needs to be:</p>
              <ul className="list-disc list-inside mt-4 space-y-3 text-gray-300">
                <li>🔋 Turned on</li>
                <li>🙇‍♂️ Awake (not in sleep mode)</li>
                <li>📡 Connected to the internet</li>
                <li>🏃 With this browser tab active</li>
              </ul>
              <p>Keep your computer plugged in and adjust its settings to prevent it from going to sleep.</p>
              <br></br>
              <p>Also, keep this browser tab open and active. To help with this, you can stop Google Chrome from slowing down in the background:</p>
              <div className="mt-4 space-y-4">
                <h3 className="text-2xl font-semibold text-blue-300">How to Keep Google Chrome Active</h3>
                <p>Follow these steps to open Google Chrome in a way that keeps it active, on Windows, macOS, and Linux.</p>
                <div>
                  <button onClick={() => toggleTab('windows')} className="text-xl font-semibold text-blue-300">
                    Windows {expandedTab === 'windows' ? '▲' : '▼'}
                  </button>
                  {expandedTab === 'windows' && (
                    <ol className="list-decimal list-inside space-y-2 pl-4">
                      <li>Open Command Prompt:
                        <ul className="list-disc list-inside pl-4">
                          <li>Press <code className="bg-gray-100 text-pink-600 px-1 rounded">Win + R</code> to open the Run dialog.</li>
                          <li>Type <code className="bg-gray-100 text-pink-600 px-1 rounded">cmd</code> and press <code className="bg-gray-100 text-pink-600 px-1 rounded">Enter</code> to open the Command Prompt.</li>
                        </ul>
                      </li>
                      <li>Run the Command:
                        <ul className="list-disc list-inside pl-4">
                          <li>Copy and paste the following command into the Command Prompt:</li>
                          <li><code className="bg-gray-100 text-pink-600 px-1 rounded">start chrome --disable-background-timer-throttling --new-window</code></li>
                          <li>Press <code className="bg-gray-100 text-pink-600 px-1 rounded">Enter</code> to execute the command. This will open a new instance of Google Chrome with background timer throttling disabled.</li>
                        </ul>
                      </li>
                    </ol>
                  )}
                </div>

                <div>
                  <button onClick={() => toggleTab('macos')} className="text-xl font-semibold text-blue-300">
                    macOS {expandedTab === 'macos' ? '▲' : '▼'}
                  </button>
                  {expandedTab === 'macos' && (
                    <ol className="list-decimal list-inside space-y-2 pl-4">
                      <li>Open Terminal:
                        <ul className="list-disc list-inside pl-4">
                          <li>Open Spotlight by pressing <code className="bg-gray-100 text-pink-600 px-1 rounded">Cmd + Space</code>.</li>
                          <li>Type <code className="bg-gray-100 text-pink-600 px-1 rounded">Terminal</code> and press <code className="bg-gray-100 text-pink-600 px-1 rounded">Enter</code> to open it.</li>
                        </ul>
                      </li>
                      <li>Run the Command:
                        <ul className="list-disc list-inside pl-4">
                          <li>Type the following command in the Terminal:</li>
                          <li><code className="bg-gray-100 text-pink-600 px-1 rounded">open -na "Google Chrome" --args --disable-background-timer-throttling</code></li>
                          <li>Press <code className="bg-gray-100 text-pink-600 px-1 rounded">Enter</code> to execute the command. This opens a new instance of Google Chrome with the specified argument.</li>
                        </ul>
                      </li>
                    </ol>
                  )}
                </div>

                <div>
                  <button onClick={() => toggleTab('linux')} className="text-xl font-semibold text-blue-300">
                    Linux {expandedTab === 'linux' ? '▲' : '▼'}
                  </button>
                  {expandedTab === 'linux' && (
                    <ol className="list-decimal list-inside space-y-2 pl-4">
                      <li>Open Terminal:
                        <ul className="list-disc list-inside pl-4">
                          <li>Press <code className="bg-gray-100 text-pink-600 px-1 rounded">Ctrl + Alt + T</code> to open the Terminal, or search for "Terminal" in your application menu.</li>
                        </ul>
                      </li>
                      <li>Run the Command:
                        <ul className="list-disc list-inside pl-4">
                          <li>Enter the following command in the Terminal:</li>
                          <li><code className="bg-gray-100 text-pink-600 px-1 rounded">google-chrome --disable-background-timer-throttling --new-window</code></li>
                          <li>Press <code className="bg-gray-100 text-pink-600 px-1 rounded">Enter</code> to execute the command. This will launch a new window of Google Chrome with background timer throttling disabled.</li>
                        </ul>
                      </li>
                    </ol>
                  )}
                </div>
              </div>
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
                <Image src="/images/viewFeedTx.png" alt="View Feed Transaction" width={500} height={200} />
                <li className="pl-2">Click on View Details of the transaction</li>
                <Image src="/images/feedTx1.png" alt="Feed Transaction Details" width={500} height={400} />
                <li className="pl-2">Copy the Raw Input field</li>
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
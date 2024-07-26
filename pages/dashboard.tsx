import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { getAccessToken, usePrivy } from "@privy-io/react-auth";
import Head from "next/head";
import KamiCard from "../components/KamiCard";
import PlayerPane from "../components/PlayerPane";
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useTitle } from 'react-use';

async function verifyToken() {
  const url = "/api/verify";
  const accessToken = await getAccessToken();
  const result = await fetch(url, {
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined),
    },
  });

  return await result.json();
}

export default function DashboardPage() {
  const [kamis, setKamis] = useState([]);
  const [ghostGumsUsed, setGhostGumsUsed] = useState(0);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [originalTitle] = useState("Kami Caretaker");
  const router = useRouter();
  const {
    ready,
    authenticated,
    user,
    logout,
    sendTransaction,
  } = usePrivy();

  const timerRefs = useRef([]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);


  useTitle(isTabVisible ? originalTitle : "YOUR KAMIS ARE DYING!");


  useEffect(() => {
    console.log('Dash Authentication state:', { ready, authenticated, cookies: document.cookie });
  }, [ready, authenticated]);

  useEffect(() => {
    if (ready && !authenticated) {
      console.log('dash not authenticated, redirecting to /');
      router.push("/");
    } else if (ready && authenticated) {
      // Load kamis from localStorage
      const savedKamis = localStorage.getItem('kamis');
      if (savedKamis) {
        setKamis(JSON.parse(savedKamis));
      }
    }
  }, [ready, authenticated, router]);

  useEffect(() => {
    // Save kamis to localStorage whenever they change
    if (kamis.length > 0) {
      localStorage.setItem('kamis', JSON.stringify(kamis));
    }
  }, [kamis]);

  const wallet = user?.wallet;
  const operator = wallet?.address;
  const playerWallet = user?.linkedAccounts?.find(account => account.address !== operator)?.address;

  const refreshToken = useCallback(async () => {
    try {
      const result = await verifyToken();
      console.log('Token refreshed');
      return result;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      return null;
    }
  }, []);

  const addKami = () => {
    setKamis([...kamis, { 
      name: '', 
      nickname: '', 
      interval: 3600, // 1 hour default
      timeLeft: 3600, 
      isRunning: false 
    }]);
  };

  const updateKami = (index, key, value) => {
    setKamis(prevKamis => {
      const newKamis = [...prevKamis];
      newKamis[index][key] = value;
      
      if (key === 'interval') {
        newKamis[index].timeLeft = value;
        
        // Stop the timer if it's running
        if (newKamis[index].isRunning) {
          newKamis[index].isRunning = false;
          clearInterval(timerRefs.current[index]);
        }
      }
      
      return newKamis;
    });
  };

  const deleteKami = (index) => {
    const newKamis = kamis.filter((_, i) => i !== index);
    setKamis(newKamis);
  };

  const toggleKamiTimer = (index) => {
    const newKamis = [...kamis];
    newKamis[index].isRunning = !newKamis[index].isRunning;
    setKamis(newKamis);

    if (newKamis[index].isRunning) {
      startKamiTimer(index);
    } else {
      clearInterval(timerRefs.current[index]);
    }
  };

  const startKamiTimer = (index) => {
    clearInterval(timerRefs.current[index]);
    timerRefs.current[index] = setInterval(() => {
      setKamis(prevKamis => {
        const newKamis = [...prevKamis];
        if (newKamis[index].timeLeft > 0) {
          newKamis[index].timeLeft -= 1;
        } else {
          healKami(index);
          newKamis[index].timeLeft = newKamis[index].interval;
        }
        return newKamis;
      });
    }, 1000);
  };
  
  const resetKamiTimer = (index) => {
    setKamis(prevKamis => {
      const newKamis = [...prevKamis];
      newKamis[index].timeLeft = newKamis[index].interval;
      return newKamis;
    });
  };

  const MAX_HEAL_RETRIES = 3;
  const INITIAL_RETRY_DELAY = 100; // 0.1 second

  const healKami = useCallback(async (index) => {
    console.log(`Healing Kami: ${kamis[index].nickname}`);
    
    // Verify and refresh the token
    const tokenResult = await refreshToken();
    if (!tokenResult) {
      console.error('Failed to refresh token. Aborting heal attempt.');
      return;
    }
    console.log(`heal has refreshed token`);
  
    let kami_id = kamis[index].name.replace(/^0x/, '');
    kami_id = kami_id.padStart(64, '0');
    
    const transactionRequest = {
      from: operator,
      to: '0xc5614ebc7C0F9d286ed8005CB1e5cb8334B45c4d',
      data: '0xe60f3a76' + kami_id + '0000000000000000000000000000000000000000000000000000000000000065',
      value: '0x0',
      chainId: 5264468217
    };
  
    let retries = 0;
    let success = false;
  
    while (retries < MAX_HEAL_RETRIES && !success) {
      try {
        console.log(`attempting to heal ${kamis[index].nickname}`);

        const txHash = await sendTransaction(transactionRequest);
        console.log(`Transaction sent: ${txHash}`);
        
        setGhostGumsUsed(prev => prev + 1);
        
        const timestamp = new Date().toLocaleString();
        toast.success(`Healed ${kamis[index].nickname} at ${timestamp}!`, {
          position: "bottom-right",
          autoClose: false,
          closeOnClick: true,
          draggable: false,
        });
  
        success = true;
      } catch (error) {
        console.error(`Attempt ${retries + 1} failed to heal ${kamis[index].nickname}:`, error);
        
        retries++;
        
        if (retries < MAX_HEAL_RETRIES) {
          const delay = INITIAL_RETRY_DELAY * Math.pow(2, retries - 1);
          console.log(`Retrying in ${delay / 1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          
          // Refresh token before retrying
          const refreshResult = await refreshToken();
          if (!refreshResult) {
            console.error('Failed to refresh token. Aborting heal retry.');
            break;
          }
        } else {
          const timestamp = new Date().toLocaleString();
          let message = "Unknown error";
          try {
            const reason = JSON.parse(error?.error?.body || "{}");
            message = reason?.error?.message || message;
          } catch (parseError) {
            console.error("Failed to parse error reason:", parseError);
          }
          toast.error(`Failed to heal ${kamis[index].nickname} after ${MAX_HEAL_RETRIES} attempts at ${timestamp}. Reason: ${message}`, {
            position: "bottom-right",
            autoClose: false,
            closeOnClick: true,
            draggable: false,
          });
        }
      }
    }
  
    if (!success) {
      console.error(`Failed to heal ${kamis[index].nickname} after ${MAX_HEAL_RETRIES} attempts.`);
    }
  }, [kamis, operator, sendTransaction, setGhostGumsUsed, refreshToken]);

  useEffect(() => {
    return () => {
      timerRefs.current.forEach(timer => clearInterval(timer));
    };
  }, []);

  return (
    <>
      <Head>
        <title>{isTabVisible ? originalTitle : "YOUR KAMIS ARE DYING!"}</title>
      </Head>

      <div className="sticky top-0 left-0 right-0 bg-yellow-100 border-b-2 border-yellow-300 p-4 text-center z-50">
        <div className="flex items-center justify-center">
          <svg className="w-6 h-6 text-yellow-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-yellow-800 font-semibold">
            Warning: This site only works while this tab is active and visible. Keep your pc awake and this tab open and visible to ensure your Kamis are cared for!
          </span>
        </div>
      </div>

      {!isTabVisible && (
        <div className="fixed top-16 left-0 right-0 bg-red-500 text-white p-2 text-center z-50">
          ⚠️ Alert: Your Kamis are not being healed while this tab is inactive! ⚠️
        </div>
      )}

        {ready && authenticated && (
          <header className="">
            <div className="container mx-auto flex justify-end items-center">
              <div className="flex gap-4">
                <Link href="/faq" className="text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 hover:text-purple-800 py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                    Read FAQ 📖
                </Link>
                <button
                  onClick={logout}
                  className="text-sm bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Logout 👋
                </button>
              </div>
            </div>
          </header>
        )}

        <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 main-h-screen flex flex-col items-center justify-center">
          {ready && authenticated ? (
            <>
              <div className="bg-opacity-100 rounded-lg shadow-xl p-6 mb-8 text-center bg-green-900 border-2 border-green-500">
                <h1 className="text-4xl font-bold mb-4 text-green-200">
                  🧑‍🌾 Kami Caretaker ⛑️
                </h1>
              </div>
              <PlayerPane 
                playerWallet={playerWallet}
                operator={operator}
                kamis={kamis}
                ghostGumsUsed={ghostGumsUsed}
                setGhostGumsUsed={setGhostGumsUsed}
              />
          <div className="bg-opacity-100 rounded-lg shadow-xl p-6 mb-8 bg-blue-900 border-2 border-blue-500">
            <h2 className="text-3xl font-semibold mb-6 text-center text-blue-300">
              ✨ Your Kamis ✨
            </h2>
          <div className="flex justify-center mb-6">
            <button
              onClick={addKami}
              className="text-lg bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              ➕ Summon New Kami
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kamis.map((kami, index) => (
              <KamiCard
                key={index}
                kami={kami}
                index={index}
                updateKami={updateKami}
                deleteKami={deleteKami}
                toggleKamiTimer={toggleKamiTimer}
                resetKamiTimer={resetKamiTimer}
                testHealKami={healKami}
              />
            ))}
          </div>
        </div>
        </>
        ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="text-2xl font-semibold animate-pulse" style={{ color: 'var(--text-color)' }}>
            Analyzing the realm... 🌌
          </div>
        </div>
        )}
        <footer className="mt-auto py-4">
          <div className="flex justify-center">
            <div className="inline-block bg-blue-900 rounded-lg shadow-lg px-6 py-3">
              <a
                href="https://x.com/plotchy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500 transition duration-300"
              >
                Made with ❤️ by plotchy
              </a>
            </div>
          </div>
        </footer>
        </main>
    </>
  );
}
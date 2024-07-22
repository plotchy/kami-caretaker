import Portal from "../components/graphics/portal";
import { usePrivy } from "@privy-io/react-auth";
import { PrivyClient } from "@privy-io/server-auth";
import { GetServerSideProps } from "next";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookieAuthToken = req.cookies["privy-token"];

  // If no cookie is found, skip any further checks
  if (!cookieAuthToken) return { props: {} };

  const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;
  const client = new PrivyClient(PRIVY_APP_ID!, PRIVY_APP_SECRET!);

  try {
    const claims = await client.verifyAuthToken(cookieAuthToken);
    // Use this result to pass props to a page for server rendering or to drive redirects!
    // ref https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props
    console.log({ claims });

    return {
      props: {},
      redirect: { destination: "/dashboard", permanent: false },
    };
  } catch (error) {
    return { props: {} };
  }
};

// export default function LoginPage() {
//   const { login } = usePrivy();

//   return (
//     <>
//       <Head>
//         <title>Login · Privy</title>
//       </Head>

//       <main className="flex min-h-screen min-w-full">
//         <div className="flex bg-privy-light-blue flex-1 p-6 justify-center items-center">
//           <div>
//             <div>
//               <Portal style={{ maxWidth: "100%", height: "auto" }} />
//             </div>
//             <div className="mt-6 flex justify-center text-center">
//               <button
//                 className="bg-blue-600 hover:bg-blue-700 py-3 px-6 text-white rounded-lg"
//                 onClick={login}
//               >
//                 Log in
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

export default function LoginPage() {
  const { login } = usePrivy();

  return (
    <>
      <Head>
        <title>Login · Kami Caretaker</title>
      </Head>

      <main className="flex min-h-screen min-w-full">
        <div className="flex bg-privy-light-blue flex-1 p-6 justify-center items-center">
          <div className="text-center">
            <div>
              <Portal style={{ maxWidth: "100%", height: "auto" }} />
            </div>
            <h1 className="text-3xl font-bold mt-8 mb-4 text-purple-400">🧑‍🌾 Kami Caretaker ⛑️</h1>
            <h1 className="text-3xl font-bold mt-8 mb-4 text-purple-400">Welcome!</h1>
            <p className="text-lg mb-6 max-w-md mx-auto text-purple-400">
              Log in to access your personal Kami dashboard. Here you can manage and automate the healing of your Kamis while you're away.
            </p>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-purple-400">Why Sign In?</h2>
              <ul className="list-disc list-inside text-left max-w-md mx-auto text-purple-400">
                <li>Set up automated healing schedules for your Kamis</li>
                <li>Automatically feed your Kamis in the background</li>
                <li>Use your wallet as you would for kamigotchi</li>
              </ul>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 py-3 px-6 text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                onClick={login}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
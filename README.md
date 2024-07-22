# Kami Caretaker

This site helps you heal up your Kamis while you're away. You can add your kamis and set timers to feed them, and this site will automatically feed them for you.

## Setup

1. Clone this repository and open it in your terminal. 
```sh
git clone https://github.com/plotchy/kami-caretaker
```

1. Install the necessary dependencies with `npm`.
```sh
npm i 
```

1. Initialize your environment variables by copying the `.env.example` file to an `.env.local` file. Then, in `.env.local`, paste the Kamigotchi Privy App ID.
```sh
# In your terminal, create .env.local from .env.example
cp .env.example .env.local

# Add the kamigotchi Privy App ID to .env.local
NEXT_PUBLIC_PRIVY_APP_ID=cltxr4rvw082u129anv6cq7wr
```

## Building locally

In your project directory, run `npm run dev`. You can now visit http://localhost:3000 to see the site!
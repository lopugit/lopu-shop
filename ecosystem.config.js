module.exports = {
  apps: [
    {
      script: 'npm run dev:shopify',
      name: "ls-theme"
    },
    {
      script: 'npm run dev:tailwind',
      name: "ls-tailwind",
      autorestart: false,
    }
  ],
};

# গোপন বার্তা

Next.js এবং AES-256-GCM ব্যবহারকারী expiring encrypted-message starter project।

```bash
npm install
npm run dev
```

Browser মেসেজ encrypt করে, key URL fragment-এ রাখে। Server শুধু ciphertext ও expiry রাখে।

SQLite persistent storage হিসেবে `.data/messages.sqlite` ব্যবহার করে।

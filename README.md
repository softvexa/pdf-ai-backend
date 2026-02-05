# Colour Trading App Backend (Demo)

Ye repo ek **Colour Trading App** ka minimal demo backend + mock UI provide karta hai
jisse aap quickly run karke flow dekh sakte ho.

## Run (Local)

```bash
node src/server.js
```

Server default port **3000** par run hota hai.
Browser me open karein: `http://localhost:3000`

## Demo API Endpoints

- `GET /api/status` – health check
- `GET /api/period` – current period + countdown demo data
- `POST /api/bets` – bet create demo (body required)

Example:

```bash
curl -X POST http://localhost:3000/api/bets \
  -H "Content-Type: application/json" \
  -d '{"userId":"U-1","betType":"color","selection":"Green","amount":200}'
```

## Next Steps

1. Data models finalize karein (User, Wallet, Bet, Round, Transaction, Referral)
2. API contracts define karein (OpenAPI)
3. Game result algorithm finalize karein
4. Admin workflows + audit logs

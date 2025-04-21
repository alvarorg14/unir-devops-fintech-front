# Fintech App

# App Image Build

```bash
docker build -t fintech-app \
  --build-arg VITE_FINTECH_API_BASE_URL=http://localhost:8080 \
  .
```

# App Container Run

```bash
docker run --name fintech-app \
  --network fintech \
  -p 3000:3000 \
  -d fintech-app:latest
```

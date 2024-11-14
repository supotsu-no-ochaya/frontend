# frontend

## developer guide

### startup

`Terminal 1`
```shell
docker compose up
```

`Terminal 2`
```shell
cd src/frontend/
[npm install]  # only once or after package.lock changes
npm run dev
```

### git stuff

- **rebase**. not merge (for a clean history)
- changes to the main-branch only over a pull-request with a feature-branch

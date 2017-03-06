# Tsv-to-csv
Tsv to CSV app for Oxynum. This project is built in NodeJS.

### Summary
1. Host on Heroku
2. How does it work ?
  i. The interface
  ii. Use stuff
  iii. API
3. Architecture


## Host on Heroku.
Add the remote: (Soon) to your git remote to push or publish on server.

## How does it work ?
This Repo contains two apps to launch separatly.

- 1. The first App is TSV (Client interface)
- 2. The second App is dailyMailer (Automatic script)

In order to make work those two apps together:

You must have this Architecture:

```
| tsv (Client App.)
|   |-> src  
|   |-> views
|   |-> server.js
|   |-> SQLrequest.json
|   |-> other files/folders
|
| dailyMailer.js (Alone script)
|
|
|
```

Architecture to refacto in the future.
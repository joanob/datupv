# Deploy

## Server

1. Clone repository: git clone https://github.com/joanob/datupv.git
2. Upload database file and move to .tmp folder
3. Install dependencies: yarn (if yarn timeouts, install some dependencies manually such as better-sqlite3)
4. Build admin: NODE_ENV=production yarn build
5. Create strapi service in /etc/systemd/system/strapi.service

```
[Unit]
Description=strapi

[Service]
WorkingDirectory= /home/datupv/server
ExecStart=NODE_ENV yarn start
```

6. Enable service sudo systemctl enable strapi
7. Start service sudo systemctl start strapi

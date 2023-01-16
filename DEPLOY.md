# Deploy

## Server

1. Clone repository: git clone https://github.com/joanob/datupv.git
2. Upload database and .env files. Create .tmp folder, move data.db to datupv/server/.tmp/data.db and .env to datupv/server/.env
3. Compress build and public/uploads folders and upload
4. unzip folders in their location: unzip build.zip -d datupv/server (it will create /build folder)
5. Install dependencies: yarn (if yarn timeouts, install some dependencies manually such as better-sqlite3)
6. Build admin locally (on server takes too long): NODE_ENV=production yarn build
7. Create strapi service in /etc/systemd/system/strapi.service

```
[Unit]
Description=strapi

[Service]
WorkingDirectory=/home/joltrablaso/datupv/server
ExecStart=NODE_ENV /home/joltrablasco/.npm-global/yarn start
Restart=no
User=joltrablasco

[Install]
WantedBy=multi-user.target
```

8. Enable service sudo systemctl enable strapi
9. Start service sudo systemctl start strapi

## Client

1. Add VITE_SERVER_URL to .env with server ip (http://{ip}:1337)
2. Install dependencies
3. Yarn build
4. Install apache2 sudo apt install apache2
5. Move build to /var/www/html/datupv: mv datupv/client/dist /var/www/html/datupv
6. Create config file: sudo nano /etc/apache2/sites-available/datupv.conf

```
<VirtualHost *:80>
    ServerAdmin {user}@localhost
    ServerName datupv
    ServerAlias datupv
    DocumentRoot /var/www/html/datupv
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

7. Enable conf file: sudo a2ensite datupv.conf

## File archive

**Requirements**: 

Docker (and Docker Compose)

The app was built using React in the client side and Node.js, Express, and MongoDB in the server side. Uploaded files are stored in a server folder and their metadata is stored in a database collection.

**App flow**

![app-flow](./app-flow.png)

To run the app execute the following command in the application root folder:

```bash
docker-compose -f docker-compose.prod.yml up
```

The application is served to `http://localhost:3000/`

To run the development version, run `npm install` both in the client and server folders. Then execute the following command in the application root folder:

```bash
docker-compose up
```

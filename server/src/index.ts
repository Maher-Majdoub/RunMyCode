import { httpServer } from "./app";

const port = process.env.PORT || 3000;
httpServer.listen(port, () => console.log(`Linsting on port ${port}...`));

# RunMyCode

RunMyCode is a judging system that supports multiple programming languages.  
It uses Docker containers to safely execute untrusted code with strict resource limits.  
The architecture follows the Strategy Pattern so each language has its own runner, making it easy to add new languages.

## Features

- Multi-language code execution (C, C++, Java, Python 2/3)  
- Secure sandboxing with Docker containers  
- Modular design for easy extension  
- Real-time updates for code execution results and status  

## Technologies Used

- **Express.js**: Web framework for building RESTful APIs.  
- **React.js**: Frontend library for building user interfaces.  
- **Socket.io**: Real-time communication for messaging and calling.  
- **Docker**: Containerization and sandboxing of code execution  

## Prerequisites

- Docker installed and running  
- Node.js (v20 or later)  
- npm (Node package manager)  

## Setup

1. Clone the repository:
    ```bash
    git clone git@github.com:Maher-Majdoub/RunMyCode.git
    cd RunMyCode
    ```

2. Build the Docker images for each language sandbox:
    ```bash
    cd docker
    ./buildImages.sh
    ```

3. Start the server:
    ```bash
    cd ../server
    npm install
    npm run dev
    ```

4. Start the client:
    ```bash
    cd ../client
    npm install
    npm run dev
    ```

- 5. Open your browser and navigate to http://localhost:5173
    
## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you would like to contribute to this project.

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) License. 

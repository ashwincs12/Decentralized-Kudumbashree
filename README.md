# Decentralized Kudumbashree (D-KUDUMBASHREE)

## Note
- This web application runs on Ethereum Holesky Network. Make sure you have an Metamask extension installed and set the network to Holesky Testnet to avaid unexpected errors.
- This version of D Kudumbashree removes the restriction on CDS Admin dashboard and it is accessesable by all addresses. Actually CDS Admin is the one who deployed the contract and CDS Dashboard is accessable only to that address.

## Introduction
D-Kudumbashree represents an initiative to decentralize one of Asia’s largest Self-Help Groups (SHGs), Kudumbashree. This project aims to redistribute authority from the SHG president to its members using blockchain technology, ensuring transparency, security, and democratization of processes.

## Features
- **Decentralized Authority:** Redistributes decision-making power from the SHG president to its members.
- **Seamless Payments:** Facilitates weekly and loan-due payments with the help of cryptoassets based on member eligibility.
- **User-Friendly Dashboard:** Provides complete details to users like savings, loan dues, total SHG worth, pending loan approvals etc.
- **Blockchain-Based Voting:** Enables democratic loan approvals and presidential elections within the SHG.
- **Automated Meeting Documentation:** Utilizes a chatbot to generate accurate minutes of meetings.

## Technology Stack
- **React.js:** Frontend Development
- **Solidity:** Language used to program Smart Contract. Remix IDE was used for convenience in compilation and testing.
- **Hardhat:** Used for deploying smart contract on testnet.
- **Ethers.js:** Used for integrating smart contract with frontend.
- **Ethereum Holesky:** Testnet on which the application is deployed. Native currency is ETH.

## Installation
Follow these steps to set up the project locally:

1. **Clone the Repository**
   ```sh
   git clone https://github.com/ashwincs12/Decentralized-Kudumbashree.git
   ```
2. **Install Dependencies**
   ```sh
   cd Decentralized-Kudumbashree
   npm install
   cd client
   npm install
   ```
3. **Configure Blockchain Network**
   - Use Alchemy/Infura to generate API Keys
   - Replace <API KEY> and <PRIVATE KEY> fields in configuration file.
     
   ```sh
    networks: {
      holesky: {
        url: <API KEY>, 
        accounts: [<PRIVATE KEY>] 
      }
   ```
4. **Deploy Smart Contract**
   ```sh
   npx hardhat run scripts/deploy.js --network holesky
   ```
5. **Start the Application**
   ```sh
   npm start
   ```

## Usage
1. **Register/Login**:
    - Access the landing page to register as a new user or login if you already have an account.
2. **Create/Join SHG**:
    - New users can create a new Self-Help Group (SHG) or join an existing one by providing necessary details.
3. **Perform Transactions**:
    - Use the dashboard to make weekly payments, request loans, or participate in voting for loan approvals and presidential elections.
4. **Generate Meeting Minutes**:
    - Utilize the integrated chatbot to document meeting minutes by providing the required inputs.

  
## Developers
- **Ashwin C S** ([LinkedIn](https://www.linkedin.com/in/ashwin-cs))
- **Niyathi Mariya George** ([LinkedIn](https://www.linkedin.com/in/niyathi-mariya-george/))
- **Sherhin P P** ([LinkedIn](https://www.linkedin.com/in/sherhin-shoukath-8973a620b/))
- **Sheena A P**



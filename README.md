### EaseChat - Realtime Chat Application

EaseChat is a real-time chat application built using React for the frontend, Express for the backend, MongoDB for data storage, and Socket.io for real-time communication. It provides users with a seamless chatting experience where they can interact with each other in real-time.
EaseChat offers personalized chats with registered users and enables the creation of chat groups where members can engage in group conversations. 



### Table of Contents

1. [Introduction](#easechat)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Technologies Used](#technologies-used)
6. [Screenshots](#screenshots)
7. [License](#license)


### Prerequisites

Before running EaseChat, ensure that you have the following prerequisites installed on your system:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

Follow these steps to install and run EaseChat on your local machine:

1. Clone the repository:

```
git clone https://github.com/utkarshgupta04092003/chatapp
```

2. Navigate to the project directory:

```
cd chatapp
```

3. Install dependencies for both frontend and backend:

```
cd frontend
npm install

cd ..
cd backend
npm install
```

4. Configure MongoDB:

   - Make sure MongoDB is installed and running on your system or You are using Mongo cloud.
   - Update the MongoDB connection URL in the backend configuration file if necessary.

5. Setup env file:
   - Inside the backend folder create a .env file and fill in the proper details
  ```
PORT = 5000
DB_Name = DB_NAME
DATABASE_URI = YOUR_MONGODB_CLOUD_URL
```

6. Run the application:

```
cd  frontend
npm run dev

cd..

cd backend
npm start
```

7. Open your web browser and navigate to `http://localhost:5173` to access EaseChat.

### Usage

- Upon opening the application, users can sign up or log in to their accounts.
- Once logged in, users can personalize chats with registered users by searching for their usernames.
- Users can also create new chat groups and add registered members to the group.
- In the chat groups, members can send and receive messages in real-time.
- The application supports features such as emoji reactions.

### Technologies Used

- **Frontend**: Vite, React.js, Socket.io-client
- **Backend**: Express.js, Socket.io, MongoDB
- **Database**: MongoDB
- **Deployment**: Render (for backend), Netlify (for frontend)

### Screenshots

#### SignUp Page
![image](https://github.com/utkarshgupta04092003/chatapp/assets/63789702/e4bd3750-a395-4d7f-b52c-244e4bc35f66)

#### Personal Chats
![image](https://github.com/utkarshgupta04092003/chatapp/assets/63789702/a50878d4-7b5f-4818-8c46-d4bf56d6ecdb)

#### Chatroom Chats
![image](https://github.com/utkarshgupta04092003/chatapp/assets/63789702/5551f67c-345a-4a90-ac94-51960ae1cdd7)

### Contributions
Feel free to contribute to this repo.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 



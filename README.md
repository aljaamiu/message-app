# message-app

App is running at https://emychatclient.herokuapp.com/


This repo contain the backend and frontend


DataBase: MySQL 
----------------------------------------------------------------------------------------------------------------
Change the settings at back-end -> src -> config -> config.ts \
Import the database from back-end -> src -> DB 

Backend setup:
------------------------------------------------------------------------------------------------------------------
Navigate into back-end\
npm install \
npm run build \
npm start or npm run dev


Frontend setup:
-------------------------------------------------------------------------------------------------------------------
Navigate into front-end\
npm install\
npm start

Features: All work in realtime so no need to refresh page or wait for sometime
-------------------------------------------------------------------------------------------------------------------
Only registered user can login \
Only login user can access the messaging page \
Only the list of current login users can be seen and messaged \
The users list display the name, email and status of the user \
If you have blocked a user, the users status is blocked else it's friend \
You can still see the users you have blocked and your message history with them \
You can unblock your blocked user or block any user by selecting the user and use the block/unblock \
The unblock and block button is at the top right of the message page after selecting a user \
If the selected user is blocked the block button show a green plus sign in the block button \
If the selected user is not blocked the block button show a red minus sign in the block button \
Any user you blocked cannot see you on their users list \
When you unblock a user there is no lose of your previous message history before you blocked the user


Tools and Reasons:
-------------------------------------------------------------------------------------------------------------------



NOTE
                                                                          

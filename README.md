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
Only Desktop screen is considered in the UI, it isn't responsive on mobile screen so you'll have horizontal scroll \
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
When you unblock a user there is no lose of your previous message history before you blocked the user \
The name of any user with unread message changed to green to tell that there is a new message from that user


Tools and Reasons: I have tried to do all from the scrach except those the assignment prevented me from
-------------------------------------------------------------------------------------------------------------------
Backend api node typescript                   ==>   Required by the assignment \
JWT auth and bscrypt js                       ==>   To keep it simple and use auth provider as the assignment required \
Express                                       ==>   Because this is a simple project \
MySQL Raw Queries (did not use sequelize)     ==>   Because I want to do everthing from scrach as this is a test \
MySQL DB                                      ==>   For easy and costless hosting 

React js for the front-end                    ==>   Required by the assignment \
ReduxToolKit                                  ==>   Client store management 

Socket.io                                     ==>   For realtime client and server communications



NOTE: The below was not used in this project.
--------------------------------------------------------------------------------------------------------------------------------------------------
            I do have self developed packages that I use in my project to make things fast and avoid doing something I already did before.
            such as:
             a my-sql-helper it works like sequelize with more personal futures which I can't get from sequelize package.
             my-auth-helper which works like jwt plus bscrypt and in addition it manage sessions, all users activity logs and last activity tracking.

## Food Order / Pickup App

This is the midterm project that Samantha Fok, Sahil Sharma, & Ryan Hrechka created from the Oct 26th, 2020 Cohort.
The user can create an order, edit the amounts of that order, or delete them from the order, and submit their order to the 
restaurant, which will get an SMS message to their phone with the order details. The user will then await a response from the 
restaurant, which when sent via SMS, will simultaneously update the webpage with details of when the order will be ready for pickup and send an SMS message containing that information to the client.

## App Setup

This app will not work as-is. It is currenty using a trial of an SMS api (vonage) and uses ngrok to allow for the api to reach a webhook url. The code will need to be edited to work with another account and env variables created etc. It can easily be used as a template, however.

In a nutshell, ngrok is launched, and the url that ngrok gives you will be given to the api to use as a webhook url. Any approved and verified phone numbers that would like to send / recieve SMS will need to be added to your account. Once these numbers are added and are added into the code, it will work for you. Numbers are added inside the sms.js and checkout.js route files.

## Dependencies

- Body-parser: ^1.19.0
- Chalk: ^2.4.2
- Cookie-session: ^1.4.0
- Dotenv: ^2.0.0
- Ejs: ^2.6.2
- Express: ^4.17.1
- Moment-timezone: ^0.5.32
- Morgan: ^1.9.1
- Nexmo: ^2.9.1
- Ngrok: ^3.3.0
- Node-sass-middleware: ^0.11.0
- PG: ^6.4.2
- PG-native: ^3.0.0

# Screenshots

![Home-page](https://github.com/RAFH82/Midterm/blob/master/img/home.png)
![Menu-page](https://github.com/RAFH82/Midterm/blob/master/img/menu.png)
![Order-page](https://github.com/RAFH82/Midterm/blob/master/img/order.png)
![Confirmation-page](https://github.com/RAFH82/Midterm/blob/master/img/confirmation.png)
![Order-status-page](https://github.com/RAFH82/Midterm/blob/master/img/order_status.png)

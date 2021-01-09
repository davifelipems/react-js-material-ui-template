
![Preview](https://raw.githubusercontent.com/davifelipems/react-js-material-ui-template/blob/blob/react-material-ui-login.gif)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is a React js font end template. You can get the [Back end repository](https://github.com/davifelipems/spring-backend-template)

[Responsive HTML login repository](https://github.com/sefyudem/Responsive-Login-Form)

## Run backend Spring boot app (At the backend repository)
```
mvnw install
java -jar target/spring-jwt-backend-template-0.0.1-SNAPSHOT.jar
```

  - Install dependencies and create a jar file on the target folder.
  - Run the web application from jar file that has been created.

Run this command (At the frontend repository) to install the dependencies
## `npm i`

## Run frontend React (At the frontend repository)
### `npm run start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000)

The page will reload if you make edits.  
You will also see any lint errors in the console.  

After you have logged in, access the database to give these permissions to your user  

Open [http://localhost:8080/h2-console](http://localhost:8080/h2-console)  
username: sa  
password: <empty>  

run this SQL commands
```
INSERT INTO PRIVILEGE (ID,NAME) VALUES
(5,'USER_READ_PRIVILEGE'),
(6,'USER_WRITE_PRIVILEGE'),
(7,'USER_DELETE_PRIVILEGE'),
(8,'ROLE_READ_PRIVILEGE'),
(9,'ROLE_WRITE_PRIVILEGE'),
(10,'ROLE_DELETE_PRIVILEGE');

INSERT INTO USERS_PRIVILEGES  (USER_ID,PRIVILEGE_ID) VALUES
(1,5),
(1,6),
(1,7),
(1,8),
(1,9),
(1,10);
```

### `npm run test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


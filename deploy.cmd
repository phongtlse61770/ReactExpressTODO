cd client
call npm run build
cd ..
xcopy /s/e/y  "client/build" "react-backend/public/app"
cd react-backend
git add .
git commit -am deploy
git push heroku master
start heroku open
cd ..
echo
echo Complete !!
echo Opening website
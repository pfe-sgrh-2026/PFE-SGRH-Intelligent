@echo off
echo ============================================
echo Lancement complet SGRH Intelligent
echo ============================================

REM 1. MySQL + BDD
start cmd /k "cd /d C:\Program Files\MySQL\MySQL Server 8.4\bin && echo MySQL OK - Run: mysql -u root -p < C:\Users\hp\Desktop\PFE_Slah\database\schema.sql"

REM 2. Microservice IA
start cmd /k "cd /d C:\Users\hp\Desktop\PFE_Slah\microservice-ia && pip install -r requirements.txt && python main.py"

REM 3. Backend Spring Boot
start cmd /k "cd /d C:\Users\hp\Desktop\PFE_Slah\backend && mvnw spring-boot:run"

REM 4. Frontend React
start cmd /k "cd /d C:\Users\hp\Desktop\PFE_Slah\frontend && npm install && npm run dev"

echo.
echo 4 terminaux ouverts. Attendez le lancement complet.
pause

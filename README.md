Buat 2 terminal untuk backend (Laravel) dan frontend (ReactVite)

Terminal Laravel (Depedensi)
1. composer install
2. cp .env.example .env
3. Pada bagian env atur database sesuai yang ingin digunakan
4. php artisan key:generate --ansi
5. php artisan storage:link
6. php artisan migrate


Terminal Frontend (Dependesi)
1. cd frontend
2. npm install
3. npm  install react-router-dom -S
4. npm install react-bootstrap bootstrap
5. npm install react-icons


Running web :

 Terminal Laravel	: php artisan serve


 Terminal Frontend	: npm run dev

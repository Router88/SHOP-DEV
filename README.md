# Настройка проекта

Установка зависимостей

    npm install

Создать файл .env в корневом каталоге и добавить конфигурацию БД

    DATABASE_URL="mysql://root:secret@localhost:3306/nature2"

Выполнить миграцию БД из конфигурации ORM Prisma

    npx prisma migrate dev

Запуск веб-сервера

    npm run dev
Выбор сида 

    npm run seed  --seedType=test //заполнение базы данных для тестирования и презентации функций 
    где число после "=" является аргументом, который принимает функция в файле seed.js
    НЕ ЗАПУСКАТЬ БОЛЬШЕ ОДНОГО РАЗА(исправлю это потом)
Администрирование

    Администратором считается любой пользователь с 1 в столбце role . Только админ может добавлять/редактировать/удалять 
 (далее будут добавлены вариации админов)


TODO
добавь информационный блок на главной странице, который будет писать об успешном сохранении/регистрации/другом  (по примеру ошибки при регистрации)
добавь создании/добавление категории

добавь поиск на странице

изменить функцию seed чтобы не добавлялись по новой дубликаты 

Краткий сборник литературы 
https://www.prisma.io/docs/concepts/components/prisma-client/full-text-search
https://stackoverflow.com/questions/11580961/sending-command-line-arguments-to-npm-script
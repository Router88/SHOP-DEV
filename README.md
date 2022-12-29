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
use nature2;
update users set role='1' where username='ИМЯ ПОЛЬЗОВТЕЛЯ'; (добавление админа,только вручную,только напрямую через mysql-терминал)
    Администратором считается любой пользователь с 1 в столбце role . Только админ может добавлять/редактировать/удалять 
 (далее будут добавлены вариации админов)


TODO
корзинa

Краткий сборник литературы на лето домашка по литературе смотреть бесплатно без смс и регистрации :
https://www.prisma.io/docs/concepts/components/prisma-client/full-text-search
https://stackoverflow.com/questions/11580961/sending-command-line-arguments-to-npm-script
https://www.npmjs.com/package/express-ip-access-control?activeTab=readme


При каждом копировании репозитория боту нужно заного отправить /sendLogs (наверное)


придумай тему для проекта

сделай презентацию


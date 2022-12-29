const { Prismaclient, PrismaClient } = require('@prisma/client');
const { type } = require('os');
const prisma = new PrismaClient();

const seed = process.env.npm_config_seedType;

console.log('Seed value = '+seed + 'Seed type =' +typeof seed)

async function main(seed) {
    console.log('-----Starting-----')
    if (seed != undefined || seed != NaN) {
        switch (seed) {
            case 'test':
                try {
                    console.log('-----Creating the Test database values (Items,Categories)-----')
                    const createItems = await prisma.items.createMany({
                         data:[
                             { title: 'nature1', image: 'nature1.jpeg', description: 'the nature with cat 1', category_id: 1 },
                             { title: 'nature2', image: 'nature2.jpeg', description: 'the nature with cat 2', category_id: 2 },
                         ],
                         skipDuplicates: true,
                     })
                     const createCategories = await prisma.category.createMany({
                         data:[
                             { title: 'Category1', description: 'The test category' },
                             { title: 'Category2', description: 'The second test category' },
                         ],
                         skipDuplicates: true,
                     })
                     console.log('-----Done-----');
                     break;
                  } catch(err) {
                    console.log('SOMETHING WENT WRONG! Error: ' +err);
                    break;
                  }
                
                
            case 'project':
                try {
                    console.log('-----Creating the Project database values (Items,Categories)-----')
                    const createItems = await prisma.items.createMany({
                         data:[
                             { title: 'Холодильник FInark 100hd-12k', image: 'holod1.jpg', description: 'Холодильник FInark. Регулировка температуры от 1000 до -7 градусов',price: '129000',category_id: 1},
                             { title: 'Холодильник Nar Iq 19l-white', image: 'holod2.jpg', description: 'Холодильник Nar IQ в белой расцветке',price: '10000',category_id: 1},
                             { title: 'Холодильник  IgorTechnology H2SO4-white', image: 'holod3.png', description: 'Холодильник от компании IgorTechnology.Обладает встроенным хранилищем для пельменей',price: '20123',category_id: 1},
                             { title: 'Стиральная машина Сти М20', image: 'stir1.jpg', description: 'Старальная машина.Немного устаревшая.Б/У.Действует скидка 2000руб',price: '1000',category_id: 1},
                             { title: 'Cтиральная машина ИзМаш А10', image: 'stir2.jpeg', description: 'Стиральная машина Изальималовского Машинотехнического забора.Вместимость 200градусов цельсия',price: '12040',category_id: 1},
                             { title: 'Стиральная машина hjd d29', image: 'stir3.jpg', description: 'Чёрная стиральная машина.Из-за ошибок в производстве белая раскраска работает хуже',price: '50000',category_id: 1},
                             { title: 'Электропечь H3PO4', image: 'pec1.jpg', description: 'Мощность 3тыс лс/т',price: '100234',category_id: 1},
                             { title: 'Электропечь LI-PO HBr', image: 'pec3.jpeg', description: 'Температура внутри может достигать 993 C. В комплекте идёт дополнительная решётка.',price: '25000',category_id: 1},
                             { title: 'Телефон IHkdeg 64-5G', image: 'telef1.jpg', description: 'Телефон в чёрной раскраске',price: '3000',category_id: 2},
                             { title: 'Телефон IHkdeg 32 12lite', image: 'telef3.jpg', description: 'Упрощённая версия, отличается более слабым процессором',price: '2500',category_id: 2},
                             { title: 'Фотоаппарат NaKOL POS ID 1257g', image: 'fot1.jpg', description: '12 дюймов матрица, 57g водонепроницаемость.',price: '10020',category_id: 2},
                             { title: 'Фотоаппарат Mu sOr tgopfgh', image: 'fot3.jpg', description: 'Плёночный фотоаппарат',price: '5000',category_id: 2},
                             { title: 'Телевизор TV2', image: 'tv1.jpg', description: '32 дюйма',price: '50003',category_id: 3},
                             { title: 'Телефизор HTyk', image: 'tv3.jpg', description: '12дюймов',price: '5000',category_id: 3},
                             { title: 'Аудиосистема bASSbooSt 12db', image: 'bass1.jpg', description: '120 метров максимальная громкость',price: '8500',category_id: 3},
                             { title: 'Колонки BoileRTX 4090', image: 'bass2.jpg', description: 'Колонки с отличным звуком',price: '4090',category_id: 3},
                             { title: 'Ноутбук Susa 20r3', image: 'nout1.jpg', description: 'Ноутбук Susa 20r3',price: '22000',category_id: 4},
                             { title: 'Ноутбук  ronoh', image: 'nout2.jpg', description: 'Видеокарта video12, процессор OR i5',price: '34100',category_id: 4},
                             { title: 'Ноутбук Health Point 243', image: 'nout3.jpg', description: 'НОУТБУК ',price: '12000',category_id: 4},
                             { title: 'Клавиатура противоударная BOMBOM 234', image: 'klava1.jpg', description: 'Клавиатура с защитой от проигранных матчей',price: '20500',category_id: 4},
                             { title: 'Клавиатура Tik 2', image: 'klava2.jpg', description: 'Клавиатура с подсветкой ',price: '100233',category_id: 4},
                             { title: 'Компьютерная машь офисная OFIS', image: 'mice1.jpg', description: 'Простая и надёжная мышь',price: '100',category_id: 4},
                             { title: 'Компюьтерная мышь игровая MIce2', image: 'mice2.png', description: 'Подсветка в комплекте не предусмотрена',price: '5000000',category_id: 4},
                             { title: 'Компьютерная мышь 2рол', image: 'mice3.jpg', description: 'Возьмись рукой за удава',price: '4000',category_id: 4},
                             { title: 'Роутер ROUTER88', image: 'router1.jpg', description: 'github.com/router88',price: '88',category_id: 5},
                             { title: 'Роутер router2234', image: 'router2.jpg', description: 'Белая расцветка, 4 шампура для жарки мяса',price: '1002',category_id: 5},
                             { title: 'Роутер 123HOLg', image: 'router3.jpg', description: 'router3.jpg',price: '10220',category_id: 5},
                             { title: 'Утюг ZHENA 40', image: 'utug1.jpg', description: 'Действует скидка 0 руб',price: '100',category_id: 6},
                             { title: 'Наушники UHO1 ', image: 'uho1.jpg', description: 'Наушники',price: '10230',category_id: 7},
                             { title: 'Наушники UHO2', image: 'uho2.jpg', description: 'Наушники из ',price: '10054',category_id: 7},
                             { title: 'Наушники SennaidaPetrovna', image: 'uho3.jpg', description: 'Простые и надёжные но не воспроизводят звук',price: '100',category_id: 1},
                            ],
                         skipDuplicates: true,
                     })
                     const createCategories = await prisma.category.createMany({
                         data:[
                             { title: 'Бытовая техника', description: 'Утюги,холодильники и тому подобное' },//1
                             { title: 'Смартфоны и фототехника', description: 'Смартфоны и фотоаппараты' },//2
                             { title: 'ТВ, аудио ', description: 'Телефизоры, аудиосистемы, микрофоны' },//3
                             { title: 'ПК, ноутбуки, периферия', description: 'ноутбуки, компьютерные мыши, клавиатуры' },//4
                             { title: 'Сетевое оборудование', description: 'Различные маршрутизаторы' },//5
                             { title: 'Уценённые товары', description: '!!!СКИДКИ!!!' },//6
                             { title: 'Аксессуары', description: 'Карты памяти, объективы, жёсткие диски' },//7
                         ],
                         skipDuplicates: true,
                     })
                     console.log('-----Done-----');
                     break;
                  } catch(err) {
                    console.log('SOMETHING WENT WRONG! Error: ' +err);
                    break;
                  }
            break;      
        }
    }
    
    // console.log(createMany)
}


main(seed)
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })



//очиста базы данных
  //function dropDB() {
  //    const items = await prisma.items.delete({});
  //    const categories = await prisma.category.delete({});

  //}

  //drop()
  //.then(async () => {
  //    await prisma.$disconnect()
  //})
  //.catch(async (e) => {
  //    console.error(e)
  //    await prisma.$disconnect()
  //    process.exit(1)
  //})
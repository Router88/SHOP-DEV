const { Prismaclient, PrismaClient } = require('@prisma/client');
const { type } = require('os');
const prisma = new PrismaClient();

const seed = process.env.npm_config_seedType;

console.log('Seed value = '+seed + 'Seed type =' +typeof seed)

async function main(seed) {
    console.log('-----Starting-----')
    if (seed != undefined || seed != NaN) {
        switch (seed) {
            case "test":
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
                
                
            case project:
                 //основной вариант заполнения базы данных
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
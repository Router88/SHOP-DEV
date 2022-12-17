const { Prismaclient, PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seed = process.env.npm_config_seedNumber;

console.log(seed)
console.log(typeof seed)

async function main(seed) {
    let dataCategory = undefined;
    let dataItems = undefined;
    if (seed != undefined || seed != null || seed != NaN) {
        switch (seed) {
            case "test":
               //dataItems=[
               //    { title: 'nature1', image: 'nature1.jpeg', description: 'the nature with cat 1', category_id: '1' },
               //    { title: 'nature2', image: 'nature2.jpeg', description: 'the nature with cat 2', category_id: '2' },
               //];
               //dataCategory=[
               //    { title: 'Category1', description: 'The test category' },
               //    { title: 'Category2', description: 'The second test category' },
               //];
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
                break;
            //case project:
            //сюда делать сам проект      
            //break;      
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
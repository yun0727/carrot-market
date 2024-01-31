import { PrismaClient } from "@prisma/client";

const client = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty'
});

async function main(){
  [...Array.from(Array(500).keys())].forEach(async(item)=>{
    await client.stream.create({
      data:{
        name: String(item),
        description: String(item),
        price: item,
        user:{
          connect:{
            id: 17,
          }
        }
      }
    })
    console.log(`${item}/500`)
  })
}

main()
  .catch((e)=>console.log(e))
  .finally(()=> client.$disconnect())

import 'dotenv/config'
import express from 'express';

const app = express();
const port = process.env.PORT|| 3000;
app.use(express.json())

let coffeeData=[]
let nextId=1

app.post('/coffees', (req,res) =>{
    const {name,price}= req.body
    const newCoffee = {id: nextId++,name,price}
    coffeeData.push(newCoffee)
    res.status(201).send(newCoffee)

})

app.get('/coffees', (req,res) =>{
    res.status(201).send(coffeeData)
})

app.get('/coffees/:id', (req,res) =>{
   const coffee = coffeeData.find(c =>c.id === parseInt(req.params.id))
   if(!coffee){
    return res.status(404).send('coffee not found')
   }
   res.status(200).send(coffee)
})

app.put('/coffees/:id', (req,res)=>{
    const coffee = coffeeData.find(c => c.id === parseInt(req.params.id))
   console.log("coffee deets:", coffee)
    if(!coffee){
        return res.status(404).send('coffee not found')
       }
       const{name,price} = req.body
       coffee.name = name
       coffee.price = price
       res.send(200).send(coffee)

})

app.delete('/coffees/:id', (req,res) =>{
    console.log("delete")
    console.log(req.params.id)

    const index = coffeeData.findIndex(c=>c.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send('coffee not found')

    } 
    coffeeData.splice(index,1)
    return res.status(204).send('coffee deleted')


})

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});
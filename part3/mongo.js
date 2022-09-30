const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length === 4) {
    console.log('Please provide 3 or 5 args like: node mongo.js <password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3] ?? null
const number = process.argv[4] ?? null

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)
const url = `mongodb+srv://root:${password}@demo.51db7hq.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose
    .connect(url)
    .then(() => {
        // List all
        if (process.argv.length === 3) {

            Person.find({}).then(result => {
                result.forEach(person => {
                    console.log(person)
                })
                return mongoose.connection.close()
            })
        }

        // Add new person to phonebook
        if (process.argv.length === 5) {

            mongoose
                .connect(url)
                .then(() => {
                    const person = new Person({
                        name,
                        number,
                    })

                    return person.save()
                    .then(() => {
                        console.log(`added ${name} number ${number} to phonebook`)
                        return mongoose.connection.close()
                    })
                    .catch(err => console.log(err))
                })
                .catch((err) => console.log(err))
        }
    })
    .catch((err) => console.log(err))












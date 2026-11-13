import express from 'express'

const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.json({
        "greeting": "hi from the phonebook backend!"
    })
})

app.get('/info', (request, response) => {
    const now = new Date()
    const formatted = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    });
    response.send(`<div>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${formatted}</p>
</div>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.post('/api/persons', (request, response) => {
    const body = request.body 

    if (!body.name) {
        response.status(400).json(
            {"error": "name is missing"}
        )
        return
    }

    if (!body.number) {
        response.status(400).json(
            {"error": "number is missing"}
        )
        return
    }

    const found = persons.find(person => person.name === body.name)
    if (found) {
        response.status(409).json(
            {"error": "name must be unique"}
        )
        return 
    }

    const person = {
        name: body.name,
        number: body.number,
        id: String(Math.floor(Math.random() * 100000000))
    }

    persons.push(person)
    response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const found = persons.find(person => person.id === id)
    if (!found) {
        response.statusMessage = `Person with id ${id} is not found`
        response.status(404).end()
        return
    }
    response.json(found)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id 
    const found = persons.findIndex(person => person.id === id)
    if (found === -1) {
        response.statusMessage = `Person with id ${id} is not found`
        response.status(404).end()
        return
    }
    persons.splice(found, 1)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
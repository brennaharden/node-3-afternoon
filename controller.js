module.exports = {
    create: (req, res, next) => {
        const db = req.app.get('db');
        const {name, description, price, image_url} = req.body
        db.create_product([name, description, price, image_url]).then(() => {
            res.sendStatus(200)
        }).catch(err => {
            console.log(err)
            res.status(500).send('Please make sure all fields are completed.')
        })
    },

    getOne: (req, res, next) => {
        const db = req.app.get('db');
        db.read_product(req.params.id)
        .then(product => {
            res.status(200).send(product)
        }).catch(err => {
            console.log(err)
            res.status(500).send('No product with that ID, please try again.')
        })
    },

    getAll: (req, res, next) => {
        const db = req.app.get('db');
        db.read_products().then(products => {
            res.status(200).send(products)
        }).catch(err => {
            console.log(err)
            res.status(500).send('Something went wrong. Please make sure you are connected to the server.')
        })
    },

    update: (req, res, next) => {
        const db = req.app.get('db');
        db.update_product([req.params.id, req.query.desc])
        .then(() => {
            res.sendStatus(200)
        }).catch(err => {
            console.log(err)
            res.status(500).send('Please make sure product ID is correct.')
        })
    },

    delete: (req, res, next) => {
        const db = req.app.get('db');
        db.delete_product(req.params.id)
        .then(products => {
            res.status(200).send(products)
        }).catch(err => {
            console.log(err)
            res.status(500).send('No product with that ID. Please try again.')
        })
    }
}
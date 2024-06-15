
const fs = require('fs');

function get(req, res) {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let product = data.find(st => st.id == id)

            if (product == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(product);
            }

        }


    })
}


exports.post = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        let products = JSON.parse(data);
        let product = req.body;
        product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        products.push(product);
        fs.writeFile("products.json", JSON.stringify(products), (err) => {
            if (err) {
                res.status(500).send("error in add products ");
            } else {
                res.send(product);
            }
        });
    });
}
exports.update = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("Error reading file products");
        } else {
            let products = JSON.parse(data);
            let id = req.params.id;
            let updatedProduct = req.body;
            let index = products.findIndex(p => p.id == id);

            if (index === -1) {
                res.status(404).send("Product not found with id " + id);
            } else {
                products[index] = { ...products[index], ...updatedProduct };
                fs.writeFile("products.json", JSON.stringify(products), (err) => {
                    if (err) {
                        res.status(500).send("Error updating product");
                    } else {
                        res.send(products[index]);
                    }
                });
            }
        }
    });
}

//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
exports.update = exports.update;

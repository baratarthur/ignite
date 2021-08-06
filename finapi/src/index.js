const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = express();
app.use(express.json());

const customers = [];

const customerExists = (cpf) => {
    return customers.some(customer => customer.cpf === cpf);
}

// MidleWare
function verifyIfExistAccountCpf(req, res, next) {
    const { cpf } = req.headers;
    const customer = customers.find(customer => customer.cpf === cpf);

    if(!customer) {
        return res.status(400).json({"error": "Customer doesnt exist"});
    }

    req.customer = customer
    
    return next();

}

function getBalance(statement) {
    return statement.reduce((acc, op) => {
        if (op.type === "credit") {
            return acc + op.amount;
        } else {
            return acc -= op.amount;
        }
    }, 0);
}

/**
 * name - string
 * cpf - string
 * id - uuid
 * statement []
 */
app.post("/account", (req, res) => {
    const { cpf, name } = req.body;
    const id = uuidV4();

    if (customerExists(cpf)) {
        return res.status(400).json({"error": "Customer already exist"});
    }

    customers.push({name, cpf, id, statement: []});

    return res.status(201).send();
});

app.get("/statement", verifyIfExistAccountCpf, (req, res) => {
    const { customer } = req;

    return res.status(200).json({ statement: customer.statement });
});

app.post("/deposit", verifyIfExistAccountCpf, (req, res) => {
    const { customer } = req;
    const { description, amount } = req.body;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: 'credit'
    };

    customer.statement.push(statementOperation);

    return res.status(201).send();
});

app.post("/withdraw", verifyIfExistAccountCpf, (req, res) => {
    const { amount } = req.body;
    const { customer } = req;

    const customerBalance = getBalance(customer.statement);

    if (customerBalance < amount) {
        return res.status(400).send({ message: "Insuficient Funds" });
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: 'debit'
    };
    
    customer.statement.push(statementOperation);

    return res.status(201).send();
});

app.get("/statement/date", verifyIfExistAccountCpf, (req, res) => {
    const { customer } = req;
    const { date } = req.query;

    const dateFormat = new Date(date + " 00:00");

    const dayStatements = customer.statement.filter(
        op =>
            op.created_at.toDateString() ===
            new Date(dateFormat).toDateString()
    );


    return res.status(200).json(dayStatements);
});

app.put('/account', verifyIfExistAccountCpf, (req, res) => {
    const { name } = req.body;
    const { customer } = req;

    customer.name = name;

    return res.status(200).send();
});

app.get("/account", verifyIfExistAccountCpf, (req, res) => {
    const { customer } = req;

    return res.status(200).json(customer);
});

app.delete("/account", verifyIfExistAccountCpf, (req, res) => {
    const { customer } = req;

    customers.splice(customer, 1);
    
    return res.status(200).json(customers);
});

app.get("/balance", verifyIfExistAccountCpf, (req, res) => {
    const { customer } = req;

    return res.status(200).json({
        balance: getBalance(customer.statement)
    });
});

app.listen(3333);

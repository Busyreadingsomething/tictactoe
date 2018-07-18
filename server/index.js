const express = require('express');
const path = require('path');

app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));

const PORT = 5000;

app.listen(PORT, () => console.log(`LISTENING TO ${PORT}`));

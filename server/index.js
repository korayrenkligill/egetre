import express from 'express'
import mysql from 'mysql'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'theatres-test'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL database connected!');
});

app.post('/theatres/add', (req, res) => {
  const theatre = req.body;

  const sql = `INSERT INTO theatres (name, trailer, price, cast, time, categories, image, sessions) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [theatre.name, theatre.trailer, theatre.price, theatre.cast, theatre.time, 
                  theatre.categories, theatre.image, theatre.sessions];

  connection.query(sql, values, (err, result) => {
    if (err) return res.json(err);
    console.log(`Tiyatro nesnesi başarıyla eklendi: ${result.insertId}`);
    res.send(`Tiyatro nesnesi başarıyla eklendi: ${result.insertId}`);
  });
});

app.get("/theatres", (req,res)=>{
  const sql = `SELECT * FROM theatres`;
  connection.query(sql,(err,result) => {
    if (err) return res.json(err);
    else{
      for(var i = 0; i < result.length; i++){
        result[i].image = result[i].image.toString('binary').toString('base64');
      }
      return res.json(result);
    }
  })
})
app.post('/data/add', (req, res) => {
  const {price} = req.body;

  const sql = `INSERT INTO data (price) VALUES (?)`;

  const value = [price];

  connection.query(sql, value, (err, result) => {
    if (err) return res.json(err);
    console.log(`Data nesnesi başarıyla eklendi: ${result.insertId}`);
    res.send(`Data nesnesi başarıyla eklendi: ${result.insertId}`);
  });
});
app.get("/data", (req,res)=>{
  const sql = `SELECT * FROM data`;
  connection.query(sql,(err,result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
})


app.post('/user/add', (req, res) => {
  const user = req.body;

  const sql = `INSERT INTO users (username, password, email, name, surname, position, gender, profile) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [user.username, user.password, user.email, user.name, user.surname, 
                  user.position, user.gender, user.profile];

  connection.query(sql, values, (err, result) => {
    if (err) return res.json(err);
    console.log(`Kayıt başarıyla gerçekleşti: ${result.insertId}`);
    res.send(`Kayıt başarıyla gerçekleşti: ${result.insertId}`);
  });
});

app.get("/users", (req,res)=>{
  const sql = `SELECT * FROM users`;
  connection.query(sql,(err,result) => {
    if (err) return res.json(err);
    else{
      for(var i = 0; i < result.length; i++){
        result[i].profile = result[i].profile.toString('binary').toString('base64');
      }
      return res.json(result);
    }
  })
})

app.post('/update/tickets', (req, res) => {
  const { userId, newValue } = req.body;
  const updateSql = 'UPDATE users SET ticket = ? WHERE id = ?';
  const updateValues = [newValue, userId];

  connection.query(updateSql, updateValues, (err, result) => {
    if (err) return err;
    console.log('Number of rows updated: ' + result.affectedRows);
    res.send('Ticket update successful!');
  });
});
app.post('/update/user', (req, res) => {
  const user = req.body;
  const updateSql = 'UPDATE users SET username = ?, password = ?, email = ?, name = ?, surname = ?, profile = ? WHERE id = ?';
  const updateValues = [user.username, user.password, user.email, user.name, user.surname, user.profile, user.userId];

  connection.query(updateSql, updateValues, (err, result) => {
    if (err) return err;
    console.log('User updated: ' + result.affectedRows);
    res.send('User update successful!');
  });
});
app.post('/admin/update/user', (req, res) => {
  const user = req.body;
  const updateSql = 'UPDATE users SET username = ?, password = ?, email = ?, name = ?, surname = ?, position = ?, profile = ? WHERE id = ?';
  const updateValues = [user.username, user.password, user.email, user.name, user.surname, user.position, user.profile, user.userId];

  connection.query(updateSql, updateValues, (err, result) => {
    if (err) return err;
    console.log('User updated: ' + result.affectedRows);
    res.send('User update successful!');
  });
});

app.post('/admin/update/theatre', (req, res) => {
  const theatre = req.body;
  const updateSql = 'UPDATE theatres SET name = ?, trailer = ?, price = ?, cast = ?, time = ?, categories = ?, image = ?, sessions = ? WHERE id = ?';
  const updateValues = [theatre.name, theatre.trailer, theatre.price, theatre.cast, theatre.time, theatre.categories, theatre.image, theatre.sessions, theatre.theatreId];

  connection.query(updateSql, updateValues, (err, result) => {
    if (err) return err;
    console.log('Theatre updated: ' + result.affectedRows);
    res.send('Theatre update successful!');
  });
});

app.post('/update/sessions', (req, res) => {
  const { id, jsonTheatre } = req.body;
  const updateSql = 'UPDATE theatres SET sessions = ? WHERE id = ?';
  const updateValues = [jsonTheatre, id];

  connection.query(updateSql, updateValues, (err, result) => {
    if (err) return err;
    console.log('Number of rows updated: ' + result.affectedRows);
    res.send('Session update successful!');
  });
});

app.post('/remove/user', (req, res) => {
  const id = req.body.id;
  const sql = "DELETE FROM users WHERE id = ?";
  const values = [id];

  connection.query(sql, values, (err, result) => {
    if (err) return err;
    console.log('Number of rows removed: ' + result.affectedRows);
    res.send('User removed successfuly!');
  });
});

app.post('/remove/theatre', (req, res) => {
  const id = req.body.id;
  const sql = "DELETE FROM theatres WHERE id = ?";
  const values = [id];

  connection.query(sql, values, (err, result) => {
    if (err) return err;
    console.log('Number of rows removed: ' + result.affectedRows);
    res.send('Theatre removed successfuly!');
  });
});

app.post('/remove/ticket', (req, res) => {
  const { userId, newValue } = req.body;
  const updateSql = 'UPDATE users SET ticket = ? WHERE id = ?';
  const updateValues = [newValue, userId];

  connection.query(updateSql, updateValues, (err, result) => {
    if (err) return err;
    console.log('Number of rows updated: ' + result.affectedRows);
    res.send('Ticket update successful!');
  });
});

app.get('/theatres',(req,res)=>{
    res.json("hello world");
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
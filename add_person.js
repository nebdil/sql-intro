var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'development',
    password : 'development',
    database : 'vagrant'
  }
});

///////////////

let input = process.argv.slice(2, 5);

knex('famous_people')
  .returning('id')
  .insert({first_name: input[0], last_name: input[1], birthdate: input[2]})
  .asCallback((err, rows) => {
    if (err) throw err;
    rows.forEach(function(e) {
    console.log('inserted');
    })
  })
  .finally(() => knex.destroy())

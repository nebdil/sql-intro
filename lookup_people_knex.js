var knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'development',
    password: 'development',
    database: 'vagrant'
  }
});

///////////////

let input = process.argv[2];

knex.select().from('famous_people')
  .where('first_name', 'like', `${input}`)
  .orWhere('last_name', 'like', `${input}`)
  .asCallback((err, rows) => {
    if (err) throw err;
    console.log('Searching...');
    console.log(`Found 1 person(s) associated with your query: '${input}'`);
    rows.forEach(function(e) {
      console.log("- " + e.id + ": " + e.first_name + " " + e.last_name + ", born " + e.birthdate);
    })
  })
  .then(() => knex.destroy())

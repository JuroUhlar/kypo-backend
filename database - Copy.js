var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('mydb.db')


function sqliteExample() {
  db.serialize(function () {
    db.run('CREATE TABLE lorem (info TEXT)')
    var stmt = db.prepare('INSERT INTO lorem VALUES (?)')

    for (var i = 0; i < 10; i++) {
      stmt.run('Ipsum ' + i)
    }

    stmt.finalize()

    db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
      console.log(row.id + ': ' + row.info)
    })
  })

  db.close()
}

function read() {
  db.serialize(function () {
      db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
      console.log(row.id + ': ' + row.info)
    });
  });
}


function jsonToDB() {
    var data = require('./all-events');
    var statement = 'INSERT INTO events (player_ID,timestamp,logical_time,level,event) VALUES ';        
    for(var i = 0; i<data.length; i++) {
      statement += stringifyEventJson(data[i]) + ',\n';
    }
    statement = statement.slice(0, -2);
    // console.log(statement);
    db.run(statement);
}

function getAllEvents() {
    var events = [];
    db.each('SELECT  player_ID,timestamp, logical_time, level, event FROM events', function (err, row) {
        // console.log(row.player_ID, row.timestamp, row.logical_time, row.level, row.event);
        var event = {
          ID: row.player_ID,
          timestamp: row.timestamp,
          logical_time: row.logical_time,
          level: row.level,
          event: row.event 
        };
        // console.log(event.timestamp);
        events.push(event);
        // console.log(events.length);
    }, function () {
      console.log(JSON.stringify(events));
      return events;
    });
    
}


function deleteAllEvents() {
   db.run("DELETE FROM events");
}


function stringifyEventJson(event) {
  return "('" + event.ID +"','"+ event.timestamp +"','"+ event.logical_time +"','"+ event.level +"','"+ event.event + "')";
 }

// read();
// JsonToDB();
// jsonToDB();
// deleteAllEvents();
// deleteAllEvents();
// jsonToDB();
getAllEvents();
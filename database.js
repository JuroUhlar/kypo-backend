var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('mydb.db')


// function sqliteExample() {
//   db.serialize(function () {
//     db.run('CREATE TABLE lorem (info TEXT)')
//     var stmt = db.prepare('INSERT INTO lorem VALUES (?)')

//     for (var i = 0; i < 10; i++) {
//       stmt.run('Ipsum ' + i)
//     }

//     stmt.finalize()

//     db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
//       console.log(row.id + ': ' + row.info)
//     })
//   })

//   db.close()
// }



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


exports.getEvents = function (req, res) {
    var events = [];

    var statement = 'SELECT  player_ID,timestamp, logical_time, level, event FROM events';

    if(Object.keys(req.query).length != 0) {
        statement += queryBuilder(req.query);
        console.log("Querying events...");
    } else {
        console.log("No query specified, returning all events")
    }

    console.log(statement);

    db.each(statement,
        function (err, row) {
            var event = {
                ID: row.player_ID,
                timestamp: row.timestamp,
                logical_time: row.logical_time,
                level: row.level,
                event: row.event 
            };
            events.push(event);
        }, 
        function SendResponseToClientWhenDataIsLoaded () {
            res.json(events);
            console.log("Rows returned: " + events.length);
            res.end();
    });
}

exports.addEvent = function (req,res) {
    var statement = 'INSERT INTO events (player_ID,timestamp,logical_time,level,event) VALUES ';
    statement += stringifyEventJson(req.body);   
    db.run(statement);
    res.end();
    console.log(statement + "\nEvent successfully entered into database.");
}


function deleteAllEvents() {
   db.run("DELETE FROM events");
}

function stringifyEventJson(event) {
  return "('" + event.ID +"','"+ event.timestamp +"','"+ event.logical_time +"','"+ event.level +"','"+ event.event + "')";
 }

// deleteAllEvents();
// var eventstring = '{"ID": 17280,"timestamp": "2016-04-07 06:41:09","logical_time": "00:00:00","level": "1","event": "Game started"}'
// exports.AddEvent(eventstring);

function queryBuilder(query) {
  var resultString = " WHERE "; 
  firstParam = true; 
  Object.keys(query).forEach(function(key) {
    if (firstParam) {
       firstParam = false;
    } else {
      resultString += " AND ";
    }
    resultString += key + " = '" + query[key] + "'";
  });
  return resultString;
}

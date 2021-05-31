import axios from 'axios'
const sqlite = require('sqlite');
const sqlite3= require('sqlite3');
import {open} from 'sqlite';

import Const from "../../../../app_config"
//
export async function post(req, res) {
  try{
    var data = req.body
    var id = data.id 
console.log("id=" , id)    
    var ret ={ id:1 } 
    var dbFile = Const.get_config().DB_FILE_NAME    
    const db = await open(
      {filename: dbFile , driver: sqlite3.Database}
    );
    const result = await db.run(
      'delete from tasks WHERE id = ?',
      id
    )      
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(ret));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
  }  
}
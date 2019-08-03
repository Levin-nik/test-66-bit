import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Test.db";
const database_version = "1.0";
const database_displayname = "SQLite";
const database_size = 200000;

export default class Database {
  initDB() {
    let db;
    return new Promise((resolve) => {
      SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size
      ).then(DB => {
        db = DB;
        db.executeSql('SELECT 1 FROM News LIMIT 1').then(() => {
          resolve(db)
        }).catch((error) => {
          db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS News (id, title, content)');
          }).then(() => {
            resolve(db)
          })
        });
      })
    })
  }

  closeDatabase(db) {
    if (db) {
      db.close()
    }
  };

  getNews() {
    return new Promise((resolve) => {
      const news = [];
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM News', []).then(([tx, results]) => {
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              const { id, title, content } = row;
              news.push({
                id,
                title,
                content
              });
            }
            resolve(news);
          });
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  addNews(news) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('DELETE FROM News').then(() => {
            news.forEach(element => {
              db.transaction((tx) => {
                tx.executeSql(
                  'INSERT INTO News VALUES (?, ?, ?)',
                  [element.id, element.title, element.content])
              })
            });
          })
        }).then(() => {
          resolve()
        })
      }).catch((err) => {
        console.log(err);
      });
    });
  }
}
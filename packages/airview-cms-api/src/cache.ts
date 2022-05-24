import sqlite from "sqlite3";
import { CmsCache } from "interfaces.js";

const db_file = process.env.CACHE_DB;
if (db_file === undefined) throw Error("No cache db file defined");

const _db = new sqlite.Database(db_file);

_db.run(
  "CREATE TABLE if not exists cache (key TEXT UNIQUE, value TEXT, ts NUMBER)"
);
_db.run("PRAGMA journal_mode = WAL");

_db.run(
  "CREATE VIRTUAL TABLE if not exists content_search USING fts5(treeSha, fileSha, entryId, title, content);"
);
_db.run(
  "CREATE TABLE if not exists branch_map (treeSha TEXT, fileSha TEXT, branchSha TEXT, UNIQUE(treeSha,fileSha,branchSha) ) ;"
);

_db.run("CREATE TABLE if not exists processed_branches(sha TEXT);");

export class SqliteCache implements CmsCache {
  async get(key: string): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      const ts = new Date().getTime();
      _db.get(
        "SELECT value FROM cache where key = (?) and (ts > (?) or ts is null)",
        key,
        ts,
        (err: Error, row: any): any => {
          if (err) {
            return reject(err);
          }
          if (row) {
            resolve(JSON.parse(row.value));
          }
          resolve(undefined);
        }
      );
    });
  }

  async set(key: string, value: any, expireSecs?: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const ts =
        expireSecs == undefined
          ? null
          : new Date().getTime() + expireSecs * 1000;
      _db.run(
        "INSERT INTO cache(key, value, ts) VALUES ($key, $val, $ts) ON CONFLICT(key) DO UPDATE SET value=$val, ts=$ts",
        { $key: key, $val: JSON.stringify(value), $ts: ts },
        (err: Error) => {
          if (err) {
            return reject(err);
          }
          resolve();
        }
      );
    });
  }

  async expire(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      _db.run("DELETE FROM cache WHERE key=(?)", key, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  async query(branch: string, query: string) {
    return new Promise((resolve, reject) => {
      _db.all(
        "select s.entryId, s.title, s.content, snippet(content_search, 4, '*', '*', '...', 64) snip from content_search s join branch_map m on m.treeSha=s.treeSha and m.fileSha=s.fileSha where m.branchSha =$branchSha and s.content match $query order by rank limit 20;",
        { $branchSha: branch, $query: query },
        (err, row) => {
          if (err) {
            reject(err);
          }
          if (row) {
            resolve(row);
          }
          resolve([]);
        }
      );
    });
  }
}
// export default { get, set, expire, query };

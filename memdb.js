const fs = require('fs');
const {v4: uuidv4} = require('uuid');

class memdb {

    constructor(path) {
        if (path === undefined) this.db = [];
        else {
            try {
              let json = fs.readFileSync(path).toString()
              // console.log(json)
              this.db = JSON.parse(json);
            } catch (x) {
                throw x;
            }

        }
    }

    isJSONObject(obj) {
        return obj !== undefined && obj !== null && obj.constructor == Object;
    }

    insert(obj) {
        if (!this.isJSONObject(obj)) throw new Error('Not an object');
        obj.memDBID = uuidv4();
        this.db.push(obj);
        return obj.memDBID;
    }

    select(obj) {
        if (obj === undefined) return this.db;
        else {
            if (Object.keys(obj).indexOf('where') === -1 || !this.isJSONObject(obj)) throw new Error('Query error');
            /*return this.db.filter((x) => {
                return x[Object.keys(obj.where)[0]] === obj.where[Object.keys(obj.where)[0]];
            });*/
            return this.inSelect(obj.where);
        }
    }

    inSelect(obj) {
        let a = this.db.filter((x) => {
            return x[Object.keys(obj)[0]] === obj[Object.keys(obj)[0]];
        })
        for (let i = 1; i < Object.keys(obj).length; i++) {
            a = a.filter((x) => {
                return x[Object.keys(obj)[i]] === obj[Object.keys(obj)[i]];
            })
        }
        return a;
    }

    update(obj) {
        if (Object.keys(obj).indexOf('where') === -1 || Object.keys(obj).indexOf('set') === -1 || !this.isJSONObject(obj)) throw new Error('Query error');
        /*let a = this.db.filter((x) => {
            return x[Object.keys(obj.where)[0]] === obj.where[Object.keys(obj.where)[0]];
        });*/
        let a = this.inSelect(obj.where);
        const set = obj.set;
        a.forEach(_a => {
            Object.keys(set).forEach(_set => {
                _a[_set] = set[_set];
            })
        });
        return a;
    }

    delete(obj) {
        if (Object.keys(obj).indexOf('where') === -1 || !this.isJSONObject(obj)) throw new Error('Query error');
        console.log('DELETE Before:', this.db.length);
        this.db = this.db.filter((x) => {
            //console.info(obj.where[Object.keys(obj.where)[0]]);
            let matches = true;
            Object.keys(obj.where).forEach((key)=>{
              // console.log('key:', key, 'where:',obj.where[key]);
              if(matches){
                // console.log('MATCHES obj.where[key]:', obj.where[key], 'obj.where[key]:', obj.where[key]);
                // console.log('MATCHES obj.where[key]:', typeof obj.where[key], 'obj.where[key]:', typeof obj.where[key]);
                matches = (''+x[key]) == (''+obj.where[key]);
              }else{
                // console.log('NOT MATCH obj.where[key]:', obj.where[key], 'obj.where[key]:', obj.where[key]);
                // console.log('NOT MATCH obj.where[key]:', typeof obj.where[key], 'obj.where[key]:', typeof obj.where[key]);
              }
            })
            return !matches;
        });
        console.log('DELETE After:', this.db.length);
        //return this.db;
    }

    truncate() {
        this.db = [];
    }

    save(path) {
          console.log('saving...');
      
        if (path === null || path === undefined) throw new Error('Path is missing');
        try {
            const a = fs.createWriteStream(path);
            a.write(JSON.stringify(this.db, null, 2));
            a.end();
          // console.log('Saved: ', this.db);
        } catch (x) {
          console.log('Error: ', x);
            throw x;
        }

    }
}

module.exports = memdb;
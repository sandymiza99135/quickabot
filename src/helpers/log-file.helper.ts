export class LogFileHelper {
    fs: any = null;
    constructor() {
        this.fs = require('fs')
    }

    writeSentence(serviceName:string, sentence:string) {
        let fs = this.fs;
        let fileName = serviceName + '.txt';
        /* let logStream = fs.createWriteStream(fileName, {flags: 'a'});
        logStream.write(sentence); */
        fs.exists(process.cwd() + '\\text\\'  + fileName , function (exists) {
            if (!exists) { // doesn'exist so create a new one
                 //'createFile' to create the first line
                 fs.writeFile(process.cwd() + '\\text\\'  + fileName, sentence, 'utf8', (err) => {
                    if (err) {
                        console.log('Error '+ fileName +' file either not saved or corrupted file saved.'); 
                    } else {
                        console.log(fileName + ' file created successfully!');
                    }
                });
            } else if (exists) { // exists
                 // Use the 'fs' to append the new data
                 let logStream = fs.createWriteStream(process.cwd() + '\\text\\' + fileName , {flags: 'a', encoding: 'utf8'});
                 logStream.write("\r\n" + sentence);
                 logStream.end();
                 console.log(fileName + ' file appended successfully!');
            }
     
        });
    }

    /* private createFile(filename, content, callback){
        // use 'fs' to write a new file (3 params + callback)
        this.fs.writeFile(filename, content, 'utf8', (err) => {
            if (err) {
                console.log('Error '+ filename +' file either not saved or corrupted file saved.');
                callback(0);
            } else {
                console.log(filename + ' file created successfully!');
                callback(1);
            }
        });
    } */

}
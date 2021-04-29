window.backLogs = {
    c: [],
    e: [],
    o: [],
};

export default function debug(mode) {
    if(mode) {
        window.log = {
            c: (...args) => { console.log(...args);   }, //default
            e: (...args) => { console.error(...args); }, //errors
            o: (...args) => { console.dir(...args);   }, //objects
        };

        if(window.backLogs.c.length > 0)  for(i in window.backLogs.c) log.c(...window.backLogs.c[i]);
        if(window.backLogs.e.length > 0)  for(i in window.backLogs.e) log.e(...window.backLogs.e[i]);
        if(window.backLogs.o.length > 0)  for(i in window.backLogs.o) log.o(...window.backLogs.o[i]);

        window.backLogs = { c: [], e: [], o: [] };
    } else {
        window.log = {
            c: (...args) => { 
                let _temp = [];
                for(let i in args) _temp.push(args[i]);
                window.backLogs.c.push(_temp);
            },
            e: (...args) => { 
                let _temp = [];
                for(let i in args) _temp.push(args[i]);
                window.backLogs.e.push(_temp);
            },
            o: (...args) => { 
                let _temp = [];
                for(let i in args) _temp.push(args[i]);
                window.backLogs.o.push(_temp);
            }
        }
    }
}
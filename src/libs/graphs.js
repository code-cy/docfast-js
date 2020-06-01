const {Factory,Component, Code} = require('./markdown-js-template');
/**
 * 
 * @param {Factory} definer 
 */
function GraphDefiner(definer){
    var def = definer;
    /**
     * @param {(digram:{addTable:(name:string,callback:(
                        (table:{addProp:(name:string)=>void,
                        addMethod:(name:string)=>void,
                        arrowLeft:(tableName:string)=>void,
                        arrowRight:(tableName:string)=>void })=>void)=>void)=>void})=>void} callback
     */
    this.classDiagram=(callback)=>{
        var model = new ClassDiagram.Table('Model');
        var digram = new ClassDiagram({},[model]);
        def.addChild(digram);
        callback({            
            addTable(name,callback){
                var table = new ClassDiagram.Table(name);
                digram.addChild(table);
                callback({
                    addProp(name){
                        //todo
                    },
                    addMethod(name){
                        //todo
                    },
                    arrowLeft(tableName){
                        //todo
                    },
                    arrowRight(tableName){
                        //todo
                    }
                })
            }
        })
    }
}   

class ClassDiagram extends Factory{
    static Table = class Table extends Factory{
        constructor(name){
            super({},[]);
            this.name = name;
        }
        //todo
    }
    
    static TableProp = class TableProp extends Factory{
        constructor(name){
            super({},[]);
            this.name = name;
        }
        //todo
    }

    static TableMethod = class TableMethod extends Factory{
        constructor(name){
            super({},[]);
            this.name = name;
        }
        //todo
    }

    static TableArrowLeft = class TableArrowLeft extends Factory{
        constructor(){
            super({},[]);            
        }
        //todo
    }

    static TableArrowRigth = class TableArrowRigth extends Factory{
        constructor(){
            super({},[]);
            
        }
        //todo
    }

    toString(){
        //todo
        return ""
    }
}

class MermaidGraph extends Factory{   
    /**
     * 
     * @param {(graph:GraphDefiner)=>void} callback 
     */
    constructor(callback){
        var def = new Factory({},[]);
        var graph = new GraphDefiner(def);        
        callback(graph);        
        super({},[Code({lang:'mermaid'},def.render())])
    }
}


module.exports.MermaidGraph = ()=> new MermaidGraph()
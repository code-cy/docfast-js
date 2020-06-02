const { Factory, Component, Code } = require('../markdown-js-template');
/**
 * 
 * @param {Factory} def 
 */
function GraphDefiner(def) {
    /**
     * @param {(diagram: {
                    addTable: (name: string,
                        callback: (     
                               table: {  
                                    addProp:(type: string, name: string)=>void,
                                    addMethod:(name: string)=>void,
                                    arrowLeft:(tableName: string)=>void,
                                    arrowRight:(tableName: string)=>void
                                }
                        )=>void
                    )=>void
            })=>void} callback
        @param {string} origin
     */
    this.classDiagram = (origin, callback) => {
        var diagram = new ClassDiagram({}, []);
        var model = new ClassDiagram.Table(origin);
        
        diagram.addChild(model);             
        def.addChild(diagram);
        callback({
            addTable(name, callback) {
                var table = new ClassDiagram.Table(name);
                var arrow = new ClassDiagram.TableArrowLeft(origin);
                table.addChild(arrow)
                diagram.addChild(table);
                callback({
                    addProp(type, name) {
                        table.addChild(new ClassDiagram.TableProp(type, name))
                    },
                    addMethod(name) {
                        table.addChild(new ClassDiagram.TableMethod(name))
                    },
                    arrowLeft(tableName) {
                        var arrowl = new ClassDiagram.TableArrowLeft(tableName);                        
                        table.addChild(arrowl)
                    },
                    arrowRight(tableName) {
                        var arrowr = new ClassDiagram.TableArrowRigth(tableName);                        
                        table.addChild(arrowr)
                    }
                })
            }
        })
    }
}

class ClassDiagram extends Factory {
    static Table = class Table extends Factory {
        constructor(name) {
            super({}, []);
            this.name = name;
        }

        renderPerChildren(str) {
            return `${this.newElement()}${this.name} ${str}${this.endElement()}`
        }

        endElement() {
            return "\n"
        }
    }

    static TableProp = class TableProp extends Factory {
        constructor(type, name) {
            super({}, []);
            this.name = name;
            this.type = type;
        }
        toString() {
            return `: ${this.type} ${this.name}`;
        }
    }

    static TableMethod = class TableMethod extends Factory {
        constructor(name) {
            super({}, []);
            this.name = name;
        }
        toString() {
            return `: ${this.name}()`;
        }
    }

    static TableArrowLeft = class TableArrowLeft extends Factory {
        constructor(tableName) {
            super({}, []);
            this.tableName = tableName;
        }
        toString() {
            return "<-- "+this.tableName;
        }
    }

    static TableArrowRigth = class TableArrowRigth extends Factory {
        constructor(tableName) {
            super({}, []);
            this.tableName = tableName;

        }
        toString() {
            return "--> "+this.tableName;
        }
    }

    toString() {
        return "classDiagram";
    }

    renderPerChildren(str, k, child) {
        return str + this.endElement();
    }

    addChild(child) {
        child.props.tabs += 1;
        super.addChild(child);
    }

    endElement() {
        return "\n";
    }
}

class MermaidGraph extends Factory {
    /**
     * 
     * @param {(graph:GraphDefiner)=>void} callback 
     */
    constructor(callback) {
        var def = new Factory({}, []);
        var graph = new GraphDefiner(def);
        callback(graph);
        super({}, [Code({ lang: 'mermaid' }, def.render())])
    }
}

/**
* 
* @param {(graph:GraphDefiner)=>void} callback 
*/
module.exports.MermaidGraph = (callback) => new MermaidGraph(callback)
const Component = require('./src/Component');

class Base extends Component {
    static propsDef = {
        style: {
            color: "",
        }
    }
    htmlMode = false;
    constructor(props,children){
        super(props,children);
        this.htmlMode = props.html;
    }
    htmlNode(){
        return "Base"
    };
    toString() {
        if (this.props.style || this.htmlMode) {
            this.htmlMode = true;
            return `<${this.htmlNode()} ${Object.keys(this.props).map(p => this.props[p] && p !== 'style' && p !== 'h' &&  p !== 'tabs' ? `${p}="${this.props[p]}"` : "").join(' ')} style="${this.props.style?Object.keys(this.props.style).map(p => `${p}:${this.props.style[p]};`).join(''):""}">\n` + super.toString();
        }
        return super.toString();
    }

    render() {
        if (this.children)
            if (typeof this.children.map === 'function')
                this.children.forEach(child => {
                    if (child instanceof Component) {
                        if (this.props.style || this.htmlMode)
                        child.htmlMode = true;
                    }
                })
        return super.render();
    }

    renderEnd() {
        if (this.props.style || this.htmlMode)
            return `</${this.htmlNode()}>\n`
        return super.renderEnd();
    }

    addParent(parent) {   
        
        if (parent.props.style || parent.htmlMode)
            this.htmlMode = true;        
        super.addParent(parent);
    }

    base(child) {
        return new Container({}, child);
    }
}


class Container extends Base {
    htmlNode(){
        return "container"
    } 
    render() {
        if (this.parent instanceof NumList ||
            this.parent instanceof List)
            this.props.tabs += 1;
        return super.render();
    }
    renderPerChildren(str, key, child) {
        if ((this.parent instanceof NumList ||
            this.parent instanceof List) && (key == 0 && !(child instanceof Title)))
            return str + this.endElement();
        return super.renderPerChildren(str, key, child);
    }

    

}

class P extends Base {
    htmlNode(){
        return "p"
    }
    toString() {
        if (this.props.style || this.htmlMode)
            return super.toString();
        return this.newElement() + super.toString();
    }

    renderEnd() {
        if (this.props.style || this.htmlMode)
            return super.renderEnd();
        return this.endElement()
    }
}



class Title extends Base {
    static propsDef = {
        h: 1,
        style: Base.propsDef.style
    }

    htmlNode(){
        return "h" + this.props.h;
    }

    constructor(props, children) {
        super(props, children)
        
    }
    toString() {
        if (this.props.style || this.htmlMode) {
            return super.toString();
        }
        let t = "#"
        for (let i = 1; i < this.props.h; i++) {
            t += "#";
        }
        return t + " " + super.toString();
    }

    renderEnd() {
        if (this.props.style || this.htmlMode)
            return super.renderEnd();
        return "\n";
    }
}

class Table extends Base{
    
    static TableBody = class TableBody extends Base{
        htmlNode(){
           return "tbody"
        }
    }
    
    htmlNode(){
        return "table"
    }

    constructor(props,thead, tbody){
        var th = new TableHeader({},thead);
        var tb = new Table.TableBody({},tbody);
        super(props,[th,tb]);
        this.thead = th;
        this.tbody = tb;
    }

    addData(props,data){
        this.tbody.children.push([new TableData(props,data)]);
    }
}

class TableData extends Base {
    htmlNode(){
        return "tr"
    }    
    toString() {
        if (this.props.style || this.htmlMode){
            return super.toString();
        }
        return this.newElement() + "|";
    }
    renderPerChildren(child, k) {
        if (this.props.style || this.htmlMode){
            return `<td>${child}</td>`
        }
        return `${child}|`;
    }
    renderEnd() {
        if (this.props.style || this.htmlMode){
            return super.renderEnd();
        }
        return this.endElement();
    }
}

class TableHeader extends TableData {
    htmlNode(){
        return "thead"
    }

    renderPerChildren(str,k,child){
        if (this.props.style || this.htmlMode){
            return `<th>${str}</th>`;
        }
        return super.renderPerChildren(str,k,child);
    }
    
    renderEnd() {
        if (this.props.style || this.htmlMode){
            return super.renderEnd();
        }
        return "\n" + this.newElement() + "|" + this.children.map(i => `----`).join('|') + "|" + this.endElement();
    }
}


class B extends Base {
    static propsDef = {
        style: Base.propsDef.style
    }
    htmlNode(){
        return "b"
    } 
    toString() {
        if (this.props.style || this.htmlMode)
            return super.toString();
        return `**${super.toString()}**`;
    }
}

class L extends Base {
    static propsDef = {
        style: Base.propsDef.style
    }
    htmlNode(){
        return "i"
    }
    toString() {
        if (this.props.style || this.htmlMode)
            return super.toString();
        return `*${super.toString()}*`
    }
}

class Link extends Base {
    htmlNode(){
        return "a"
    }
    toString() {
        if (this.props.style || this.htmlMode)
            return super.toString();
        return `[${super.toString()}](${this.props.href})`
    }
}

class NumList extends Base {
    htmlNode(){
        return "ol"
    } 
    renderPerChildren(child, k, item) {
        if (this.props.style || this.htmlMode)
            return `<li>${child}</li>`;
        return this.endElement() + this.newElement() + `${k + 1}. ${child}`;
    }

    renderEnd() {
        if (this.props.style || this.htmlMode)
            return super.renderEnd();
        return (this.props.tabs == 0) ? this.endElement() : "";
    }

}

class List extends Base {
    htmlNode(){
        return "ul"
    } 
    renderPerChildren(child, k, item) {
        if (this.props.style || this.htmlMode)
            return `<li>\n\n${child}</li>\n\n`;
        return this.endElement() + this.newElement() + `- ${child}`;
    }

    renderEnd() {
        if (this.props.style || this.htmlMode)
            return super.renderEnd();
        return (this.props.tabs == 0) ? this.endElement() : "";
    }
}

class Br extends Base {
    htmlNode(){
        return "br"
    } 
    renderEnd() {
        if (this.props.style || this.htmlMode)
            return super.renderEnd();
        return this.endElement() + this.newElement();
    }
}

class Code extends Base {
    htmlNode(){
        return "code"
    } 
    toString() {
        if (this.props.style || this.htmlMode)
            return super.toString();
        return this.newElement() + "```" + this.props.lang + this.endElement() +
            this.children.split('\n').map(i => this.newElement() + i).join(this.endElement()) + this.endElement()
            + this.newElement() + "```";
    }

}

class C extends Base {
    htmlNode(){
        return "code"
    } 
    toString() {
        if (this.props.style || this.htmlMode)
            return super.toString();
        return "`" + super.toString() + "`"
    }
}

class Comp extends Component {
    /**
     * 
     * @param {Component.propsDef} props 
     * @param {any} children 
     */
    constructor(props, children) {
        super(props, children)
    }
    /**
     * @return {String}
     */
    toString() {
        return super.toString();
    }
    /**
     * @return {String}
     */
    render() {
        return super.render();
    }

    /**
     * 
     * @param {String} str 
     * @param {Number} key 
     * @param {Component} child 
     * @return {String}
     */
    renderPerChildren(str, key, child) {
        return super.renderPerChildren(str, key, child);
    }

    /**
     * 
     * @param {any} child
     * @return {Comp} 
     */
    base(child) {
        return new Comp({}, child);
    }
}



module.exports = {   

    Component: Base,
    Factory: Comp,
    
    /**
     * @param {Component.propsDef} props
     * @param {Component[]} children
     * @returns {Container}
     */
    Container: (props, children) => new Container(props, children),

    /**
     * @param {Component.propsDef} props
     * @param {Component[]} children
     * @returns {Title}
     */
    Title: (props, children) => new Title(props, children),

    /**
     * @param {Component.propsDef} props
     * @param {Component[]} children
     * @returns {TableData}
     */
    TableData: (props, children) => new TableData(props, children),

    /**
     * @param {Component.propsDef} props
     * @param {Component[]} children
     * @returns {TableHeader}
     */
    TableHeader: (props, children) => new TableHeader(props, children),

    /**
     *  @param {Component.propsDef} props
     *  @param {string[]} headers
     *  @param {TableData[]} tableDatas
     *  @return {Table}
     */
    Table: (props,headers,tableDatas) => new Table(props,headers,tableDatas),
    
    /** 
     * @param {string} children
     * @returns {B}
     */
    B: (children) => new B({}, children),

    /**     
     * @param {string} children
     * @returns {L}
     */
    L: (children) => new L({}, children),

    /**     
     * @param {string} children
     * @returns {C}
     */
    C: (children) => new C({}, children),

    /**
     * @param {Component.propsDef} props
     * @param {Component[]} children
     * @returns {Link}
     */
    Link: (props, children) => new Link(props, children),

    /**
     * @param {Component.propsDef} props
     * @param {Component[]} children
     * @returns {NumList}
     */
    NumList: (props, children) => new NumList(props, children),

    /**
     * @param {Component.propsDef} props
     * @param {Component[]} children
     * @returns {P}
     */
    P: (props, children) => new P(props, children),

    /**     
     * @returns {Br}
     */
    Br: () => new Br({}, ""),

    /**
     * @param {Component.propsDef} props
     * @param {Component[]} children
     * @returns {LiList}
     */
    List: (props, children) => new List(props, children),

    /**
     * @param {Component.propsDef} props
     * @param {string} code
     * @returns {Code}
     */
    Code: (props, code) => new Code(props, code),

}
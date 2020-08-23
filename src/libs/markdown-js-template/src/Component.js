/**
 * @module Component
 */
/** Class Component */
module.exports = class Component {


    static propsDef = {
        tabs: 0,
        h: 1,
        lang: "",
        href: '',
        src: '',
    }
    /**
     * @param {Component.propsDef} props
     * @param {Component[]} children
     *  
     */
    constructor(props, children = []) {
        this.children = children;
        this.props = props;
        //defaul props
        this.props.tabs = props.tabs ? props.tabs : 0;
        this.props.h = props.h ? props.h : 1;
        this.props.lang = props.lang ? props.lang : "";
        this.props.href = props.href ? props.href : "";
        this.parent = null;
        if (children instanceof Array)
            children.forEach(i => {
                if (i instanceof Component) {
                    i.addParent(this);
                }
            });
    }

    addChild(child) {
        if (child) {
            if (child instanceof Array)
                child.forEach(i => {
                    this.children.push(i);
                })
            else
                this.children.push(child);
        }
    }

    addParent(parent) {
        this.parent = parent;
    }

    /**
     * @returns {string}
     */
    toString() {
        if (this.children instanceof Object)
            return "";
        return `${this.children}`;
    }

    /**
     * 
     * @param {string} child 
     * @param {number} key
     * @returns {string}
     */
    renderPerChildren(child, key, item) {
        return child;
    }

    /**
     * @returns {string}
     */
    renderEnd() {
        return "";
    }

    tabs() {
        let sub = "";
        for (let i = 1; i <= this.props.tabs; i++) {
            sub += '   ';
        }
        return sub;
    }

    newElement() {
        return this.tabs();
    }

    endElement() {
        return "\n";
    }


    async render() {
        if (this.parent instanceof Component)
            this.props.tabs += this.parent.props.tabs;
        var container = "";
        if (!(typeof this.children === 'string')) {
            if(this.children instanceof Promise){
                this.children = await this.children;
            }
            if (this.children instanceof Array) {
                for (var i in this.children) {                   
                    var obj = this.children[i];
                    if (obj instanceof Promise)
                        obj = await obj;
                    if (obj instanceof Function) {
                        var d = obj();
                        if (!d) break;
                        if(d instanceof Promise) d = await d;
                        if (d instanceof Component) {
                            d.addParent(this);
                            container += await this.renderPerChildren( await d.render(), i, d);
                        }
                        var c = this.base(d);
                        c.addParent(this);
                        container += await this.renderPerChildren(await c.render(), i, c);
                    }
                    if (obj instanceof Component)
                        container += await this.renderPerChildren(await obj.render(), i, obj);
                    if (obj instanceof Array) {
                        var c = this.base(obj);
                        c.addParent(this);
                        container += await this.renderPerChildren(await c.render(), i, c);
                    }
                    if(typeof obj === 'string' && obj){
                        container += this.renderPerChildren(obj, i, obj);
                    }
                }                
            }
        }
        return this.toString() + container + this.renderEnd();
    }

    base(child) {
        return new Component({}, child);
    }    

    typer() {

    }
}


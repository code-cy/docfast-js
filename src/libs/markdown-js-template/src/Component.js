/**
 * @module Component
 */
/** Class Component */
module.exports = class Component{

    
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
    constructor(props,children = []){
        this.children=children;
        this.props = props;
        //defaul props
        this.props.tabs = props.tabs?props.tabs:0;
        this.props.h = props.h?props.h:1;        
        this.props.lang = props.lang?props.lang:"";
        this.props.href = props.href?props.href:"";
        this.parent = null;
        if((typeof children==='object')){
            if(typeof children.forEach=== 'function')
                children.forEach(i=>{
                    if(i instanceof Component){
                        i.addParent(this);
                    }                    
                });
        }        
    }

    addChild(child){
        if(child){
            if(child instanceof Array)
                child.forEach(i=>{
                    this.children.push(i);
                })
            else
                this.children.push(child);
        }
    }

    addParent(parent){
        this.parent = parent;        
    }

    /**
     * @returns {string}
     */
    toString(){
        if(typeof this.children === 'object')
            return "";        
        return `${this.children}`;        
    }

    /**
     * 
     * @param {string} child 
     * @param {number} key
     * @returns {string}
     */
    renderPerChildren(child,key,item){
        return child;
    }

    /**
     * @returns {string}
     */
    renderEnd(){
        return "";
    }

    tabs(){
        let sub="";
        for(let i=1;i<=this.props.tabs;i++){
            sub+='   ';
        }
        return sub;
    }

    newElement(){
        return this.tabs();
    }

    endElement(){
        return "\n";
    }
    /**
     * @return {string}
     */
    render(){     
        if(this.parent instanceof Component)
            this.props.tabs += this.parent.props.tabs;  
        var d="";
        if(!(typeof this.children === 'string')){
            if(typeof this.children.map === 'function')
                d = this.children.map((i,k)=>{
                    if(!i) return "";
                    if(typeof i === 'function'){
                        var d = i();
                        if(!d)return "";
                        if(d instanceof Component) {
                            d.addParent(this);
                            return this.renderPerChildren(d.render(),k,d);  
                        }                 
                        var c = this.base(d);
                        c.addParent(this);                                                                  
                        return this.renderPerChildren(c.render(),k,c);                                           
                    }
                    if(i instanceof Component)            
                        return this.renderPerChildren(i.render(),k,i);                    
                    if(typeof i.map === 'function'){
                        var c = this.base(i);
                        c.addParent(this);                                                                  
                        return this.renderPerChildren(c.render(),k,c);
                    }                                    
                    return this.renderPerChildren(i,k,i);   
                }).join(''); 
        }        
        return this.toString()+d+this.renderEnd();
    }

    base(child){
        return new Component({},child);
    }

    typer(){
        
    }
}


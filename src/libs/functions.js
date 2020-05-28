/**
 * 
 * @param {any} rel source
 * @param {string} name 
 * @param {any} obj 
 * @param {any} result 
 */
function jsonExample(rel,name, obj, result) {
    if (typeof obj.ref === 'string') {
        var item = getRefRel(rel,obj.ref);
        if(item)
            jsonExample(rel,name, item.ref, result);
    } else {
        if (obj.type === 'string' || obj.type === 'number' || obj.type === 'array') {
            if (obj.type === 'array') {
                if (obj.items instanceof Object) {
                    if (typeof obj.items.ref === 'string') {
                        var item = getRefRel(rel,obj.items.ref);
                        if (item.ref instanceof Array) {
                            result[name] = item.ref;                            
                        }
                    }
                } else if (obj.items instanceof Array) {
                    result[name] = obj.items;
                }
            } else
                if (obj.enum instanceof Array)
                    result[name] = obj.enum[0];
                else
                    if (obj.example)
                        result[name] = obj.example;
                    else if(obj.rules)
                        result[name] = obj.rules;
                    else
                        result[name] = obj.type;
        }
        if (obj.type === 'object') {
            result[name] = {};
            Object.keys(obj.props).forEach(key => {
                jsonExample(rel,key, obj.props[key], result[name]);
            })
        }
    }
}
/**
 * 
 * @param {any} rel source
 * @param {string} ref 
 * @param {*} find 
 */
function getRefRel(rel,ref,find = false) {
    if (ref) {
        var props = ref.split('.');
        var result = rel;
        var name = "";
        for(var i in props){                
            if (!result[props[i]]) return;
            result = result[props[i]];
            name = props[i];
        };
        return {
            ref: result,
            name
        };
    }
}
/**
 * 
 * @param {any} rel source
 * @param {Object} route 
 * @param {any} ref 
 */
function extend(rel,route, ref = null) {
    if (typeof route.extend === 'string') {
        var item = getRefRel(rel,route.extend);             
        delete route.extend;
        extend(rel,item.ref)
        Object.keys(item.ref).forEach(prop => {
            if (!route[prop]) {
                route[prop] = item.ref[prop];                
                if (route[prop] instanceof Object)
                    extend(rel,route[prop]);
            } else {
                if (route[prop] instanceof Object) {
                    extend(rel,route[prop], item.ref[prop]);
                }
            }
        })
    }
    if (ref instanceof Object) {
        Object.keys(ref).forEach(prop => {
            if (!route[prop]) {
                route[prop] = ref[prop];
                if (route[prop] instanceof Object)
                    extend(rel,route[prop]);
            } else {
                if (route[prop] instanceof Object) {
                    extend(rel,route[prop], ref[prop]);
                }
            }
        })
    }
}


module.exports={
    extend, 
    jsonExample,
    getRefRel,
}
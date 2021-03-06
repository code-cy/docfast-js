const {
    Container,
    C, Title, L,
    P, Link, B, Br, List, Code,
    Table,
    Component,
} = require('../libs/markdown-js-template');
const langs = require('../libs/langs');
const fs = require('fs-extra');


module.exports = function (_s) {
    const source = _s;
    const code = source.code;
    const lang = langs[source.lang];
    const source_enums = {};
    const source_funs = {};
    const source_classes = {};
    const source_interfaces = {};

    const find_objects = (objs, fun, namespace = "") => {
        Object.keys(objs).forEach((key) => {
            fun(key, objs[key], namespace)
            var np = fnNamespace(namespace, key);
            if (objs[key].objects)
                find_objects(objs[key].objects, fun, np)
        })
    }

    const href = (hr) => {
        return hr.replace('.', '').trim().toLowerCase();
    }

    const BPrefix = (obj) => {
        return obj.prefix ? obj.prefix.split(' ').map(v => B(v)).join(' ') : ' ';
    }

    const decapritable = (name, obj) => {
        return obj.decapricated ? `~~${name}~~` : name;
    }

    const codeFile = async (code) => {
        if (code)
            return await fs.readFile(code instanceof Object ? code.file : code, 'utf-8').then(data => {
                return data;
            }).catch(err => {
                console.log(err);
            });
    }

    const goToRef = (src, path) => {
        let paths = path.split('.');
        if (paths.length == 1) {
            return src.objects[paths[0]];
        }
        if (src.objects[paths[0]]) {
            return goToRef(src.objects[paths[0]], paths.slice(1).join('.'));
        }
    }

    const hrefFunctionsParams = (fun) => {
        return fun.params instanceof Object ? Object.keys(fun.params).join('') : '';
    }
    const functionParamsWithLinkType = (fun) => {
        return fun.params instanceof Object ? '(' + Object.keys(fun.params).map(p => {
            const target = goToRef(source, fun.params[p]);
            const link = target ? Link({ href: href(`#${target.type}-${fun.params[p]}`) }, fun.params[p]) : fun.params[p];
            return [B(p), link].join(': ')
        }).join(', ') + ')' : typeof fun.params === 'string' ? '()' : '';
    }

    const descriptableTable = (name, namespace, table, container, group, tag, tank, render) => {
        let arr = group instanceof Object ? Object.keys(group) : group instanceof Array ? group : null;
        if (arr instanceof Array) {
            arr.forEach((item) => {
                let itemName = isNaN(item) ? item : Object.keys(container.functions[item]).join('');
                let obj = !(group instanceof Array) ? group[itemName] : container.functions[item] instanceof Object ? container.functions[item][itemName] : null;
                let names = itemName
                if (obj) {
                    table.addData({}, [
                        Link({
                            href: href(`#${tag}-${fnNamespace(namespace, name) + "." + itemName
                                + (tag === 'function' ? hrefFunctionsParams(obj) : '')
                                }`)
                        }
                            , decapritable(names, obj)),
                        (tag === 'function' ? functionParamsWithLinkType(obj) : ''),
                        (tag === 'function' ? obj.return : ''),
                        B(fnNamespace(namespace, name)),
                        obj.description
                    ]);
                    tank[fnNamespace(namespace, name) + "." + itemName] = () => {
                        return render(itemName, obj, fnNamespace(namespace, name));
                    };
                }
            })
        }
    }

    const validationsByPrefix = (clazz, extend, component) => {
        return (((!extend) || (extend && (component.prefix.search('public') > -1 || component.prefix.search('protecte') > -1))) &&
            (extend ? (extend.prefix.search('static') > -1 && component.prefix.search('static') > -1) : true) &&
            (!(clazz.prefix.search('static') > -1) || ((clazz.prefix.search('static') > -1) && component.prefix.search('static') > -1)));
    }

    const addProps = (clazz, props, extend = false) => {
        if (clazz.props instanceof Object) {
            Object.keys(clazz.props).forEach((propName) => {
                const prop = clazz.props[propName];
                let link;
                if (typeof prop === "string") {
                    if (extend ? extend.prefix.search('static') == -1 : true && clazz.prefix.search('static') == -1) {
                        let target = goToRef(source, prop);
                        link = target ? Link({ href: href(`#${target.type}-${prop}`) }, prop) : prop;
                        props.addData({}, [decapritable(propName, prop), link, B('public'), ' '])
                    }
                } else
                    if (prop instanceof Object) {
                        let target = goToRef(source, prop.type);
                        link = target ? Link({ href: href(`#${target.type}-${prop.type}`) }, prop.type) : prop.type;
                        if (validationsByPrefix(clazz, extend, prop))
                            props.addData({}, [decapritable(propName, prop), link, BPrefix(prop), prop.description])
                    }
            })
        }
    }

    const addMethods = (clazz, methods, extend = false) => {
        if (clazz.methods instanceof Array) {
            clazz.methods.forEach((cont) => {
                const methodName = Object.keys(cont)[0];
                const method = cont[methodName];
                if (method instanceof Object) {
                    const return_target = goToRef(source, method.return);
                    const return_link = return_target ? Link({ href: href(`#${return_target.type}-${method.return}`) }, method.return) : method.return;
                    const params = functionParamsWithLinkType(method);
                    if (validationsByPrefix(clazz, extend, method))
                        methods.addData({}, [decapritable(methodName, method), params, return_link, BPrefix(method), method.description])
                }
            })
        }
    }

    const fnNamespace = (namespace, key) => {
        return namespace + (namespace != "" ? '.' : "") + key;
    }

    const enumRender = (name, obj, namespace) => {

    }

    const funRender = (name, obj, namespace) => { }

    const classRender = async (name, clazz, namespace) => {
        const props = Table({}, [lang.name, lang.type, 'Prefix', lang.description])
        const methods = Table({}, [lang.name, 'Params', 'Return', 'Prefix', lang.description])
        const constructors = Table({}, [lang.name, 'Params'])

        if (clazz.constructor instanceof Array && clazz.type === 'class' && (clazz.prefix.search('static') == -1)) {
            clazz.constructor.forEach(constr => {
                if (constr instanceof Object) {
                    const params = functionParamsWithLinkType(constr)
                    constructors.addData({}, [decapritable(name, constr), params])
                }

            })
        }

        const extendsPaths = (extend) => {
            if (extend instanceof Object) {
                addProps(extend, props, clazz);
                addMethods(extend, methods, clazz);
            }
        }

        addProps(clazz, props);
        addMethods(clazz, methods);

        const classCode = await codeFile(clazz.usage);

        return List({}, [[
            Title({ h: 3 }, C(clazz.type) + ' ' + namespace),
            clazz.description ? P({}, [B(lang.description + ':') + ' ', clazz.description, Br()]) : null,
            clazz.extends ? P({}, [B('Extends:') + ' ', Object.keys(clazz.extends).map(v => {
                extendsPaths(goToRef(source, v))
                return v;
            }).map(v => Link({ href: href('#class-' + v) }, v)).join(' '), Br()]) : null,
            clazz.extends ? P({}, [B('Implements:') + ' ', Object.keys(clazz.implements).map(v => {
                var target = goToRef(source, v);                
                if(target)
                return {
                    target: target,
                    name: v,
                };
                return v;
            }).map(t => t instanceof Object?Link({ href: href(`#$${t.target.type}-` + t.name) }, t.name):t).join(' '), Br()]) : null,
            P({}, [B('Prefix:'), ' ', BPrefix(clazz)]),
            classCode ? List({}, [[Title({ h: 3 }, 'Usage'), Code({ lang: code.programming_language }, classCode)]]) : null,
            constructors.tbody.children.length ? List({}, [[Title({ h: 3 }, 'Constructors'), constructors]]) : null,
            props.tbody.children.length ? List({}, [[Title({ h: 3 }, 'Properties'), props]]) : null,
            methods.tbody.children.length ? List({}, [[Title({ h: 3 }, 'Methods'), methods]]) : null,
        ]])
    }

    return Container({}, [
        Title({}, code.title),
        code.description ? P({}, [B(`${lang.description}:`), ' ', code.description, Br()]) : null,
        code.version ? P({}, [B('Version:'), ' ', code.version, Br()]) : null,
        code.programming_language ? P({}, [B('Programming Languge:'), ' ', B(code.programming_language)]) : null,
        code.install ? P({}[B('Install:'), ' ', code.install, Br()]) : null,

        () => {
            const enums_table = Table({}, [lang.name, 'Namespace', lang.description], [])
            const funs_table = Table({}, [lang.name, 'Params', 'Return', 'Namespace', lang.description], [])
            const classes_table = Table({}, [lang.name, 'Namespace', lang.description, 'Prefix'], [])
            const interfaces_table = Table({}, [lang.name, 'Namespace', lang.description, 'Prefix'], [])
            find_objects(source.objects, (name, obj, namespace) => {
                if (obj instanceof Object) {
                    let enums = obj.enums;
                    let funs = obj.functions;
                    let clazz = obj.type === 'class' ? obj : null;
                    let interface = obj.type === 'interface' ? obj : null;

                    descriptableTable(name, namespace, enums_table, obj, enums, 'enum', source_enums, enumRender);
                    if (obj.type == 'namespace')
                        descriptableTable(name, namespace, funs_table, obj, funs, 'function', source_funs, funRender);
                    if (clazz) {
                        classes_table.addData({}, [Link({ href: href('#class-' + fnNamespace(namespace, name)) }, name), namespace != '' ? B(namespace) : ' ', clazz.description ? clazz.description : ' ', BPrefix(clazz)])
                        source_classes[fnNamespace(namespace, name)] = () => {
                            return classRender(name, clazz, fnNamespace(namespace, name));
                        };
                    }
                    if (interface) {
                        interfaces_table.addData({}, [Link({ href: href('#interface-' + fnNamespace(namespace, name)) }, name), namespace != '' ? B(namespace) : ' ', interface.description ? interface.description : ' ', BPrefix(interface)])
                        source_interfaces[fnNamespace(namespace, name)] = () => {
                            return classRender(name, interface, fnNamespace(namespace, name));
                        };
                    }
                }
            });
            const enum_cont = enums_table.tbody.children.length ? List({}, [[Title({ h: 2 }, 'Enums'), enums_table]]) : null;
            const fun_cont = funs_table.tbody.children.length ? List({}, [[Title({ h: 2 }, 'Functions'), funs_table]]) : null
            const classes_cont = classes_table.tbody.children.length ? List({}, [[Title({ h: 2 }, 'Classes'), classes_table]]) : null
            const interfaces_cont = interfaces_table.tbody.children.length ? List({}, [[Title({ h: 2 }, 'Interfaces'), interfaces_table]]) : null
            return [
                enum_cont,
                fun_cont,
                classes_cont,
                interfaces_cont,
                Object.values(source_classes),
                Object.values(source_interfaces),
            ]

        }

    ]);
}
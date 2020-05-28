
var beautify = require("json-beautify");

const {
    TableData, Container,
    C, Title, TableHeader, L,
    P, Link, B, Br, List, Code
} = require('markdown-js-template');




const {
    jsonExample,
    extend,
    getRefRel,
} = require('./libs/functions')

const langs = require('./libs/langs')

module.exports = function (api) {
    const tags = Object.keys(api.tags)
    const routes = Object.keys(api.paths)
    const models = Object.keys(api.models)
    const lang = langs[api.lang]
    /**
     * 
     * @param {string} ref 
     */
    function getRef(ref) {
        return getRefRel(api, ref);
    }

    /**
     * 
     * @param {string} tag 
     */
    function hrefDocumentation(tag) {
        return `#${tag}`.toLowerCase();
    }

    return Container({}, [
        Title({}, api.title),
        List({}, tags.map(tag => [
            //tags
            Title({ h: 2 }, tag),
            P({}, api.tags[tag].description),
            TableHeader({}, [lang.method, lang.route, `${lang.auth}?`, lang.description]),
            routes.map(path => {
                var paths = Object.keys(api.paths[path]).map(method => {
                    extend(api, api.paths[path][method]);
                    if (api.paths[path][method].tags) {
                        if (api.paths[path][method].tags.find(i => i === tag)) {
                            api.paths[path][method].method = method;
                            api.paths[path][method].path = path;
                            return api.paths[path][method];
                        }
                    }
                })

                return paths.map(methodData => {
                    var pathref = path.split('/').join('');
                    if (methodData)
                        return TableData({}, [B(methodData.method), Link({ href: hrefDocumentation(`${methodData.method}-${pathref}`) }, path), methodData.auth ? "Si" : "No", methodData.description]);
                })
            })
        ])),
        List({}, [
            [
                //routes
                Title({ h: 2 }, lang.routes),
                routes.map(path => {
                    return Object.keys(api.paths[path]).map(method => {
                        const route = api.paths[path][method];
                        if (route.tags) {

                            return List({}, [
                                [
                                    //route
                                    Title({ h: 5 }, [C(method), " ", path]),
                                    P({}, [
                                        route.description ? [B(`${lang.description}:'`), " ", route.description, Br] : null,
                                        B(lang.tags + ':'), route.tags.map(tag => [" ", Link({ href: hrefDocumentation(tag) }, tag)]),
                                    ]),

                                    route.request ? List({}, [
                                        [
                                            //request
                                            B(lang.request),
                                            List({}, [
                                                route.request.headers ? [
                                                    B(lang.headers),
                                                    TableHeader({}, [lang.name, lang.type]),
                                                    Object.keys(route.request.headers).sort()
                                                        .map(header => TableData({}, [B(header), L(route.request.headers[header])]))
                                                ] : null,
                                                route.request.data ? [
                                                    B(lang.data),
                                                    TableHeader({}, [lang.name, lang.type, lang.description, lang.rules]),
                                                    Object.keys(route.request.data).sort()
                                                        .map(data => {
                                                            var itemData = route.request.data[data];
                                                            var ref = getRef(itemData.ref);
                                                            return TableData({}, [
                                                                B(data),
                                                                ref ? [Link({ href: hrefDocumentation(ref.name) }, ref.name), " ", L(ref.ref.type)]
                                                                    : L(itemData.type),
                                                                itemData.description,
                                                                itemData.rules,
                                                            ])
                                                        })
                                                ] : null,
                                                route.request.in ? () => {
                                                    var in_ = route.request.in;
                                                    if (in_ instanceof Array)
                                                        return B(`${lang.in}: ${in_.join(', ')}`)
                                                    return B(`${lang.in}: ${in_}`)
                                                } : null,
                                            ])
                                        ],
                                    ]) : null,
                                    route.response ? [
                                        List({}, [
                                            [
                                                //response
                                                B(lang.response),
                                                List({}, Object.keys(route.response)
                                                    .map(code => {
                                                        const response = route.response[code];

                                                        return [
                                                            [C(code), " ", response.description],
                                                            response.data ? List({}, [response.data.json ? () => {
                                                                var item = getRef(response.data.json.ref) || { ref: response.data.json };
                                                                var result = {}
                                                                jsonExample(api, item.name, item.ref, result);
                                                                var data = result[item.name];
                                                                var json = beautify(data, null, 2, 100);
                                                                if (json)
                                                                    return [
                                                                        C("application/json"),
                                                                        P({}, [B(`${lang.example}:`)]),
                                                                        Code({ lang: "json" }, json),
                                                                    ]
                                                            } : null]) : null
                                                        ]
                                                    })
                                                ),
                                            ]
                                        ])
                                    ] : null,
                                ]
                            ])
                        }
                    })
                })
            ],
            [
                //models
                Title({ h: 2 }, lang.models),
                function renderModels() {
                    return List({},
                        models.map(modelName => {
                            var model = api.models[modelName];
                            var n = modelName
                            extend(api, model)

                            return function objectProp(name, obj) {

                                model = obj ? obj : model;
                                n = name ? name : n;

                                return [
                                    Title({ h: 3 }, n),
                                    model.type === 'object' ? () => {
                                        var props = Object.keys(model.props);

                                        return [
                                            props.map((propName, k) => {
                                                var prop = model.props[propName];
                                                if (prop) {
                                                    if (prop.type === 'object')
                                                        return List({}, [objectProp(propName, prop)]);
                                                    if (k == 0)
                                                        return [
                                                            P({}, [B(lang.type + ":"), " ", L(model.type)]),
                                                            TableHeader({}, [lang.name, lang.type, lang.description]),
                                                            TableData({}, [B(propName), L(prop.type), prop.description || " "])
                                                        ]
                                                    return TableData({}, [B(propName), L(prop.type), prop.description || " "]);
                                                }
                                            })
                                        ]
                                    } : () => P({}, [B(lang.type + ":"), " ", L(model.type)])
                                ]
                            }
                        })
                    )
                }

            ]

        ]),

    ]);
}

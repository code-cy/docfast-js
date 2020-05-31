
var beautify = require("json-beautify");

const {
    Container,
    C, Title, L,
    P, Link, B, Br, List, Code,
    Table,
} = require('../libs/markdown-js-template');




const {
    jsonExample,
    extend,
    getRefRel,
} = require('../libs/functions')

const langs = require('../libs/langs')

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
            () => {
                var tableTag = Table({}, [lang.method, lang.route, `${lang.auth}?`, lang.description], []);

                routes.forEach(path => {
                    Object.keys(api.paths[path]).forEach(method => {
                        var route = api.paths[path][method];
                        extend(api, route);
                        if (route.tags) {
                            if (route.tags.find(i => i === tag)) {
                                var pathref = path.split('/').join('');
                                tableTag.addData({}, [
                                    B(method),
                                    Link({ href: hrefDocumentation(`${method}-${pathref}`) }, path),
                                    route.auth ? "Si" : "No", route.description
                                ]);
                            }
                        }
                    })
                })

                return tableTag;
            },
        ])),
        () => List({}, [
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
                                                    () => {
                                                        var tableHeader = Table({}, [lang.name, lang.type]);
                                                        Object.keys(route.request.headers).sort()
                                                            .forEach(header => tableHeader.addData({}, [B(header), L(route.request.headers[header])]))
                                                        return tableHeader;
                                                    },
                                                ] : null,
                                                route.request.data ? [
                                                    B(lang.data),
                                                    () => {
                                                        var table = Table({}, [lang.name, lang.type, lang.description, lang.rules], []);
                                                        Object.keys(route.request.data).sort()
                                                            .forEach(data => {
                                                                var itemData = route.request.data[data];
                                                                var ref = getRef(itemData.ref);
                                                                table.addData({}, [
                                                                    B(data),
                                                                    ref ? [Link({ href: hrefDocumentation(ref.name) }, ref.name), " ", L(ref.ref.type)]
                                                                        : L(itemData.type),
                                                                    itemData.description,
                                                                    itemData.rules,
                                                                ])
                                                            })
                                                        return table;
                                                    },

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
                                                                var item = getRef(response.data.json.ref) || { name: "json", ref: response.data.json };
                                                                var result = {}
                                                                extend(api, item.ref)
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
                        models.map((modelName, m) => {
                            var model = api.models[modelName];
                            var n = modelName
                            extend(api, model);


                            return function objectProp(name, obj, deep = 0) {

                                model = obj ? obj : model;
                                n = name ? name : n;

                                return [
                                    Title({ h: 3 }, n),
                                    model.type === 'object' ? () => {
                                        const propsItem = model.props;
                                        var props = Object.keys(propsItem);
                                        var table = Table({}, [lang.name, lang.type, lang.description], []);
                                        var content = [
                                            P({}, [B(lang.type + ":"), " ", L(model.type)]),
                                            table,
                                        ];

                                        props.forEach((propName, k) => {
                                            var prop = model.props[propName];
                                            if (!prop) {
                                                prop = propsItem[propName];
                                            }

                                            if (prop) {
                                                if (prop.type === 'object')
                                                    content.push(List({}, [objectProp(propName, prop, deep + 1)]));
                                                 table.addData({}, [B(propName), L(prop.type), prop.description || " "]);
                                            }
                                        })


                                        return content;
                                    } : () => P({}, [
                                        B(lang.type + ":"), " ", L(model.enum ? "enum" : model.type), Br,
                                        model.enum instanceof Array ? [
                                            B(lang.data + ":"), " ",
                                            model.enum.map((v, k) => [k ? "," : null, " ", L(v)]),
                                            Br
                                        ] : null
                                    ])
                                ]
                            }
                        })
                    )
                }

            ]

        ]),

    ]);
}

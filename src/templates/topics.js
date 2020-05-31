'use strict'
const {
    Container, Title, P, B, List, Link,
    TableData, Table, Code, L
} = require('../libs/markdown-js-template');


var source = {
    title: "markdown-js-template",
    topics: {
        "Install": {
            description: "",
            code: {
                lang: "bash",
                content: `npm i code-cy/docfast-js`
            },
        },
        "Components": {
            description: "This is a wiki of all components of **markdown-js-template**",
            topics: {
                "Container": {
                    description: "This component can contain other components",
                    topics: {
                        "props": {
                            table: {
                                style: ["b", "l", ""],
                                headers: ["name", "type", "description"],
                                data: [
                                    ["props", "object", "porperities of components"],
                                    ["children", "array/string", "children to render"]
                                ]
                            }
                        }
                    }
                },
                "Title": {
                    description: "Used for markdown tags.",
                    topics: {
                        "props": {
                            table: {
                                style: ["b", "l", ""],
                                headers: ["name", "type", "description"],
                                data: [
                                    ["props", "object", "porperities of components"],
                                    ["children", "array/string", "children to render"]
                                ]
                            }
                        }
                    }
                }
            }
        },
        "TopicOff": {
            off: true
        }
    }
}
/**
 * topics
 * @param {source} s_
 */
module.exports = function (s_) {
    source = s_ ? s_ : source;
    var tags = {};
    return Container({}, [
        Title({}, source.title),
        List({}, [
            //navigation
            [
                Title({ h: 5 }, "Topics"),
                function topicNav(topics_) {
                    const topics = topics_ ? topics_ : source.topics;
                    const topicsKeys = Object.keys(topics);
                    return List({}, topicsKeys.map(topicName => {
                        var topic = topics[topicName];
                        if (tags[topicName] == null) {
                            tags[topicName] = 0;
                        } else {
                            tags[topicName]++;
                        }

                        return [
                            Link({ href: "#" + (tags[topicName] ? tags[topicName] + "-" : "") + `${topicName.toLowerCase().replace('/','').replace(':', '').split(' ').join('-')}` }, topicName),
                            topic.topics instanceof Object ? topicNav(topic.topics) : null
                        ]

                    }))
                },
            ]


        ]),
        //content
        function content(topics_) {
            const topics = topics_ ? topics_ : source.topics;
            const topicsKeys = Object.keys(topics);
            if (!topics_) {
                tags = {};
            }
            return List({}, topicsKeys.map(topicName => {
                var topic = topics[topicName];

                if (tags[topicName] == null) {
                    tags[topicName] = 0;
                } else {
                    tags[topicName]++;
                }
                if (!topic.off)
                    return [
                        Title({ h: topics_ ? 3 : 1 }, (tags[topicName] ? "<d style='color:white;'>" + tags[topicName] + "</d> " : " ") + topicName),
                        P({}, topic.description),
                        //code
                        topic.code instanceof Object ?
                            Code({ lang: topic.code.lang }, topic.code.content) : null,

                        //table
                        topic.table instanceof Object ?
                            [
                                Table({}, topic.table.headers,
                                    topic.table.data.map(row => TableData({},
                                        topic.table.style ? row.map((d, k) => {
                                            var s = topic.table.style[k];
                                            return s == 'b' ? B(d) : s == 'l' ? L(d) : d;
                                        }) : row))),
                            ] : null,

                        //links
                        topic.links instanceof Object ?
                            List({}, Object.keys(topic.links).map(k => [Link({ href: topic.links[k] }, k), " "])) : null,


                        //topics
                        topic.topics instanceof Object ?
                            content(topic.topics) : null

                    ]
            }))
        }
    ])
}



<!-- docfast-js-topics-mjst -->
# markdown-js-template

- ##### Topics

   - [Components](#components)

      - [Methods](#methods)

      - [Container](#container)

         - [params](#params)

            - [props](#props)

      - [Container as Array/Function](#container-as-arrayfunction)

      - [Title](#title)

         - [params](#1-params)

            - [props](#1-props)

      - [List & NumList](#list--numlist)

         - [params](#2-params)

            - [props](#2-props)

      - [Table](#table)

         - [Methods](#1-methods)

         - [params](#3-params)

            - [props](#3-props)


- #  Components
   This is a wiki of all components of **markdown-js-template**

   - ###  Methods
      
      |name|params|returns|description|
      |----|----|----|----|
      |**render**| |*string*|render the component.|
      |**addChild**|*child* *:* *array/string*|*void*|add child in component array children.|

   - ###  Container
      This component can contain other components
      ```js
      const {Container} = require('docfast-js').markdown_js_template;
      var str = Container({...},[ ... ]).render(); 
      ```
      - ###  params
         
         |name|type|description|
         |----|----|----|
         |**props**|*object*|properities of components|
         |**children**|*array*|children to render|

         - ###  props
            
            |name|type|description|
            |----|----|----|
            |**html**|*boolean*|render as html|

   - ###  Container as Array/Function
      Array in children array is a Container: 
      ```js
      Container({},[
      	[
      	/*container 1*/
      	],
      	()=>[
      	/*Function return array Container  2*/
      	]
      ])
      ```
   - ###  Title
      Titles are headers in markdown.
      ```js
      const {...,Title} = require('docfast-js').markdown_js_template;
      
      var str = Container({...},[
      	Title({},'Hello World')
      	Title({h:2},'Hi')
      ]).render();
      
      
      ```
      - ### <d style='color:white;'>1</d> params
         
         |name|type|description|
         |----|----|----|
         |**props**|*object*|properities of components|
         |**children**|*array/string*|children to render|

         - ### <d style='color:white;'>1</d> props
            
            |name|type|description|
            |----|----|----|
            |**html**|*boolean*|render as html.|
            |**h**|*number*|header number.|

   - ###  List & NumList
      List is an unorden list in markdown. NumList is a orden list.
      ```js
      const {..., List, NumList} = require('docfast-js').markdown_js_template;
      
       var fruits = ['pear','apple','orange']
       var str = Container({...}, [
       NumList({},[
       	'Element x',
       	'Element y',
       	[
       		Title({},'Element z'),
       		'element z container',
       	]
       	[
       		Title({},'Fruits'),
       		List({},fruits),
       	]
       ])
       ]).render();
      ```
      - ### <d style='color:white;'>2</d> params
         
         |name|type|description|
         |----|----|----|
         |**props**|*object*|properities of components|
         |**children**|*array/string*|children to render|

         - ### <d style='color:white;'>2</d> props
            
            |name|type|description|
            |----|----|----|
            |**html**|*boolean*|render as html.|

   - ###  Table
      Tables in markdown.
      ```js
      const {...,Table, TableData} = require('docfast-js').markdown_js_template;
      
       var animals = [
      	{name:'pupy',age:25},
      	{name:'krik',age:14}
      ];
       var str = Container({...},[
       	Table({},['h1','h2','h3'],[
       		TableData({},['d11','d12','d13']),
       		TableData({},['d21','d22','d23'])
       	]),
       //With method addData
       ()=>{
       var my_table = Table({},['name','age'],[]);
       animals.forEach(a => my_table.addData({}, [ a.name, a.age ]));
       return my_table;
       }
       ]).render(); 
      ```
      - ### <d style='color:white;'>1</d> Methods
         
         |name|params|returns|description|
         |----|----|----|----|
         |**addData**|*props:object*, *data:array* |*void*|add a TableData to table tbody.|

      - ### <d style='color:white;'>3</d> params
         
         |name|type|description|
         |----|----|----|
         |**props**|*object*|properities of components|
         |**thead**|*string[]*|table headers.|
         |**tbody**|*array*|tbody children.|

         - ### <d style='color:white;'>3</d> props
            
            |name|type|description|
            |----|----|----|
            |**html**|*boolean*|render as html.|


<!-- /docfast-js-topics-mjst-->
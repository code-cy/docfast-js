<!-- docfast-js-topics-docfast -->
# docfast-js

- ##### Topics

   - [Install](#install)

      - [Command Line](#command-line)

         - [Sources Formats](#sources-formats)

            - [yaml](#yaml)

         - [Targets](#targets)

            - [Markdown](#markdown)

      - [Usage as Dependency](#usage-as-dependency)

         - [Import](#import)

   - [markdown-js-template](#markdown-js-template)

   - [API Documentation Example format: api-doc](#api-documentation-example-format-api-doc)


- #  Install
   Has tow ways to implements

   - ###  Command Line
      
      ```bash
      #install
      npm i -g code-cy/docfast-js
      #usage
      docfast-js <source.yaml> <target> <my-tag?>
      #examples
      docfast-js ./api/api-doc.yaml ./README.md 
      ```
      - ###  Sources Formats
         

         - ###  yaml
            

            - [api-doc](https://github.com/code-cy/docfast-js/blob/master/formats/api-doc.yaml)
 
            - [topics](https://github.com/code-cy/docfast-js/blob/master/formats/topics.yaml)
 
      - ###  Targets
         

         - ###  Markdown
            
            ```markdown
            - Documentation:
            <!-- docfast-js-{format}-{my-tag} -->
            <!-- /docfast-js-{format}-{my-tag} -->
            
            ```
   - ###  Usage as Dependency
      
      ```bash
       npm i code-cy/docfast-js 
      ```
      - ###  Import
         In your js file.
         ```js
         const {
         langs,
         functions,
         markdown_js_template,
         formats,
         } = require('docfast-js');
         
         ```

<!-- /docfast-js-topics-docfast -->

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
         |**props**|*object*|porperities of components|
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
         |**props**|*object*|porperities of components|
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
         |**props**|*object*|porperities of components|
         |**children**|*array/string*|children to render|

         - ### <d style='color:white;'>2</d> props
            
            |name|type|description|
            |----|----|----|
            |**html**|*boolean*|render as html.|


<!-- /docfast-js-topics-mjst -->

<!-- docfast-js-api-doc -->
# API Documentation Example format: api-doc

- ## User
   Operar datos del Usuario.
   |Método|Ruta|Auth?|Descripción|
   |----|----|----|----|
   |**post**|[/auth/register](#post-authregister)|No|Registrar nuevo usuario.|
   |**post**|[/auth/login](#post-authlogin)|No|Iniciar sesion como Usuario.|
   |**get**|[/user](#get-user)|Si|Obtener informacion del usuario y la compañia.|


- ## Rutas

   - ##### `post` /auth/register
      **Descripción:'** Registrar nuevo usuario.
      **Tags:** [User](#user) [API](#api)

      - **Parámetros**

         - **Cabeceras**
            |Nombre|Tipo|
            |----|----|
            |**API_KEY**|*string*|

         - **Datos**
            |Nombre|Tipo|Descripción|Reglas|
            |----|----|----|----|
            |**email**|*string*|Correo del usuario.|Requerido.|
            |**password**|*string*|Contraseña del usuario.|Requerido.|
            |**passwordConfirmed**|*string*|Contraseña confirmada del usuario.|requrido|

         - **En: body, query**
      - **Respuesta**

         - `201` Usuraio creado

            - `application/json`
               **Ejemplo:**
               ```json
               { "token": "akslkdláskldkalskdlkasld´kaslkd´laskdasdkasjdklñjaksjdkasdjkañsjdlkj" }
               ```
         - `401` `API_KEY` no es valida.

   - ##### `post` /auth/login
      **Descripción:'** Iniciar sesion como Usuario.
      **Tags:** [User](#user) [API](#api)

      - **Parámetros**

         - **Cabeceras**
            |Nombre|Tipo|
            |----|----|
            |**API_KEY**|*string*|

         - **Datos**
            |Nombre|Tipo|Descripción|Reglas|
            |----|----|----|----|
            |**email**|*string*|Correo del usuario.|Requerido.|
            |**password**|*string*|Contraseña del usuario.|Requerido.|

         - **En: body, query**
      - **Respuesta**

         - `201` Usuario a iniciado sesion.

            - `application/json`
               **Ejemplo:**
               ```json
               {
                 "user": { "id": 21321, "email": "me@example.ocm", "create_at": "20-254-000" },
                 "token": "akslkdláskldkalskdlkasld´kaslkd´laskdasdkasjdklñjaksjdkasdjkañsjdlkj"
               }
               ```
         - `401` `API_KEY` no es valida.

   - ##### `get` /user
      **Descripción:'** Obtener informacion del usuario y la compañia.
      **Tags:** [User](#user) [API](#api)

      - **Parámetros**

         - **Cabeceras**
            |Nombre|Tipo|
            |----|----|
            |**API_KEY**|*string*|
            |**Authorization**|*string*|

      - **Respuesta**

         - `200` Usuario y su compañia.

            - `application/json`
               **Ejemplo:**
               ```json
               { "id": 21321, "email": "me@example.ocm", "create_at": "20-254-000" }
               ```
         - `401` `API_KEY` no es valida.

         - `421` El token de sesion a expirado.

- ## Modelos

   - ### UserStoreResponse
      **Tipo:** *object*
      |Nombre|Tipo|Descripción|
      |----|----|----|
      |**token**|*string*| |

   - ### UserLoginResponse
      **Tipo:** *object*
      |Nombre|Tipo|Descripción|
      |----|----|----|
      |**user**|*object*| |
      |**token**|*string*| |

      - ### user
         **Tipo:** *object*
         |Nombre|Tipo|Descripción|
         |----|----|----|
         |**id**|*number*| |
         |**email**|*string*| |
         |**create_at**|*string*| |

   - ### InvalidResponse
      **Tipo:** *object*
      |Nombre|Tipo|Descripción|
      |----|----|----|
      |**message**|*string*| |
      |**errors**|*object*| |

      - ### errors
         **Tipo:** *object*
         |Nombre|Tipo|Descripción|
         |----|----|----|
         |**mail**|*string*| |
         |**password**|*string*| |
         |**passwordConfirmed**|*string*| |

   - ### Unauthorizate
      **Tipo:** *object*
      |Nombre|Tipo|Descripción|
      |----|----|----|
      |**message**|*string*| |

   - ### Data
      **Tipo:** *enum*
      **Datos:**  *XK*, *YX*, *ZX*
      


<!-- /docfast-js-api-doc -->



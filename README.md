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

   - [Ref-doc format example result:](#ref-doc-format-example-result)


- #  Install
   Has two ways to implements

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
 
            - [ref-doc](https://github.com/code-cy/docfast-js/blob/master/formats/ref-doc.yaml)
 
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
         - ###  markdown-js-template
            Its a framework to render a markdown/html components.

            - [Components](https://github.com/code-cy/docfast-js/blob/master/src/libs/markdown-js-template/Readme.md)
 

<!-- /docfast-js-topics-docfast -->

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
      **Descripción:** Registrar nuevo usuario.
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
      **Descripción:** Iniciar sesion como Usuario.
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
      **Descripción:** Obtener informacion del usuario y la compañia.
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
<!-- docfast-js-ref-doc -->
# Ref-doc format example result:
**Description:** Example how to use **ref-doc** to documentation your scripts.

**Version:** 1.0.0

**Programming Languge:** **C#**

- ## Enums
   |Name|Namespace|Description|
   |----|----|----|
   |[Enum1](#enum-packageenum1)|**package**|description ...|
   |[Enum2](#enum-packageclass1.enum2)|**package.Class1**|description ...|


- ## Functions
   |Name|Params|Return|Namespace|Description|
   |----|----|----|----|----|
   |[functionName](#function-packagefunctionnamestr)|(**str**: string)|type|**package**|...|
   |[~~functionName~~](#function-packagefunctionnameparam1param2)|(**param1**: [package.Class1](#class-packageclass1), **param2**: number)|type|**package**|...|


- ## Classes
   |Name|Namespace|Description|Prefix|
   |----|----|----|----|
   |[Class1](#class-packageclass1)|**package**|description ...|**public** **static**|
   |[Class2](#class-class2)| |description ...|**public**|


- ## Interfaces
   |Name|Namespace|Description|Prefix|
   |----|----|----|----|
   |[Interface1](#interface-interface1)| | |**public**|


- ### `class` package.Class1
   **Description:** description ...
   
   **Extends:** [Class2](#class-class2)
   
   **Implements:** [Interface1](#$interface-interface1)
   
   **Prefix:** **public** **static**

   - ### Usage
      ```C#
      using System;
      using package.Class1;
      
      public class Main : Class1{
          public static void Main(string[] args){
              Main.doSomething("wow");
          }
      }
      
      ```
   - ### Properties
      |Name|Type|Prefix|Description|
      |----|----|----|----|
      |propName1|string|**public** **static**|description ...|
      |~~propName3~~|string|**public** **static**|description ...|

   - ### Methods
      |Name|Params|Return|Prefix|Description|
      |----|----|----|----|----|
      |doSomething|(**param**: string)|void|**protected** **static**|description ...|


- ### `class` Class2
   **Description:** description ...
   
   **Prefix:** **public**

   - ### Constructors
      |Name|Params|
      |----|----|
      |Class2|()|
      |~~Class2~~|(**paramName**: string)|

   - ### Properties
      |Name|Type|Prefix|Description|
      |----|----|----|----|
      |~~propName3~~|string|**public** **static**|description ...|
      |propName4|[Class2](#class-class2)|**public**| |

   - ### Methods
      |Name|Params|Return|Prefix|Description|
      |----|----|----|----|----|
      |doSomething|(**param**: string)|void|**protected** **static**|description ...|


- ### `interface` Interface1
   **Prefix:** **public**

   - ### Methods
      |Name|Params|Return|Prefix|Description|
      |----|----|----|----|----|
      |doSomething|(**param**: string)|void|**public**|


<!-- /docfast-js-ref-doc -->

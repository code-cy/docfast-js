<!-- docfast-js-topics-docfast -->
# docfast-js

- ##### Topics

   - [Install](#install)

      - [Command Line](#command-line)

         - [Sources Format](#sources-format)

         - [Targets](#targets)

            - [Markdown](#markdown)

      - [Usage as Dependency](#usage-as-dependency)

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
      - ###  Sources Format
         
         [api-doc](https://github.com/code-cy/docfast-js/blob/master/formats/api-doc.yaml) [topics](https://github.com/code-cy/docfast-js/blob/master/documentation/docfast-js-topics.yaml) 

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



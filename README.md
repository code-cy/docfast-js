# docfast-js

Fast documentations.

- ## Usage as Command Line
``` bash
#install
npm i -g code-cy/docfast-js

#usage
docfast-js <source.yaml> <target>

#examples
docfast-js ./api/api-doc.yaml ./README.md

```
- ## Sources Formats:
    - [api-doc](https://github.com/code-cy/docfast-js/blob/master/formats/api-doc.yaml)  

- ## Targets:
    - ### Markdown
        - ```markdown
            - Documentation:
            <!-- docfast-js-{format} -->
            <!-- /docfast-js-{format} -->
            ```
- ## Usage as Dependecy
    ```bash
        npm i code-cy/docfast-js

    ```
    - in js:

        ```js
            const {
                langs,
                functions,
                markdown_template:{
                    Title,
                    Link,
                    //code-cy/markdown-js-template
                },
                formats:{
                    api_doc
                }
            } = require('docfast')
        ```
<!-- docfast-js-api-doc -->
# API Documentation Example format: api-doc

- ## User
   Operar datos del Usuario.
   |Método|Ruta|Auth?|Descripción|
   |----|----|----|----|
   |**post**|[/auth/register](https://github.com/code-cy/docfast-js#post-authregister)|No|Registrar nuevo usuario.|
   |**post**|[/auth/login](https://github.com/code-cy/docfast-js#post-authlogin)|No|Iniciar sesion como Usuario.|
   |**get**|[/user](https://github.com/code-cy/docfast-js#get-user)|Si|Obtener informacion del usuario y la compañia.|


- ## Rutas

   - ##### `post` /auth/register
      **Descripción:'** Registrar nuevo usuario.
      **Tags:** [User](https://github.com/code-cy/docfast-js#user) [API](https://github.com/code-cy/docfast-js#api)

      - **Parámetros**
         

         - **Cabeceras**
            
            |Nombre|Tipo|
            |----|----|
            |**API_KEY**|*string*|

         - **Datos**
            
            |Nombre|Tipo|Descripción|
            |----|----|----|----|
            |**email**|*string*|Correo del usuario.|requrido|
            |**password**|*string*|Contraseña del usuario.|requrido|
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
      **Tags:** [User](https://github.com/code-cy/docfast-js#user) [API](https://github.com/code-cy/docfast-js#api)

      - **Parámetros**
         

         - **Cabeceras**
            
            |Nombre|Tipo|
            |----|----|
            |**API_KEY**|*string*|

         - **Datos**
            
            |Nombre|Tipo|Descripción|
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
      **Tags:** [User](https://github.com/code-cy/docfast-js#user) [API](https://github.com/code-cy/docfast-js#api)

      - **Parámetros**
         

         - **Cabeceras**
            
            |Nombre|Tipo|
            |----|----|
            |**Authorization**|*string*|
            |**API_KEY**|*string*|

      - **Respuesta**
         

         - `200` Usuario y su compañia.
            

            - `application/json`
               
               **Ejemplo:**
               ```json
               { "id": 21321, "email": "me@example.ocm", "create_at": "20-254-000" }
               ```
         - `401` `API_KEY` no es valida.
            

         - `421` El token de sesion a expirado.
            


<!-- /docfast-js-api-doc -->

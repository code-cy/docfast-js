```mermaid

erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

```mermaid
classDiagram
    Pet <-- Model
    Pet : int id
    Pet : string name
    User <-- Model
    User : pets()
    User : device()
    User : int id
    User : string name
```

<!-- docfast-js-db-graph -->
```mermaid
classDiagram
   User <-- Model
   User : integer id: primary
   User : string name
   User : integer device_id: foreign

   Pet <-- Model
   Pet : integer id: primary
   Pet : string name
   Pet : integer age

   Device <-- Model
   Device : integer id: primary


```
<!-- /docfast-js-db-graph -->
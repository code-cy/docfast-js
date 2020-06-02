const command = require('meow')

const cli = command(`
  #Usage
    $ docfast-export <methods> options[]
    methods:
        --graphs:                   Export all graph to .png files
            <source>:               Docfast fromat file that has graphs to render.           
                -f <folder>         Folder target to export files
                --nf <folder>       Make a folder target if not exist to export files.
            #Examples
                $ docfast-export --graphs ./db-graph.yaml -f ./export/my/path/is/it
                $ docfast-export --graphs ./db-graph.yaml -nf ./export/my/new/folder
`)


const prams = cli.input;

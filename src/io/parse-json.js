export default function parseJson(file) {
    let json_file = file;
    let multilayer_dict = JSON.parse(json_file);
    let ftree_file = '*Modules\n';
    let inter_layers = [];
    let num_of_layers = multilayer_dict['layers'].length();

    // Adding modules (layers)
    for (let layer in multilayer_dict['layers']){
        ftree_file += layer['id'] + ' 1 ' + layer['name'] + ' 1\n';
    }
    // Adding nodes
    ftree_file += '*Nodes\n'
    let add_node ='';
    for (let link in multilayer_dict['links']) {
        if (link['source_layer'] !== link['target_layer']) {
            inter_layers.push((link['source_layer'], link['target_layer'], link['weight']));
            add_node = link['source_layer'] + ':' + link['source_node'] + ' ' + link['weight'] + ' "' + multilayer_dict['nodes'][link['source_node'] - 1]['name'] + '" ' + link['source_node'] + '\n';
        }
        if (!ftree_file.includes(add_node)) {
            ftree_file += add_node;
        }
        add_node = link['target_layer'] + ':' + link['target_node'] + ' ' + link['weight'] + ' "' + multilayer_dict['nodes'][link['target_node'] - 1]['name'] + '" ' + link['target_node'] + '\n';
        if (!ftree_file.includes(add_node))
        {
            ftree_file += add_node;
        }
    }
    ftree_file += '*Links undirected\n'
    let inter_layers_edges = '';
    let num_of_inter_layers = 0;
    // Add inter layer edges
    for (let link in inter_layers) {
        let add_edge_layer = link[0] + ' ' + link[1];
        if (!inter_layers_edges.includes(add_edge_layer))
        {
            num_of_inter_layers += 1
            inter_layers_edges += add_edge_layer + ' ' + link[2] + '\n';
        }
    }
    ftree_file += '*Links root 0 0 ' + num_of_inter_layers + ' ' + num_of_layers + '\n';
    ftree_file += inter_layers_edges;

    let current_layer = multilayer_dict['links'][0]['source_layer'];
    let edges_in_layers = {current_layer: []};
    let num_of_nodes_in_layer = {current_layer: new Set()};
    for (let edge in multilayer_dict['links']) {
        // Iterating layers and for each layer adding the intra edges
        if (edge['source_layer'] !== current_layer) {
            current_layer = edge['source_layer']
        }
        if (!edges_in_layers.includes(current_layer))
        {
            edges_in_layers[current_layer] = []
            num_of_nodes_in_layer[current_layer] = new Set()
        }
        if (edge['source_layer'] === edge['target_layer'])
        {
            edges_in_layers[current_layer].push(edge['source_node'].length + ' ' + edge['target_node'] + ' ' + edge['weight'] + '\n');
            num_of_nodes_in_layer[current_layer].add(edge['source_node'])
            num_of_nodes_in_layer[current_layer].add(edge['target_node'])
        }
    }
    for (const [key, value] in edges_in_layers.entries()){
        ftree_file += '*Links ' + key + ' 0 0 ' + value.length + ' ' + num_of_nodes_in_layer[key].length + '\n';
        for (let edge in value){
            ftree_file += edge;
        }
    }

    return ftree_file;
}
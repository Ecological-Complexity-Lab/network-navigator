# Infomap Network Navigator
This is an interactive zoomable map for networks clustered with Infomap. We took it and adapted it to multi-layer network data. There are two examples of json files that can be uploaded in this repo - multilayer.json and shai_data.json.

### How to run the app
First, you need to run the python server, JsonToFtree using pychram or using the command 'python app.py' on your localhost console.

## components/LoadNetwork.js
This is the first component that’s being uploaded. We added the "Load json file" button to uploaded the json file that describe the network. After you choose the one of the json files, the json file fetch (לא הבנתי מה אתה רוצה להגידכאן) to a server JsonToFtree which transforms the json file to ftree and sends it back. After the ftree file returns, we are paring it using parseFTree and turn it to an object that can be transformed to a netowrk. After that, the ftree objects are sent to networkFromFtree function that turnes them to a network object and uploads it.

## io/ftree.js
Containing the parseFTree function, the function recieves the ftree file, and parses it to a new object that can be transformed to a network. We added the option to add attributes to the nodes and inter-links edges to the network.

## components/NetworkNavigator.js
Responsible for the rendering. We added the option for changing the size of the nodes and the color.

## network
Represent the network object.

## network-layout
All the d3 shapes and colors are configured in this file.



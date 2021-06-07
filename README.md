# Infomap Network Navigator
This is an interactive zoomable map for networks clustered with Infomap. We took it and adapted it to multi-layer network data. There is two examples of json file that can be uploaded in this repo - multilayer.json and shai_data.json.

### How to run the app
First, you need to run the python server, JsonToFtree using pychram or using the command 'python app.py' on your localhost console. 

## components/LoadNetwork.js
This is the first component that uploaded. We added the "Load json file" button to uploaded the json file that describe the network. After you choose the one of the json files, the json file fetch to a server JsonToFtree which transform the json file to ftree and sends it back. After the ftree file returns, we paring it using parseFTree and turns it to an object that can be transform to a netowrk. after that, the ftree objects sends to networkFromFtree function that turnes it to a network object and uploaded it. 

## io/ftree.js
Containing the parseFTree function, the function recieves the ftree file, and parsed it to a new object that can be transform to a network. We added the option to add attributes to the nodes and inter-links edges to the netwrok.

## components/NetworkNavigator.js

## network

## network-layout

## simulation

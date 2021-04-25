import React, { useContext } from "react";
import {Checkbox, Dropdown} from "semantic-ui-react";
import Dispatch from "../context/Dispatch";


const MyCheckbox = props => <Checkbox style={{ display: "block", margin: "0.3em 0 0.3em 0" }} {...props}/>;

const SliderCheckbox = props => <MyCheckbox slider {...props}/>;

export default function Settings(props) {
  const {
    // nodeSize,
    nodeScale,
    linkScale,
    labelsVisible,
    simulationEnabled,
    lodEnabled,
    selectedNode
  } = props;
  const { dispatch } = useContext(Dispatch);

  let sizeOptions = []
  sizeOptions = [
      {key: 'flow', text: 'flow', value: 'flow'},
      {key: 'Degree', text: 'Degree', value: 'Degree'},
      {key: 'nodeSize', text: 'nodeSize', value: 'nodes'}
      ];
  let colorOptions = [];
  if(selectedNode.attributes) {
      colorOptions.push({key: 'color', text: 'flow', value: selectedNode.flow});
      colorOptions.push({key: 'color', text: 'Degree', value: (selectedNode.kin + selectedNode.kout)});
      for (const [key, value] of Object.entries(selectedNode.attributes)) if (!isNaN(value) && key !== 'id') {
          colorOptions.push({key:'color', text:key.toString(), value: value})
      }
  }

    return (
    <React.Fragment>
      {/*<SliderCheckbox*/}
      {/*  label={`Module size based on: ${nodeSize}`}*/}
      {/*  checked={nodeSize === "flow"}*/}
      {/*  onChange={(e, { checked }) => dispatch({ type: "nodeSize", value: checked ? "flow" : "nodes" })}*/}
      {/*/>*/}
      <SliderCheckbox
        label={`Module radius scale: ${nodeScale}`}
        checked={nodeScale === "root"}
        onChange={(e, { checked }) => dispatch({ type: "nodeScale", value: checked ? "root" : "linear" })}
      />
      <SliderCheckbox
        label={`Link width scale: ${linkScale}`}
        checked={linkScale === "root"}
        onChange={(e, { checked }) => dispatch({ type: "linkScale", value: checked ? "root" : "linear" })}
      />
      <MyCheckbox
        label="Show labels"
        checked={labelsVisible}
        onChange={(e, { checked }) => dispatch({ type: "labelsVisible", value: checked })}
      />
      <MyCheckbox
        label="Run simulation"
        checked={simulationEnabled}
        onChange={(e, { checked }) => dispatch({ type: "simulationEnabled", value: checked })}
      />
      <MyCheckbox
        label="Use level of detail"
        checked={lodEnabled}
        onChange={(e, { checked }) => dispatch({ type: "lodEnabled", value: checked })}
      />
        <Dropdown
            placeholder='Change node size by:'
            fluid
            clearable
            selection
            options={sizeOptions}
            // defaultValue={sizeOptions[0].value}
            onChange={(e, data ) => dispatch({ type: "nodeSize", value: data ? data.value : "flow" })}
        />
      {!selectedNode.nodes && <Dropdown
            placeholder='Change node color by:'
            fluid
            clearable
            selection
            options={colorOptions}
            onChange={(e, data ) => dispatch({ type: "nodeColor", value: data ? data.value : "flow" })}
        />}
    </React.Fragment>
  );
};

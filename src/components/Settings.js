import React, { useContext } from "react";
import {Checkbox, Dropdown} from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import Dispatch from "../context/Dispatch";

const MyCheckbox = (props) => (
  <Checkbox
    style={{ display: "block", margin: "0.3em 0 0.3em 0" }}
    {...props}
  />
);

const SliderCheckbox = (props) => <MyCheckbox slider {...props} />;

export default function Settings(props) {
  const {
    nodeScale,
    linkScale,
    labelsVisible,
    simulationEnabled,
    lodEnabled,
    nodeLimit,
    selectedNode
  } = props;
  const { dispatch } = useContext(Dispatch);

  let sizeOptions = []
  sizeOptions = [
      {key: 'Degree', text: 'Degree', value: 'Degree'},
      {key: 'nodeSize', text: 'nodeSize', value: 'nodes'}
      ];
  let colorOptions = [];

  // Adding attributes to the color options
  colorOptions.push({key: 'colorD', text: 'Degree', value: 'Degree'});
  colorOptions.push({key: 'colorN', text: 'node Size', value: 'nodeSize'});

  if(selectedNode.attributes) {
      for (const [key, value] of Object.entries(selectedNode.attributes)) if (!isNaN(value) && key !== 'id') {
          colorOptions.push({key:'color' + key.toString(), text:key.toString(), value: key.toString()})
      }
  }

    return (
    <React.Fragment>
      <SliderCheckbox
        label={`Module radius scale: ${nodeScale}`}
        checked={nodeScale === "root"}
        onChange={(e, { checked }) =>
          dispatch({ type: "nodeScale", value: checked ? "root" : "linear" })
        }
      />
      <SliderCheckbox
        label={`Link width scale: ${linkScale}`}
        checked={linkScale === "root"}
        onChange={(e, { checked }) =>
          dispatch({ type: "linkScale", value: checked ? "root" : "linear" })
        }
      />
      <MyCheckbox
        label="Show labels"
        checked={labelsVisible}
        onChange={(e, { checked }) =>
          dispatch({ type: "labelsVisible", value: checked })
        }
      />
      <MyCheckbox
        label="Run simulation"
        checked={simulationEnabled}
        onChange={(e, { checked }) =>
          dispatch({ type: "simulationEnabled", value: checked })
        }
      />
      <MyCheckbox
        label="Use level of detail"
        checked={lodEnabled}
        onChange={(e, { checked }) =>
          dispatch({ type: "lodEnabled", value: checked })
        }
      />
      <Input
        label={{ basic: true, content: "Node limit in modules" }}
        type="number"
        size="small"
        value={nodeLimit}
        fluid
        onChange={(e) => {
          dispatch({ type: "nodeLimit", value: parseInt(e.target.value) });
        }}
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
      {selectedNode.id !== 'root' && <Dropdown
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

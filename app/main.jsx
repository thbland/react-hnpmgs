import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  MultiSelectTree,
  getMultiSelectTreeValue,
} from '@progress/kendo-react-dropdowns';
import {
  processMultiSelectTreeData,
  expandedState,
} from './multiselecttree-data-operations';
import { data } from './tree-data';
const dataItemKey = 'id';
const checkField = 'checkField';
const checkIndeterminateField = 'checkIndeterminateField';
const subItemsField = 'items';
const expandField = 'expanded';
const textField = 'text';
const fields = {
  dataItemKey,
  checkField,
  checkIndeterminateField,
  expandField,
  subItemsField,
};
const App = () => {
  const [success, setSuccess] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [expanded, setExpanded] = React.useState([data[0][dataItemKey]]);
  const onChange = (event) =>
    setValue(
      getMultiSelectTreeValue(data, {
        ...fields,
        ...event,
        value,
      })
    );
  const onExpandChange = React.useCallback(
    (event) => setExpanded(expandedState(event.item, dataItemKey, expanded)),
    [expanded]
  );
  const treeData = React.useMemo(
    () =>
      processMultiSelectTreeData(data, {
        expanded,
        value,
        ...fields,
      }),
    [expanded, value]
  );
  const handleSubmit = React.useCallback((event) => {
    event.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }, []);
  return (
    <div className="row example-wrapper">
      <div className="col-xs-12 col-sm-6 offset-sm-3 example-col">
        <div className="card">
          <div className="card-block">
            <form className="k-form" onSubmit={handleSubmit}>
              <fieldset>
                <legend>Select an item from the list:</legend>
                <div className="mb-3">
                  <MultiSelectTree
                    style={{
                      width: '100%',
                    }}
                    label="Home Equipment"
                    name="equipment"
                    required={true}
                    data={treeData}
                    value={value}
                    onChange={onChange}
                    textField={textField}
                    dataItemKey={dataItemKey}
                    checkField={checkField}
                    checkIndeterminateField={checkIndeterminateField}
                    subItemsField={subItemsField}
                    expandField={expandField}
                    onExpandChange={onExpandChange}
                  />
                </div>
              </fieldset>
              <input
                type="submit"
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
      {success && (
        <div
          className="alert alert-success"
          style={{
            position: 'absolute',
          }}
        >
          Form submitted!
        </div>
      )}
    </div>
  );
};
ReactDOM.render(<App />, document.querySelector('my-app'));

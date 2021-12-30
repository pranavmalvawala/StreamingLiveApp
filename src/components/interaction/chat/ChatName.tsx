import React from "react";
import { UserInterface } from "../../../helpers";
import { Row, Col, InputGroup } from "react-bootstrap"

interface Props {
  user: UserInterface,
  updateFunction: (displayName: string) => void,
  promptName: boolean
}

export const ChatName: React.FC<Props> = (props) => {
  const [edit, setEdit] = React.useState(false);
  const [displayName, setDisplayName] = React.useState("");

  const editMode = (e: React.MouseEvent) => {
    e.preventDefault();
    setEdit(true);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    switch (e.currentTarget.name) {
      case "displayName":
        setDisplayName(val);
        break;
      default:
        break;
    }
  }

  const handleUpdate = (e: React.MouseEvent) => {
    e.preventDefault();
    const trimmedName = displayName.trim();
    if (!trimmedName) {
      alert("Please enter a full name");
      return;
    }
    //if (ApiHelper.isAuthenticated) ApiHelper.post("/users/setDisplayName", { firstName: trimmedFirst, lastName: trimmedLast }, "AccessApi");
    props.updateFunction(trimmedName);
    setEdit(false);
  }

  React.useEffect(() => { setEdit(props.promptName); }, [props.promptName]);

  if (!edit) return (<a href="about:blank" className="nav-link" onClick={editMode}>Change Name</a>);
  else return (
    <Row style={{ marginRight: 0 }}>
      <Col>
        <InputGroup size="sm">
          <input id="nameText" name="displayName" type="text" className="form-control form-control-sm" placeholder="John Smith" value={displayName} onChange={handleChange} />
          <InputGroup.Append>
            <button id="setNameButton" className="btn btn-primary btn-sm" onClick={handleUpdate}>Update</button>
          </InputGroup.Append>
        </InputGroup>
      </Col>
    </Row>

  );
}


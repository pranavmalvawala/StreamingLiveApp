import React from "react";
import { FormGroup } from "react-bootstrap";
import { InputBox, ApiHelper, RoleMemberInterface, UserHelper, LoadCreateUserRequestInterface, RoleInterface } from ".";


interface Props {
    role: RoleInterface,
    updatedFunction: () => void
}

export const UserAdd: React.FC<Props> = (props) => {
    const [email, setEmail] = React.useState("");

    const handleSave = () => {
        const resetUrl = window.location.href.replace(window.location.pathname, "") + "/login?auth={auth}";
        var req: LoadCreateUserRequestInterface = {
            userName: email,
            userEmail: email,
            fromEmail: "support@streaminglive.church",
            subject: "Welcome to StreamingLive",
            body: "You have been granted access to " + UserHelper.currentChurch.name + " on StreamingLive. Please click here to set your password: <a href=\"" + resetUrl + "\">" + resetUrl + "</a>"
        };


        ApiHelper.post("/users/loadOrCreate", req, "AccessApi").then(u => {
            const rm: RoleMemberInterface = { userId: u.id, roleId: props.role.id, churchId: UserHelper.currentChurch.id };
            ApiHelper.post("/rolemembers/", [rm], "AccessApi").then(() => {
                props.updatedFunction()
            });
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    }

    return (
        <InputBox headerIcon="fas fa-lock" headerText={"Add to " + props.role.name} saveFunction={handleSave} cancelFunction={props.updatedFunction}  >
            <FormGroup>
                <label>Email</label>
                <input type="email" value={email} onChange={handleChange} className="form-control" />
            </FormGroup>
        </InputBox>
    );
}

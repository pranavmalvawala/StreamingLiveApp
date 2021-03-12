import React from "react";
import { Row, Col, FormGroup } from "react-bootstrap"
import { Redirect } from "react-router-dom";
import { InputBox, UserHelper, ApiHelper, ConfigHelper, EnvironmentHelper } from "./components"

export const ProfilePage = () => {
    const [displayName, setDisplayName] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [redirectUrl, setRedirectUrl] = React.useState<string>("");

    const handleSave = () => {
        const promises: Promise<any>[] = [];
        if (displayName.length > 0) promises.push(ApiHelper.post("/users/setDisplayName", { displayName: displayName }, "AccessApi"));
        if (password.length > 5) promises.push(ApiHelper.post("/users/updatePassword", { newPassword: password }, "AccessApi"));

        Promise.all(promises).then(() => {
            UserHelper.user.displayName = displayName;
            setRedirectUrl("/");
        });

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value;
        switch (e.currentTarget.name) {
            case "name":
                setDisplayName(val);
                break;
            case "password":
                setPassword(val);
                break;
        }

    }

    React.useEffect(() => { setDisplayName(UserHelper.user?.displayName || ""); }, []);
    const config = { ...ConfigHelper.current };
    const imgSrc = config.logoSquare !== undefined ? (EnvironmentHelper.ContentRoot + config.logoSquare) : '/images/logo-login.png'

    if (redirectUrl !== "") return <Redirect to={redirectUrl} />
    else return (
        <>

            <div className="smallCenterBlock">
                <img src={imgSrc} alt="logo" className="img-fluid" style={{ marginBottom: 50 }} />

                <InputBox headerIcon="fas fa-user" headerText="Edit Profile" saveFunction={handleSave}>
                    <Row>
                        <Col>
                            <FormGroup>
                                <label>Display Name</label>
                                <input type="text" name="name" value={displayName} onChange={handleChange} className="form-control" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <label>Password</label>
                                <input type="password" name="password" value={password} onChange={handleChange} className="form-control" />
                            </FormGroup>
                        </Col>
                    </Row>
                </InputBox>
            </div>


        </>
    );
}

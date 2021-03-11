import React from "react";
import { Row, Col } from "react-bootstrap"
import { Header, Services, Links, Tabs, ApiHelper, EnvironmentHelper, External } from "./components"

export const SettingsPage: React.FC = () => {


    const publish = (e: React.MouseEvent) => {
        e.preventDefault();
        ApiHelper.post("/settings/publish", [], "StreamingLiveApi").then(() => window.alert("Your changes have been published."));
    }

    const getPublishButton = () => {
        if (EnvironmentHelper.RequirePublish) return (<div className="col text-right"><a href="about:blank" onClick={publish} className="btn btn-primary btn-lg" id="PublishButton">Publish Changes</a></div>)
        else return (<></>);
    }

    return (
        <>
            <Header />
            <div className="container">
                <Row style={{ marginBottom: 25 }}>
                    <div className="col"><h1 style={{ borderBottom: 0, marginBottom: 0 }}><i className="fas fa-video"></i> Live Stream</h1></div>
                    {getPublishButton()}
                </Row>
                <Row>
                    <Col md={8}>
                        <Services />
                    </Col>
                    <Col md={4}>
                        <Links />
                        <Tabs />
                        <External />
                    </Col>
                </Row>
            </div>
        </>
    );
}

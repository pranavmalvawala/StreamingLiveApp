import React from "react";
import { Row, Col } from "react-bootstrap"
import { Header, Services, Links, Tabs, External, Pages } from "./components"

export const SettingsPage: React.FC = () => {
    return (
        <>
            <Header />
            <div className="container">
                <Row style={{ marginBottom: 25 }}>
                    <div className="col"><h1 style={{ borderBottom: 0, marginBottom: 0 }}><i className="fas fa-video"></i> Live Stream</h1></div>
                </Row>
                <Row>
                    <Col md={8}>
                        <Services />
                        <Pages />
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

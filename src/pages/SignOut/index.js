import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { logout } from "../../services/auth";

class SignOut extends Component {
    
    componentDidMount(){
        logout();
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <p>Redireciting...</p>
            </div>
        );
    }
}

export default withRouter(SignOut);
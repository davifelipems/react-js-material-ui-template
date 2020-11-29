import React, { Component } from "react"
import { withRouter } from "react-router-dom"

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {loading:false};
    }

    render() {
        return (
            <div>
                Application
            </div>
        );
    }
}

export default withRouter(App);
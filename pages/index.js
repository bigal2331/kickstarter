import React, { Component } from "react";
import factory from "../ethereum/factory.js";
import { Card } from "semantic-ui-react";

class CampaignIndex extends Component {
  // state = {
  //   campaigns: []
  // };
  //static key word (required by next.js) assigns the getInitialProps to the Class not the instance of the component
  //this allows the next.js server to call the method without rendering the component instance first which saves computing time
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    // returns values in component props
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"
        />
        {this.renderCampaigns()}
      </div>
    );
  }
}

export default CampaignIndex;

import React, { Component } from "react";
import Layout from "../../components/Layout";
import campaignFunc from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    //getInitialProps gets it's own set of props that are different than the component props
    const campaign = campaignFunc(props.query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of manager",
        description:
          "the manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" }
      },
      {
        header: minimumContribution,
        meta: "Minimum contribution in wei",
        description:
          "You must contribute at least this much wei to the campaign"
      },
      {
        header: requestsCount,
        meta: "Number of requests",
        description:
          "A request tries to widraw money from the contract. Requests must be approved by approvers"
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description: "Number of people who have donated to the campaign"
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Capaign balance (ether)",
        description: "Balance of how much money this campaign has left to spend"
      }
    ];

    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        <h3>Campaign Details</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;

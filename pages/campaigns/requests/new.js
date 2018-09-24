import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import campaignFunc from "../../../ethereum/campaign.js";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";
import campaign from "../../../ethereum/campaign.js";

class RequestNew extends Component {
  state = {
    description: "",
    value: "",
    recipient: "",
    loading: false
  };
  static async getInitalProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async event => {
    event.preventDefault();

    const campaign = campaignFunc(this.props.address);
    const { description, value, recipient } = this.state;

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.createRequest(
        description,
        web3.utils.toWei(value, "ether"),
        recipient
      );
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Layout>
        <h3>Create a Request</h3>
        <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
              label="ether"
              labelPosition="right"
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={event =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Ooops" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;

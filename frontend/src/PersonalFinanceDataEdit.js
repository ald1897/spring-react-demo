import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class PersonalFinanceDataEdit extends Component {

    emptyItem = {
        accountName: '',
        balance: 0.00,
        interestRate: 0.00
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const personalFinanceData = await (await fetch(`/personalFinanceData/${this.props.match.params.id}`)).json();
            this.setState({item: personalFinanceData});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/personalFinanceData' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/personalFinanceData');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Data' : 'Add Data'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="accountName">Account Name</Label>
                        <Input type="text" name="accountName" id="accountName" value={item.accountName || ''}
                               onChange={this.handleChange} autoComplete="accountName"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="balance">Balance</Label>
                        <Input type="text" name="balance" id="balance" value={item.balance || ''}
                               onChange={this.handleChange} autoComplete="balance"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="interestRate">Interest Rate</Label>
                        <Input type="double" name="interestRate" id="interestRate" value={item.interestRate || ''}
                               onChange={this.handleChange} autoComplete="interestRate"/>
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/personalFinanceData">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }

}
export default withRouter(PersonalFinanceDataEdit);
import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class PersonalFinanceDataList extends Component {


    constructor(props) {
        super(props);
        this.state = {personalFinanceData: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/personalFinanceData')
            .then(response => response.json())
            .then(data => this.setState({personalFinanceData: data}));
    }

    async remove(id) {
        await fetch(`/personalFinanceData/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedPersonalFinanceData = [...this.state.personalFinanceData].filter(i => i.id !== id);
            this.setState({clients: updatedPersonalFinanceData});
        });
    }

    render() {
        const {personalFinanceData, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const personalFinanceDataList = personalFinanceData.map(pfd => {
            return <tr key={pfd.id}>
                <td style={{whiteSpace: 'nowrap'}}>{pfd.accountName}</td>
                <td>{pfd.balance}</td>
                <td>{pfd.interestRate}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/personalFinanceData/" + pfd.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(pfd.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/personalFinanceData/new">Add Entry</Button>
                    </div>
                    <h3>Personal Finance Data</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Account Name</th>
                            <th width="30%">Balance</th>
                            <th width="10%">Interest Rate</th>
                            <th width="30%">Actions</th>

                            <th ></th>
                        </tr>
                        </thead>
                        <tbody>
                        {personalFinanceDataList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default PersonalFinanceDataList;

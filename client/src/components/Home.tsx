import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

interface IState {
    customers: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { customers: [] }
    }
    public componentDidMount(): void {
        axios.get(`http://localhost:9000/customers`).then(data => {
            this.setState({ customers: data.data })
        })
    }
    public deleteCustomer(id: number) {
        axios.delete(`http://localhost:5000/customers/${id}`).then(data => {
            const index = this.state.customers.findIndex(customer => customer.id === id);
            this.state.customers.splice(index, 1);
            this.props.history.push('/');
        })
    }
}

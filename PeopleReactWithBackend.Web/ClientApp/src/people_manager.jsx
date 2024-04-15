import { Component } from "react";
import axios from "axios";
import Form from "./form";
import Table from "./table";

export default class PeopleManager extends Component {
    state = {
        people : [],
        selected : [], 
        person : {
            id : '',
            firstName : '',
            lastName : '',
            age : ''
        },
        edit : false
    }
    
    onTextChange = ({target}) => {
        const copy = {...this.state.person};
        copy[target.name] = target.value;
        this.setState({person : copy});
    }
    

    onFormButtonClick = ({target : {id}}) => {
        if (id == 'add') {
            const {firstName, lastName, age} = this.state.person;
            axios.post('/api/people/add', {firstName, lastName, age}).then(() => {
                this.refresh();
            });
        } else if (id == 'update') {
            const {person} = this.state;
            axios.post('/api/people/update', {person} ).then(() => {
                this.refresh();   
            })
            this.setState({edit : false});
        } else if (id == 'cancel') {
            this.setState({edit : false});
        }
        this.setState({person : {
            id : '',
            firstName : '',
            lastName : '',
            age : ''
        }});
    }

    onEditClick = id => {
        const person = this.state.people.find(p => p.id == id);
        this.setState({person : person, edit : true});
        // axios.get(`/api/people/getperson?$id={id}`).then(({data}) => {
        //     this.setState({person : data});
        // })
    }

    onCheckClick= id => {
        const {selected} = this.state;
        if (selected.includes(id)) {
            this.setState({selected : selected.filter(id => id != id)});
        } else {
            this.setState({selected : [...selected, id]});
        }
    }

    onDeleteAllClick = () => axios.post('/api/people/deletemany',{Ids : this.state.selected}).then(() => this.refresh())

    onCheckAllClick= () => this.setState({selected : this.state.people.map(p => p.id)})

    onDeleteClick= id => axios.post('/api/people/delete', {Id : id}).then(() => this.refresh())


    componentDidMount = () => {
        this.refresh();
    }

    refresh = () => {
        axios.get('/api/people/getall').then(({data}) => {
            this.setState({people : data});
       })
    }

    render() {
        const {edit, person, people, selected} = this.state;
        console.log({Ids : selected});
        return (
            <div className="container">
                <Form 
                onTextChange={this.onTextChange}
                onFormButtonClick={this.onFormButtonClick}
                edit={edit}
                currentPerson={person}/>
                {(people.length &&
                <Table
                    onEditClick={this.onEditClick} 
                    onCheckClick={this.onCheckClick}
                    onDeleteClick={this.onDeleteClick}
                    onDeleteAllClick={this.onDeleteAllClick}
                    onCheckAllClick={this.onCheckAllClick}
                    onUncheckAllClick={() => this.setState({selected : []})}
                    selected={selected}
                    people={people}/>) || <h1 className="mt-4">add some people!!</h1>}
            </div>
        )
    }
}
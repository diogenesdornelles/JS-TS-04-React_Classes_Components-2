import React from 'react';
import { Label, TextInput, Button, Table, Select } from 'flowbite-react';
import moment from 'moment';
import { nanoid } from 'nanoid';

class ToDo extends React.Component {
  state = {
    tasks: {},
    ids: [],
    task: '',
    submitIsOn: true,
    changeIsOn: false,
    index: -1,
    inputType: 'info'
  };

  componentDidMount() {
    this.getDataFromLocalStorage();
  }

  handleChangeInput = (e) => {
    const task = e.target.value;
    this.setState({ task });
  };

  handleChangeSelect = (e) => {
    const id = e.target.name;
    const importanceValue = e.target.value;
    const { tasks } = this.state;
    switch (importanceValue) {
      case 'urgent':
        tasks[id].rowColor = tasks[id].rowColor !== 'bg-red-600' ? 'bg-red-600' : 'bg-white';
        tasks[id].rowColorHover =
          tasks[id].rowColorHover !== 'hover:bg-red-700' ? 'hover:bg-red-700' : 'hover:bg-white';
        break;
      case 'priority':
        tasks[id].rowColor = tasks[id].rowColor !== 'bg-red-300' ? 'bg-red-300' : 'bg-white';
        tasks[id].rowColorHover =
          tasks[id].rowColorHover !== 'hover:bg-red-400' ? 'hover:bg-red-400' : 'hover:bg-white';
        break;
      case 'normal':
        tasks[id].rowColor = tasks[id].rowColor !== 'bg-blue-400' ? 'bg-blue-400' : 'bg-white';
        tasks[id].rowColorHover =
          tasks[id].rowColorHover !== 'hover:bg-blue-500' ? 'hover:bg-blue-500' : 'hover:bg-white';
        break;
      case 'low':
        tasks[id].rowColor = tasks[id].rowColor !== 'bg-green-300' ? 'bg-green-300' : 'bg-white';
        tasks[id].rowColorHover =
          tasks[id].rowColorHover !== 'hover:bg-green-400'
            ? 'hover:bg-green-400'
            : 'hover:bg-white';
        break;
      default:
        tasks[id].rowColor = 'bg-white';
        tasks[id].rowColorHover = 'bg-white';
    }
    tasks[id].importance = importanceValue;
    setTimeout(() => this.setState({ tasks }), 200);
  };

  saveId(id) {
    const { ids } = this.state;
    ids.push(id);
    this.setState({ ids });
  }

  deleteId(id) {
    const { ids } = this.state;
    const index = ids.indexOf(id);
    if (index > -1) {
      ids.splice(index, 1);
    }
    this.setState({ ids });
  }

  addTask = () => {
    const { task } = this.state;
    const id = nanoid(8);
    this.saveId(id);
    const registration = moment().format('DD/MM/YYYY HH:mm:ss');
    this.setState((prevState) => {
      return {
        tasks: Object.assign({}, prevState.tasks, {
          [id]: {
            task,
            registration,
            id,
            update: '',
            rowColor: 'bg-white',
            importance: false
          }
        })
      };
    });
    this.setState({ task: '' });
    this.saveToLocalStorage();
    setTimeout(() => this.saveToLocalStorage(), 400);
  };

  getDataFromLocalStorage() {
    if (localStorage.getItem('myTasks')) {
      const data = localStorage.getItem('myTasks');
      const { tasks, ids } = JSON.parse(data);
      this.setState({ ids, tasks });
    }
  }

  saveToLocalStorage() {
    localStorage.setItem(
      'myTasks',
      JSON.stringify({ tasks: this.state.tasks, ids: this.state.ids })
    );
  }

  deletePost = (e) => {
    e.preventDefault();
    const id = e.target.name;
    this.deleteId(id);
    const { tasks } = this.state;
    delete tasks[id];
    this.setState({ tasks });
    setTimeout(() => this.saveToLocalStorage(), 400);
  };

  editPost = (e) => {
    e.preventDefault();
    const id = e.target.name;
    const { tasks } = this.state;
    const task = tasks[id].task;
    this.setState({ id, task, submitIsOn: false, changeIsOn: true, inputType: 'success' });
  };

  changePost = () => {
    const { tasks, id, task } = this.state;
    tasks[id].task = task;
    tasks[id].update = moment().format('DD/MM/YYYY HH:mm:ss');
    this.setState({
      tasks,
      submitIsOn: true,
      changeIsOn: false,
      inputType: 'info',
      importance: false,
      id: ''
    });
    setTimeout(() => this.saveToLocalStorage(), 400);
  };

  render() {
    const { task, tasks, ids, submitIsOn, changeIsOn, inputType } = this.state;
    return (
      <div className="flex flex-col gap-12 justify-center items-base mt-24 mb-96 w-11/12 m-auto md:w-8/12">
        <div className="mb-2 block">
          <Label htmlFor="task" value="Your task" />
          <TextInput
            id="task"
            type="email"
            placeholder="Type a task"
            required={true}
            color={inputType}
            value={task}
            onInput={this.handleChangeInput}
            data-testid="input-tdo"
          />
        </div>
        {submitIsOn && (
          <Button type="submit" color="light" pill={true} onClick={this.addTask}>
            Submit
          </Button>
        )}
        {changeIsOn && (
          <Button type="submit" color="light" pill={true} onClick={this.changePost}>
            Alterar
          </Button>
        )}
        <Table>
          <Table.Head>
            <Table.HeadCell className="!p-4">Importance</Table.HeadCell>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Task</Table.HeadCell>
            <Table.HeadCell>Register</Table.HeadCell>
            <Table.HeadCell>Update</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {ids.length > 0 &&
              ids.map((id) => (
                <Table.Row
                  key={nanoid(8)}
                  className={`${tasks[id].rowColor} ${tasks[id].rowColorHover}`}>
                  <Table.Cell className="!p-4">
                    <div id="select-importance">
                      <Select
                        id="importance"
                        required={false}
                        onChange={this.handleChangeSelect}
                        name={id}>
                        <option value="default" className="text-center">
                          Select
                        </option>
                        {tasks[id].importance === 'urgent' ? (
                          <option selected value="urgent" className="text-center">
                            Urgent
                          </option>
                        ) : (
                          <option value="urgent" className="text-center">
                            Urgent
                          </option>
                        )}
                        {tasks[id].importance === 'priority' ? (
                          <option selected value="priority" className="text-center">
                            Priority
                          </option>
                        ) : (
                          <option value="priority" className="text-center">
                            Priority
                          </option>
                        )}
                        {tasks[id].importance === 'normal' ? (
                          <option selected value="normal" className="text-center">
                            Normal
                          </option>
                        ) : (
                          <option value="normal" className="text-center">
                            Normal
                          </option>
                        )}
                        {tasks[id].importance === 'low' ? (
                          <option selected value="low" className="text-center">
                            low
                          </option>
                        ) : (
                          <option value="low" className="text-center">
                            low
                          </option>
                        )}
                      </Select>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{id}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-700">
                    {tasks[id].task}
                  </Table.Cell>
                  <Table.Cell>{tasks[id].registration}</Table.Cell>
                  <Table.Cell>{tasks[id].update}</Table.Cell>
                  <Table.Cell>
                    <a
                      href="/"
                      className="font-medium text-blue-600 hover:underline"
                      name={id}
                      onClick={this.editPost}>
                      Edit
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      href="/"
                      className="font-medium text-blue-600 hover:underline"
                      name={id}
                      onClick={this.deletePost}>
                      Delete
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default ToDo;

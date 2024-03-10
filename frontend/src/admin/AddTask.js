import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
// import './css/addtask.css';
import DialogBox from './TaskDialogueBox';

export default function AddTask() {
    const [empid, setEmpid] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const addTask = () => {
        if (task && time && empid) {
            const newTask = {
                empid: empid,
                date: date.toLocaleDateString(),
                time: time,
                task: task
            };
            setTasks([...tasks, newTask]);
            setTime('');
            setTask('');
            setDialogMessage(`Task added successfully:\nEmployee ID: ${empid}\nTask: ${task}`);
            setDialogOpen(true);
        } else {
            setDialogMessage('Please enter both task, time, and employee ID');
            setDialogOpen(true);
        }
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    return (
        <div className="task-scheduler">
            <h1 className="title">Task Scheduler</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Employee ID"
                    value={empid}
                    onChange={(e) => setEmpid(e.target.value)}
                    className="input-field"
                />
                <br/>
                <input
                    type="text"
                    placeholder="Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="input-field"
                    id="task"
                />
                <br/>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="input-field"
                />
                
            </div>
            <div className="calendar-container" align="center">
                <Calendar
                    onChange={setDate}
                    value={date}
                    className="calendar"
                />
            </div>
            <button onClick={addTask} className="add-button">Add Task</button>
            <DialogBox isOpen={isDialogOpen} onClose={closeDialog} message={dialogMessage} />
        </div>
    );
}

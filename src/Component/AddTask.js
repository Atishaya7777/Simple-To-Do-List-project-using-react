import { useState } from 'react'



const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    const [reminder, setReminder] = useState(false);

    // prevent the webpage from reloading after pressing the submit button
    function handleSubmit(event) {
        event.preventDefault();

        if(!text) {
            alert("Please put in text in the add task!");
            return;
        }

        onAdd({ text, date, reminder });

        setText("");
        setDate("");
        setReminder(false);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" placeholder="Add task" onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className="form-control">
                <label>Date and Time</label>
                <input type="text" placeholder="Add Date and Time" onChange={(e) => setDate(e.target.value)}/>
            </div>            
            <div className="form-control-check">
                <label>Set Reminder</label>
                <input type="checkbox"
                checked={reminder}
                value={reminder}
                 onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>

            <input type="submit" value="Save Task" className="btn btn-block" />
        </form>
    )
}

export default AddTask

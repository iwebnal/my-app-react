import React, {Fragment, useContext, useState} from "react";
import { AlertContext } from "../context/alert/alertContext";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Form = () => {
    const [value, setValue] = useState('');
    const alert = useContext(AlertContext);
    const firebase = useContext(FirebaseContext);

    const submitHandler = event => {
        event.preventDefault();

        if(value.trim()) {
            firebase.addNote(value.trim()).then(() => {
                alert.show("Заметка была создана!", "success");
            }).catch(() => {
                alert.show("Что-то пошло не так!", "danger")
            });
            alert.show("Заметка была создана!", "success")
            setValue('')
        }else {
            alert.show("Введите название заметки!", "warning")
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="mb-3">
                <label for="inputText" className="form-label">Введите название заметки:</label>
                <input
                    type="text"
                    className="form-control"
                    id="inputText"
                    placeholder="Название заметки"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}
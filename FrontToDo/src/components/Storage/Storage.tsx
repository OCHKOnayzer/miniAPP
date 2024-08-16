import { useState, useEffect, FC } from 'react';
import classes from '../style/style.module.css';

type Todo = { 
    id:string,
    text: string,
    status: number
};

type StorageProps = { 
    data: Todo[],
    onDelete: (id: string) => void,
    onCompleted: (id: string) => void,
    status: number
};

type VisibilityStyle = { 
    visibility: 'visible' | 'hidden'
};

const Storage: FC<StorageProps> = ({ data, onDelete, status, onCompleted }) => {
    const [todo, setTodo] = useState<Todo[]>([]);

    useEffect(() => { 
        setTodo(data);
    }, [data]);

    const Vhiddend: VisibilityStyle = { 
        visibility: "hidden"
    };
    const Vvisible: VisibilityStyle = { 
        visibility: "visible"
    };

    const filteredTodo = todo.reduce<Todo[]>((acc, item) => {
        if (item.status === status) {
            acc.push(item);
        }
        return acc;
    }, []);

    return (
        <div className={classes.storageWrapper}>
            {filteredTodo.map(item => (
                <div className={classes.itemConteiner} key={item.id}>
                    <div className={classes.storageItem}>
                        <div 
                            style={item.status === 2 ? Vhiddend : Vvisible} 
                            className={classes.aproveButton} 
                            onClick={() => onCompleted(item.id)}
                        >
                            V
                        </div>
                        <span>{item.text}</span>
                    </div>
                    <div 
                        className={classes.delBtn} 
                        onClick={() => item.status === 2 ? onCompleted(item.id) : onDelete(item.id)}
                    >
                        X
                    </div>
                </div>
            ))}
        </div>
    );
};


export default Storage;

export interface ITodoItem {
    text: string;
    completed: boolean;
    additional: string;
    time: number;
    id: number;
    date: Date;
}

export interface ISelectOption {
    text: string;
    value: number;
}
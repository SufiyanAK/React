import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { useState } from 'react';

export const InputValidator = () => {
    const [inputs, setInputs] = useState({
        name: '',
        age: '',
        email: '',
        address: '',
        designation: '',
        department: ''
    });

    const [error, setError] = useState({
        name: false,
        age: false,
        email: false,
        address: false,
        designation: false,
        department: false
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value
        }));
        setError((prev) => ({
            ...prev,
            [name]: false
        }));
        console.log(`${name} => ${value}`);
        console.log(error);

    };

    const onSubmitCheck = (e) => {
        e.preventDefault();
        const newError = {};
        let hasError = false;

        for (const key in inputs) {
            console.log(inputs[key]);

            if (!inputs[key]) {
                newError[key] = true;
                hasError = true;
            }
        }

        if (hasError) {
            setError(newError);
            console.log(inputs);
            console.log(error);

        } else {

            console.log(error);
            console.log(inputs);
            setInputs({
                name: '',
                age: '',
                email: '',
                address: '',
                designation: '',
                department: ''
            });
        }
    };

    const inputFields = [
        { name: 'name', placeholder: 'Name' },
        { name: 'age', placeholder: 'Age' },
        { name: 'email', placeholder: 'Email' },
        { name: 'address', placeholder: 'Address' },
        { name: 'designation', placeholder: 'Designation' },
        { name: 'department', placeholder: 'Department' }
    ];

    return (
        <form onSubmit={onSubmitCheck}>
            <Stack spacing={1}>
                {inputFields.map((field) => (
                    <Input
                        key={field.name}
                        name={field.name}
                        onChange={onChange}
                        value={inputs[field.name]}
                        placeholder={field.placeholder}
                        error={error[field.name]}
                        style={{ borderColor: error[field.name] ? 'red' : 'initial' }}
                    />
                ))}
                <Button type="submit">Submit</Button>
            </Stack>
        </form>
    );
}

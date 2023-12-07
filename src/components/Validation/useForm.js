import {
    useState
} from "react";

const useForm = validate => {

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        amount: '',
        number: '',
        verifyNumber: '',
        checkNumber: '',
        city: '',
        description: '',
        serviceNumber: '',
        customerNumber: '',
        signatureLine: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = e => {
        setErrors({})
        const {
            name,
            value
        } = e.target;

        setValues({
            ...values,
            [name]: value
        });
    };

    const getErrors = e => {
        e.preventDefault();
        setErrors(Object.assign({}, validate(values)));
        if (Object.values(errors).length === 0) {
            setValues({
                ...values,
                firstName: '',
                lastName: '',
                amount: '',
                number: '',
                verifyNumber: '',
                checkNumber: '',
                city: '',
                description: '',
                serviceNumber: '',
                customerNumber: '',
                signatureLine: '',
            })
        }
    };

    return {
        handleChange,
        values,
        getErrors,
        errors
    };
};

export default useForm;
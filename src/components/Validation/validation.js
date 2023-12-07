const validate = (values) => {
    let errors = {};

    if(!values.firstName) {
        errors.firstName = 'Type your first name.'
    }

    if(!values.lastName) {
        errors.lastName = 'Type your last name.'
    }

    if (/^(?=.*[0-9])/i.test(values.firstName) || /^(?=.[!@#$%^&])/i.test(values.firstName)) {
        errors.firstName = "Name can not have a numeric and special character.";
    }

    if (/^(?=.*[0-9])/i.test(values.lastName) || /^(?=.[!@#$%^&])/i.test(values.lastName)) {
        errors.lastName = "Name can not have a numeric and special character.";
    }

    if(!values.amount) {
        errors.amount = 'Type your amount.'
    }

    if(!values.number) {
        errors.number = 'Type your routing number.'
    }

    if(values.number?.length > 9) {
        errors.number = 'Routing number can only be 9 digits.'
    }

    if(!values.verifyNumber) {
        errors.verifyNumber = 'Type your account number.'
    }

    if(!values.checkNumber) {
        errors.checkNumber = 'Type your check number.'
    }
    
    if(!values.city) {
        errors.city = 'Type your city and state. e.g Queens, NY'
    }

    if(!values.description) {
        errors.description = 'Type your description.'
    }

    if(values.description?.length > 30) {
        errors.description = 'Description can only be 30 characters'
    }

    if(!values.serviceNumber) {
        errors.serviceNumber = 'Type your customer service number.'
    } else if(values.serviceNumber?.length !== 10) {
        errors.serviceNumber = 'Customer number should be 10 digits.'
    }

    if(!values.customerNumber) {
        errors.customerNumber = 'Type your customer number.'
    }

    if(!values.signatureLine) {
        errors.signatureLine = 'Type your signature line.'
    }

    if(values.signatureLine?.length > 30) {
        errors.signatureLine = 'Signature Line can only be 30 characters'
    }

    return errors;
};

export default validate;
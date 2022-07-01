export { enableValidation };



const showError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    formError.classList.add(errorClass);
    formError.textContent = errorMessage;
}

const hideError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    formError.classList.remove(errorClass);
    formError.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage);
    } else hideError(formElement, inputElement,);
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
    }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};



const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass }) => {

    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass);
    });
};


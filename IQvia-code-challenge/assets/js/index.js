const STEP_SELECTOR = '.step';
const STEP_HIDE_SELECTOR = '.step-hide';
const STEP_BULLET_SELECTOR = '.step-bullet';
const STEP_PROGRESS_SELECTOR = '.step-progress';


const STEP_COMPLETED_CLASS = 'step--completed';
const STEP_HIDE_CLASS = 'step-hide';
const STEP_DISABLED_CLASS = 'step--disabled';
const STEP_PROGRESS_CLASS = 'step-progress';
const STEP_ERROR_INPUT = 'error-msg';

const LIMIT = 12;

const state = {
    stepsComplete: [],
};

const createProgress = () => {
    const progress = document.createElement('div');
    progress.classList.add(STEP_PROGRESS_CLASS);
    return progress;
};

const removeProgress = (wrapper) => {
    const progress = wrapper.querySelector(STEP_PROGRESS_SELECTOR);
    if(!progress) {
        return;
    }
    return progress.parentNode.removeChild(progress);
};

const hidenSteps = () => Array.from(document.querySelectorAll(STEP_HIDE_SELECTOR));
const visibleSteps = () => Array.from(document.querySelectorAll(`${STEP_SELECTOR}:not(${STEP_HIDE_SELECTOR})`));

const step1 = document.querySelector('#step-1');
const step2 = document.querySelector('#step-2');
const step3 = document.querySelector('#step-3');
const stepSubmit = document.querySelector('#step-submit');
const step2SendCodeBtn = document.querySelector('#step2-send-code');
const step2RadioButton = document.querySelector('#step2-radio-buttons');
const step3verifCode = document.querySelector('#verif-code');
const formSubmitBtn = document.querySelector('#form-submit');

const step1Logic = () => {

    const consentInput = document.querySelector('#consent');
    const notConsentInput = document.querySelector('#not-consent');
    const actualHidenSteps = hidenSteps();
    const bulletParent = step1.querySelector(STEP_BULLET_SELECTOR).parentNode;

    consentInput.addEventListener('change', () => {
        state.stepsComplete = [1];
        bulletParent.appendChild(createProgress());
        step1.classList.add(STEP_COMPLETED_CLASS)
        actualHidenSteps.forEach((stepElement) => {
            stepElement.classList.remove(STEP_HIDE_CLASS);
            stepElement.classList.add(STEP_DISABLED_CLASS);
        });
        step2.classList.remove(STEP_DISABLED_CLASS);
    });

    notConsentInput.addEventListener('change', () => {
        state.stepsComplete = [];
        removeProgress(bulletParent);
        step1.classList.remove(STEP_COMPLETED_CLASS)
        actualHidenSteps.forEach((stepElement) => {
            stepElement.classList.add(STEP_HIDE_CLASS)
            stepElement.classList.remove(STEP_DISABLED_CLASS);
        })
    });
};

const step2Logic = () => {

    const handlerChangeInput = (event) => {
        const valueSelected = event.target.value;
        step2SendCodeBtn.disabled = false;
    };

    step2SendCodeBtn.disabled = true;

    step2RadioButton.addEventListener('change', handlerChangeInput);

    step2SendCodeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        step2.classList.add(STEP_COMPLETED_CLASS);
        step3.classList.remove(STEP_DISABLED_CLASS);
        step3Logic();
    });

};

const step3Logic = () => {
    step3verifCode.disabled = false;

    step3verifCode.addEventListener('input', (event) => {
        const value = event.target.value;
        const textInput = document.querySelector('#error-msg');

       
        if(value.match(/^[0-9]*$/)) {
            formSubmitBtn.disabled = false;
            textInput.style.visibility = "hidden";
            step3verifCode.style.boxShadow = "none";
        } else { 
            formSubmitBtn.disabled = true;
            const errorMsg = () => {
                textInput.style.visibility = "visible";
                step3verifCode.style.boxShadow = "0 0 13px red";
                return textInput;
            };
            errorMsg();
        }
    })
};



const main = () => {
    step1Logic();
    step2Logic();
};


window.addEventListener('load', main);
 

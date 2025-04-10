class ValidateModule {
    #default_rules = {};
    #default_messages = {};
    constructor() {
        console.log("MOdule Loading");
        // ----------- default rules ----------
        this.#default_rules = {
            'required': this.#checkRequired.bind(this),
            'email': this.#checkValidEmail.bind(this),
            'phone': this.#checkValidPhone.bind(this),
            'number': this.#checkNumber.bind(this),
            'array': this.#checkIsArray.bind(this)
        }
        // ---------------- default error messages ---------------
        this.#default_messages = {
            'required': ':attribute is required field ',
            'email': ':attribute is not a valid email',
            'phone': ':attribute is not a valid phone number',
            'number': ':attribute is must be and number type',
            'array': ':attribute is must an array type'
        }
    }
    // ------------ check required field --------------
    #checkRequired = async (value) => {
        return value.trim() === "" ? false : true;
    }
    // ----------- check valid email ID --------------
    #checkValidEmail = async (value) => {
        const regexExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexExp.test(value);
    }
    // --------- check vlid phone number ------------
    #checkValidPhone = async (value) => {
        const regexExp = /^\d{10}$/;
        return regexExp.test(value);
    }
    // --------- check is a number -----------
    #checkNumber = async (value) => {
        return !isNaN(value);
    }
    // -------- check is a arrya ----------
    #checkIsArray = async (value) => {
        return Array.isArray(value);
    }
    // ----------- execute validation -------------
    validateWithInputs = async ($fields, $messages = null) => {
        this.#default_messages = Object.assign({}, this.#default_messages, $messages);
        let is_error = false;
        let errors = [];
        for (const [request_name, rules] of Object.entries($fields)) {
            let value = $(`input[name=${request_name}].handle-request`).val();
            for (let rule of rules) {
                let process = await this.#default_rules[rule](value);
                if (!process) {
                    is_error = true;
                    errors.push(this.#default_messages[rule].replace(/:attribute/gim, request_name));
                    break;
                }
            }
        }
        return {
            errors: errors,
            fail: is_error
        }
    }
    
}

export default ValidateModule;
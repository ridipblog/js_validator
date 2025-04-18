class ValidateModule {
    #default_rules = {};
    #default_messages = {};
    constructor() {
        
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

    // Display Error Message On p tag 
    showErrorMessage = async (class_input, class_error, message) => {
        $(class_error).html('');
        for (var i = 0; i < $(class_input).length; i++) {
            for (var j = 0; j < message.length; j++) {
                // message.forEach(mes => {
                // if (mes.indexOf($(class_input).eq(i).attr('name').replaceAll('_', ' ')) !== -1) {
                //     $(class_error).eq(i).html(mes);
                // }
                var regex;
                if (res_type == "back_end") {
                    regex = new RegExp(`\\b${$(class_input).eq(i).attr('name').replaceAll('_', ' ').replaceAll('[]', '')}\\b`, 'gim');
                } else {
                    regex = new RegExp(`\\b${$(class_input).eq(i).attr('name')}\\b`, 'gim');
                }
                if (regex.test(message[j])) {
                    $(class_error).eq(i).html(message[j].replaceAll('_', ' '));
                    if (res_type == "back_end") {
                        break;
                    }
                }

                // });
            }
        }
        // $(class_error).eq(0).html("{{__('transfer_messages.transfer_message.request_cancel')}}")
    }
    
}

export default ValidateModule;
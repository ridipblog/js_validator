import ValidateModule from "./ValidatorModule.js?version=<?php echo time();?>";
const validate_module = new ValidateModule();

$(document).ready(function () {
    $(document).on('click', '#submit-btn', async function () {
        const validate_fields = {
            'user_name': ['required'],
            "user_mail": ['required','email'],
            'user_phone':['required','number','phone']
        };
        const messages={
            'required':'plaese enter value for :attribute'
        };
        validate_module.validateWithInputs(validate_fields,messages).then((result) => {
            if(result.fail){
                console.log(result.errors)
            }else{
            }
        }).catch((error) => {
            console.log(error);
        });
        // --------- if direct used with await keyword ------------
        // let validator=await validate_module.validateWithInputs(validate_fields);
    });
});

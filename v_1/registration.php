<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <input type="text" name="user_name" class="handle-request">
    <p class="handle-error"></p>
    <input type="text" name="user_mail" class="handle-request">
    <p class="handle-error"></p>
    <input type="text" name="user_phone" class="handle-request">
    <p class="handle-error"></p>
    <button id="submit-btn">Submit</button>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <script type="module">
        // import ValidateModule from 'https://ridipblog.github.io/js_validator/v_1/ValidatorModule.js';
        import ValidateModule from "./ValidatorModule.min.js?version=<?php echo time();?>"
        const validate_module = new ValidateModule();

        $(document).ready(function() {
            $(document).on('click', '#submit-btn', async function() {
                const validate_fields = {
                    'user_name': ['required'],
                    "user_mail": ['required', 'email'],
                    'user_phone': ['required', 'number', 'phone']
                };
                const messages = {
                    'required': 'plaese enter value for :attribute'
                };
                validate_module.validateWithInputs(validate_fields, messages).then(async (result) => {
                    if (result.fail) {
                        console.log(result.errors)
                        await validate_module.showErrorMessage('.handle-request', '.handle-error', result.errors);
                        console.log("OK");
                    } else {}
                }).catch((error) => {
                    console.log(error);
                });
                // --------- if direct used with await keyword ------------
                // let validator=await validate_module.validateWithInputs(validate_fields);
            });
        });
    </script>
</body>

</html>
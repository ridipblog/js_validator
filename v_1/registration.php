<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <input type="text" name="user_name" class="handle-request">
    <input type="text" name="user_mail" class="handle-request">
    <input type="text" name="user_phone" class="handle-request">
    <button id="submit-btn">Submit</button>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <!-- Load Validate Module  -->
    <script type="module">
        // import ValidateModule from './ValidatorModule.js?version=<?php echo time(); ?>';

        import ValidateModule from 'https://ridipblog.github.io/js_validator/v_1/ValidatorModule.js?version=1.2';
        const validate = new ValidateModule();
    </script>
</body>

</html>
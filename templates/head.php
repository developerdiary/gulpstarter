<?php 
    // Read JSON file from relative path
    $json = file_get_contents(__DIR__ . './../manifest.json');

    //Decode JSON
    $json_data = json_decode($json,true);

    //Print data
    // echo '<pre>';
    // print_r($json_data);
    // echo '</pre>';
?>

    <title><?php print $PAGE_TITLE;?></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" href="./dist/images/schbang-squarelogo.png" />
    <link rel="icon" type="image/x-icon" href="./dist/images/favicon.ico" />
    <link rel="stylesheet" href="./dist/css/<?php echo $json_data['main.css']?>">
    <link rel="stylesheet" href="./dist/css/<?php echo $json_data['homepage.css']?>">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
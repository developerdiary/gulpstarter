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
    <div class="container-fluid text-center">
        <p>Footer Text</p>
        <br />
        <script type="text/javascript">
            var theDate=new Date();
            document.write("Copyright <span class='glyphicon glyphicon-copyright-mark'></span> 2017 - " + theDate.getFullYear());
        </script>
    </div>
    <script src="./dist/js/<?php echo $json_data['main.min.js']?>"></script>
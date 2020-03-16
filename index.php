<?php 
// Include config file for navigation
include("templates/0_config.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include("templates/head.php");?>
</head>
<body>
    <!-- Include navbar component -->
	  <?php include("templates/navbar.php");?>

    <!-- Include Carousel Component -->
    <?php include("templates/myCarousel.php");?>

  
<div class="container text-center">    
  <h3>What We Do</h3><br>
  <div class="row">
    <div class="col-sm-4">
      <img src="https://placehold.it/360x192/75f1c6/404040?text=PROJECT+1" class="img-responsive" style="width:100%" alt="Image">
    </div>
    <div class="col-sm-4"> 
      <img src="https://placehold.it/360x192/301BCB/FDCD31?text=IMAGE" class="img-responsive" style="width:100%" alt="Image">
    </div>
    <div class="col-sm-4">
      <div class="well">
       <p>Some text here...</p>
      </div>
      <div class="well">
       <p>Some text here...</p>
      </div>
      <div class="well">
       <p>Some text here...</p>
      </div>
    </div>
  </div>
</div><br>

<footer>
    <!-- Include Footer Component -->
    <?php include("templates/footer.php");?>
</footer>

</body>
</html>

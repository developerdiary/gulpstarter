    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>                        
                </button>
                <a class="navbar-brand" href="./index.php">
                    <img src="./dist/images/schbang-squarelogo.png" alt="company logo" width="30">
                </a>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                    <li class="<?php if ($CURRENT_PAGE == "Index") {?>active<?php }?>">
                        <a href="./index.php">Home</a>
                    </li>
                    <li class="<?php if ($CURRENT_PAGE == "About") {?>active<?php }?>">
                        <a href="./about.php">About</a>
                    </li>
                    <li class="<?php if ($CURRENT_PAGE == "Contact") {?>active<?php }?>">
                        <a href="./contact.php">Contact</a>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
                </ul>
            </div>
        </div>
    </nav>
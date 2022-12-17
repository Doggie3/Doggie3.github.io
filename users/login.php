<?php 
    $txt = "$_POST[Password]";
    if(empty($_POST[Password]&&$_POST[name])){
        echo "Password is null";
    }
    
    else{
       
        
        $myfile = fopen("DAT/$_POST[name].dat", "r") or die("<h1>registered first</h1>");
        
        fgets($PASSWORD,filesize("$myfile"));
        fclose($myfile);
        if($_POST[Passwoed]==$PASSWORD)
        {
            setcookie(user,$_POST[name],time() + (86400 * 30),"/");
        }
        
    }
    
?>
<html>
    <head><meta charset="utf-8"></head>
    <body>
        <?php
            if(isset($_COOKIE[user])) {
                echo "hello 成功";
            }
        ?>
        <a href="http://mrjerry.w3.luyouxia.net/DS/DS.php" style="font-family: Simhei;color: rgb(0, 0, 0);border: 1px solid rgb(255, 255, 255);background-color: aliceblue;">回到主站________&#127968;</a><br>
    </body>
</html>
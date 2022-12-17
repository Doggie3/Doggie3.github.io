<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body style="text-align: center;">
        <a href="new.html">BACK</a><br>
        <h1>
        <?php 
        $txt = "$_POST[Password]";
        if(empty($_POST[Password]&&$_POST[name])){
            echo "ARE YOU FOOLISH";
        }
        
        else{
           
            
            $myfile = fopen("DAT/$_POST[name].dat", "x+") or die("OH NO!<br>This name has been used!<br>Try another name again!<br>哦不<br>这个名字已经被用了<br>换个名字试试！");
            
            fwrite($myfile, $txt);
            fclose($myfile);
            
            
        }
        
        ?>
        </h1>
        <a href="http://mrjerry.w3.luyouxia.net/DS/DS.php" style="font-family: Simhei;color: rgb(0, 0, 0);border: 1px solid rgb(255, 255, 255);background-color: aliceblue;">回到主站________&#127968;</a><br>
    </body>

</html>
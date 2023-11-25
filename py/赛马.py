import random
import time
import os
money=10
while money>0:
    choose=int(input("输入马匹编号（1-3）："))
    In=int(input("输入赌注，你有："+str(money)+"："))
    horse1=0
    horse2=0
    horse3=0
    print("开始！")
    while horse1<=10 and horse2<=10 and horse3<=10:
        print("|1|"+" "*horse1+"/-\*"+" "*(10-horse1)+"|")
        print("|2|"+" "*horse2+"/-\*"+" "*(10-horse2)+"|")
        print("|3|"+" "*horse3+"/-\*"+" "*(10-horse3)+"|")
        print("进度1：",horse1)
        print("进度2：",horse2)
        print("进度3：",horse3)
        time.sleep(0.3)
        go=random.randint(1,3)
        
        if go==1:
            horse1=horse1+1
        elif go==2:
            horse2=horse2+1
        else:
            horse3=horse1+1
        i=os.system("cls")
    print("|1|"+" "*horse1+"/-\*"+" "*(10-horse1)+"|")
    print("|2|"+" "*horse2+"/-\*"+" "*(10-horse2)+"|")
    print("|3|"+" "*horse3+"/-\*"+" "*(10-horse3)+"|")
    print("进度1：",horse1)
    print("进度2：",horse2)
    print("进度3：",horse3)
    if horse1==11:
        win=1
    elif horse2==11:
        win=2
    else:
        win=3
    print("结束！第"+str(win)+"匹马赢了")
    if win==choose:
        money=money+In
        print("你赢得了"+str(In)+"元")
    else:
        money=money-In
        print("你输掉了"+str(In)+"元")
    print("你还有",money)
print("你没钱了。。。")
sleep(5)

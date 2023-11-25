import random
while 1:
    chance=3
    computer=random.randint(1,10)
    while chance>0:
        choose=int(input("计算机想了一个1-10的整数，你认为是："))
        if choose>computer:
            print(">>>大了")
        elif choose<computer:
            print(">>>小了")
        else:
            break
        chance=chance-1
    if chance!=0:
        print("你赢了")
    else:
        print("输了...，正确答案是："+str(computer))
    print()

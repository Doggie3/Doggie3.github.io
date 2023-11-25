import math
while 1:
    

    x=float(input("请输入公里数："))

    money=0#用于存放票价金额

    if x>32:
        money =math.ceil(x-32)+6

    elif x>22:

        money=6

    elif x>12:

        money=5

    elif x>6:

        money=4

    elif x>0:

        money=3

    else:

        money="error"

    print("票价金额为",money,"元")

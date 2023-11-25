while 1:
    s = 25
    t = int(input("时间(h)："))

    v=s/t

    if v<100:
        mes="未超速"
    else:
        mes="超速"

    print(mes)

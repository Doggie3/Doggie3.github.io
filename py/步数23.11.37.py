while 1:
    num = int(input("步数："))
    if num<5000:
        ser="需努力"
    elif num<10000:
        ser="基本达标"
    else:
        ser="很好，保持"
    print(ser)

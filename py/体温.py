temp_list2=[36.5,36.6,36.5,36.7, 36.5,37.6,37.7]
n=0
num=1
for temp in temp_list2:
    if temp>37.3:
        print("第"+str(num)+"：请及时就医")
        n=n+1
    num=num+1
if n==0:
    print("你很健康")

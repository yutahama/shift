res='''次のように出勤日時を回答します。

1日: 17時
2日: 17時
3日: 17時
8日: 17時
9日: 17時
10日: 17時
11日: 17時
17日: 17時
18日: 17時
22日: 17時
23日: 17時
25日: 17時
28日: 17時
29日: 17時
30日: 17時
31日: 17時
以上、ご確認ください。'''
idx=0
day=[]
time=[]
temp=""

for w in res:
    if w.isdecimal():
        temp=temp+w
        if res[idx+1] in "日":
            day.append(temp)
            temp=""
            
        if res[idx+1] in "時":
            time.append(temp)
            temp=""
            

    idx=idx+1
print(day)
print(time)